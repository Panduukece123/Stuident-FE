import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const EnrolledCourseShowPage = () => {
  const { id } = useParams();

  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [groupedCurriculum, setGroupedCurriculum] = useState([]);
  const [flatCurriculum, setFlatCurriculum] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState([]);

  // Kita set default progress kosong dulu karena backend error 500
  const [progressData, setProgressData] = useState({
    percentage: 0,
    completedIds: [],
  });

  // --- 1. FETCH DATA (Hanya Curriculum) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Panggil API Curriculum saja
        const curriculumRes = await CourseService.getCurriculum(id);

        // Cek struktur JSON kamu: { sukses: true, pesan: "...", data: [...] }
        // Jadi array materinya ada di curriculumRes.data
        const rawData = curriculumRes.data || [];

        console.log("Data Materi:", rawData); // Debugging di Console

        if (rawData.length > 0) {
          // A. Grouping Data (Flat -> Nested by Section)
          const groups = rawData.reduce((acc, item) => {
            const sectionName = item.section;
            if (!acc[sectionName]) {
              acc[sectionName] = [];
            }
            acc[sectionName].push(item);
            return acc;
          }, {});

          const groupedArray = Object.keys(groups).map((section, index) => ({
            id: index,
            title: section,
            modules: groups[section],
          }));

          // B. Set State
          setGroupedCurriculum(groupedArray);
          setFlatCurriculum(rawData);

          // C. PENTING: Set Default Materi Pertama biar Player Gak Kosong
          setActiveModule(rawData[0]);
          setExpandedChapters([0]); // Buka accordion pertama otomatis
        }
      } catch (error) {
        console.error("Gagal mengambil data materi:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

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

  // --- 2. HANDLER: NEXT / PREV MATERI ---
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

  // --- 3. ACCORDION TOGGLE ---
  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* HEADER & BREADCRUMB */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link to="/my-courses">
            <Button className={"rounded-full"}>
              <ChevronLeft />
              Back
            </Button>
          </Link>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/my-courses">Kursus Saya</BreadcrumbLink>
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
            {/* Judul Materi Aktif */}
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

            {/* Deskripsi */}
            <div className="text-gray-600 leading-relaxed text-justify space-y-2">
              <p>{activeModule?.description}</p>
            </div>

            {/* Tombol Navigasi */}
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

              <Button
                className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
                onClick={() => handleNavigate("next")}
                disabled={
                  !activeModule ||
                  flatCurriculum.indexOf(activeModule) ===
                    flatCurriculum.length - 1
                }
              >
                Selanjutnya <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-4">
          {/* Progress Card (Dummy karena backend error) */}
          <div className="bg-white border shadow-sm rounded-2xl p-5 flex flex-col gap-4">
            <h1 className="text-lg font-bold text-gray-800">Progres Belajar</h1>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-500">
                  0 dari {flatCurriculum.length} Materi Selesai
                </span>
                <span className="text-cyan-600">0%</span>
              </div>
              <Progress value={0} className="h-2 bg-gray-100" />
            </div>
          </div>

          {/* List Materi (Dynamic Accordion) */}
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
                      {/* Header Bab */}
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

                      {/* Content Bab */}
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

                              // Logika completed kita matikan dulu karena backend error
                              const isCompleted = false;

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
