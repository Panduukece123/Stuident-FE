import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CourseService from "@/services/CourseService";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EnrolledCourseShowSkeleton } from "@/components/skeleton/EnrolledCourseShowSkeleton";

export const EnrolledCourseShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [groupedCurriculum, setGroupedCurriculum] = useState([]);
  const [flatCurriculum, setFlatCurriculum] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState([]);

  // State Progress
  const [progressData, setProgressData] = useState({
    percentage: 0,
    completedIds: [],
  });

  // --- 1. FETCH DATA (Curriculum + Progress + Auto Open Logic) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const curriculumPromise = CourseService.getCurriculum(id);
        const progressPromise = CourseService.getProgress(id);

        const [curriculumRes, progressRes] = await Promise.all([
          curriculumPromise,
          progressPromise,
        ]);

        // --- A. SIAPKAN DATA MENTAH ---
        const rawCurriculum = curriculumRes.data || [];
        const progressRoot = progressRes.data || {};
        const progressList = progressRoot.progress || []; // Sesuaikan field backendmu
        const statistics = progressRoot.statistics || {}; // Jika ada

        // Ambil ID yang selesai (Pastikan jadi Number)
        const completedIdsArray = progressList
          .filter((item) => item.completed === true)
          .map((item) => Number(item.curriculum_id));

        // --- B. PROSES GROUPING KURIKULUM ---
        let groupedArray = [];
        if (Array.isArray(rawCurriculum) && rawCurriculum.length > 0) {
          const groups = rawCurriculum.reduce((acc, item) => {
            const sectionName = item.section;
            if (!acc[sectionName]) acc[sectionName] = [];
            acc[sectionName].push(item);
            return acc;
          }, {});

          groupedArray = Object.keys(groups).map((section, index) => ({
            id: index,
            title: section,
            modules: groups[section],
          }));

          setGroupedCurriculum(groupedArray);
          setFlatCurriculum(rawCurriculum);
        }

        // --- C. LOGIC AUTO-OPEN (FITUR YANG KAMU MINTA) ---
        if (rawCurriculum.length > 0) {
          let targetModule = null;

          // 1. Cari materi pertama yang BELUM ada di completedIdsArray
          const firstUnfinished = rawCurriculum.find(
            (m) => !completedIdsArray.includes(Number(m.id))
          );

          if (firstUnfinished) {
            // Kalo ada yang belum beres, buka yang itu
            targetModule = firstUnfinished;
          } else {
            // Kalo semua sudah beres (undefined), buka materi PALING TERAKHIR
            targetModule = rawCurriculum[rawCurriculum.length - 1];
          }

          // Set Video Aktif
          setActiveModule(targetModule);

          // Set Accordion supaya ngebuka Section dari targetModule tsb
          if (targetModule) {
            const targetGroup = groupedArray.find((group) =>
              group.modules.some((m) => m.id === targetModule.id)
            );

            if (targetGroup) {
              setExpandedChapters([targetGroup.id]);
            }
          }
        }

        // --- D. SIMPAN PROGRESS KE STATE ---
        setProgressData({
          percentage: statistics.percentage || 0, // Sesuaikan field backend
          completedIds: completedIdsArray,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // useEffect untuk Auto-Expand Accordion saat ganti materi
  useEffect(() => {
    if (activeModule && groupedCurriculum.length > 0) {
      const activeChapter = groupedCurriculum.find((chapter) =>
        chapter.modules.some((mod) => mod.id === activeModule.id)
      );
      if (activeChapter) {
        setExpandedChapters((prev) => {
          if (prev.includes(activeChapter.id)) return prev;
          return [...prev, activeChapter.id];
        });
      }
    }
  }, [activeModule, groupedCurriculum]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  // Handler Navigasi Manual (Prev/Next tanpa save ke DB)
  const handleNavigate = (direction) => {
    if (!activeModule || flatCurriculum.length === 0) return;
    const currentIndex = flatCurriculum.findIndex(
      (m) => m.id === activeModule.id
    );
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < flatCurriculum.length) {
      setActiveModule(flatCurriculum[nextIndex]);
    }
  };

  // --- 4. HANDLER KHUSUS TOMBOL NEXT / SELESAI (WITH SAVE) ---
  const handleNextStep = async () => {
    if (!activeModule) return;

    // Cek Index Materi Saat Ini
    const currentIndex = flatCurriculum.findIndex(
      (m) => m.id === activeModule.id
    );
    const isLastModule = currentIndex === flatCurriculum.length - 1;

    // --- LOGIC SIMPAN PROGRESS ---
    const isAlreadyCompleted = progressData.completedIds.includes(
      activeModule.id
    );

    if (!isAlreadyCompleted) {
      try {
        await CourseService.markComplete(activeModule.id);

        setProgressData((prev) => {
          const newCompletedIds = [...prev.completedIds, activeModule.id];
          const newPercentage = Math.round(
            (newCompletedIds.length / flatCurriculum.length) * 100
          );

          return { percentage: newPercentage, completedIds: newCompletedIds };
        });
      } catch (error) {
        console.error("Gagal update progress:", error);
      }
    }

    // --- LOGIC NAVIGASI ---
    if (isLastModule) {
      // Kalo materi terakhir, ucapkan selamat & balik ke list kursus
      alert("Selamat! Anda telah menyelesaikan seluruh materi kursus ini! 🎉");
      navigate("/profile/my-enrolled-courses");
    } else {
      // Kalo belum, lanjut ke next video
      handleNavigate("next");
    }
  };

  if (loading) {
    return <EnrolledCourseShowSkeleton />;
  }

  const completedCount = progressData.completedIds.length;
  const totalCount = flatCurriculum.length;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* HEADER & BREADCRUMB */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link to="/profile/my-enrolled-courses ">
            <Button className={"rounded-full cursor-pointer"}>
              <ChevronLeft /> Back
            </Button>
          </Link>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/profile/my-enrolled-courses">
                  Kursus Saya
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem aria-current="page">
                <BreadcrumbPage className="font-semibold text-primary truncate max-w-[200px]">
                  {activeModule?.title || "Memuat..."}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* --- LEFT COLUMN: PLAYER --- */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border shadow-sm rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeModule?.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {activeModule?.section} • Durasi: {activeModule?.duration}
              </p>
            </div>
            <hr className="border-gray-100" />

            {/* VIDEO PLAYER */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative">
              {activeModule?.video_url ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={activeModule.video_url}
                  title={activeModule.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  Video tidak tersedia
                </div>
              )}
            </div>

            <div className="text-gray-600 leading-relaxed text-justify space-y-2">
              <p>{activeModule?.description}</p>
            </div>

            {/* --- BAGIAN TOMBOL DINAMIS --- */}
            <div className="flex flex-row justify-between w-full mt-4 pt-4 border-t">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => handleNavigate("prev")}
                disabled={
                  !activeModule || flatCurriculum.indexOf(activeModule) === 0
                }
              >
                <ChevronLeft className="h-4 w-4" /> Sebelumnya
              </Button>

              {(() => {
                const currentIndex = flatCurriculum.findIndex(
                  (m) => m.id === activeModule?.id
                );
                const isLastModule = currentIndex === flatCurriculum.length - 1;

                return (
                  <Button
                    className={cn(
                      "text-white gap-2 transition-colors",
                      isLastModule
                        ? "bg-green-600 hover:bg-green-700" // Warna Hijau kalo Selesai
                        : "bg-cyan-600 hover:bg-cyan-700" // Warna Cyan kalo Next
                    )}
                    onClick={handleNextStep}
                    // Disabled HANYA jika data belum siap. JANGAN disable kalau last module.
                    disabled={!activeModule}
                  >
                    {isLastModule ? (
                      <>
                        Selesai <CheckCircle2 className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Selanjutnya <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                );
              })()}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-4">
          {/* CARD PROGRESS */}
          <div className="bg-white border shadow-sm rounded-2xl p-5 flex flex-col gap-4">
            <h1 className="text-lg font-bold text-gray-800">Progres Belajar</h1>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-500">
                  {completedCount} dari {totalCount} Materi Selesai
                </span>
                <span className="text-cyan-600">
                  {Math.round(progressData.percentage)}%
                </span>
              </div>
              <Progress
                value={progressData.percentage}
                className="h-2 bg-gray-100"
              />
            </div>
          </div>

          {/* LIST MATERI */}
          <div className="bg-white sticky top-20 max-h-[calc(100vh-8rem)] border shadow-sm rounded-2xl overflow-hidden overflow-y-auto">
            <div className="p-4 border-b bg-gray-50/50">
              <h2 className="font-bold text-gray-800">Daftar Materi</h2>
            </div>

            <div className="flex flex-col divide-y">
              {groupedCurriculum.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Belum ada materi.
                </div>
              ) : (
                groupedCurriculum.map((chapter) => {
                  const isExpanded = expandedChapters.includes(chapter.id);
                  return (
                    <div key={chapter.id} className="flex flex-col">
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left relative z-10"
                      >
                        <h3 className="font-semibold text-gray-700 text-sm">
                          {chapter.title}
                        </h3>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-gray-400 transition-transform duration-300 ease-in-out",
                            isExpanded ? "rotate-180" : ""
                          )}
                        />
                      </button>

                      <div
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-in-out",
                          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="bg-gray-50/30 flex flex-col gap-1 p-2 border-t">
                            {chapter.modules.map((module) => {
                              const isActive = activeModule?.id === module.id;

                              // --- KUNCI UTAMA DISINI ---
                              // Cek apakah ID modul ini ada di dalam list completedIds
                              const isCompleted =
                                progressData.completedIds.includes(module.id);

                              return (
                                <div
                                  key={module.id}
                                  onClick={() => setActiveModule(module)}
                                  className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 text-sm",
                                    isActive
                                      ? "bg-cyan-50 text-cyan-700 border border-cyan-100 shadow-sm"
                                      : "text-gray-600 hover:bg-cyan-50/50 hover:text-cyan-600 border border-transparent"
                                  )}
                                >
                                  {/* ICON LOGIC: Prioritaskan Checklist kalau Completed */}
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                  ) : isActive ? (
                                    <PlayCircle className="h-4 w-4 text-cyan-600 shrink-0 fill-cyan-100" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                                  )}

                                  <div className="flex flex-col gap-0.5">
                                    <span
                                      className={cn(
                                        "font-medium",
                                        isActive && "font-semibold"
                                      )}
                                    >
                                      {module.title}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      Video • {module.duration}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
