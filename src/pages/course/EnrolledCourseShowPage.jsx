import React, { useState } from "react";
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

// --- DATA DUMMY ---
const courseData = [
  {
    id: 1,
    title: "Bab 1: Pengenalan Dasar",
    modules: [
      { id: 101, title: "Apa itu React?", type: "video", duration: "10:00", completed: true },
      { id: 102, title: "Setup Environment", type: "video", duration: "15:30", completed: true },
      { id: 103, title: "Hello World", type: "video", duration: "05:00", completed: false },
    ],
  },
  {
    id: 2,
    title: "Bab 2: Komponen & Props",
    modules: [
      { id: 201, title: "Membuat Komponen", type: "video", duration: "12:00", completed: false },
      { id: 202, title: "Menggunakan Props", type: "video", duration: "14:20", completed: false },
    ],
  },
  {
    id: 3,
    title: "Bab 3: State Management",
    modules: [
      { id: 301, title: "useState Hook", type: "video", duration: "20:00", completed: false },
      { id: 302, title: "useEffect Hook", type: "video", duration: "18:00", completed: false },
    ],
  },
];

export const EnrolledCourseShowPage = () => {
  const [activeModuleId, setActiveModuleId] = useState(103);
  const [expandedChapters, setExpandedChapters] = useState([1]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      {/* --- HEADER & BREADCRUMB --- */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/my-courses">Kursus Saya</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Frontend Development</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem aria-current="page">
                <BreadcrumbPage className="font-semibold text-primary">
                  Hello World
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* --- MAIN LAYOUT (Grid) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* --- LEFT COLUMN: VIDEO PLAYER & CONTENT --- */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border shadow-sm rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Hello World: Komponen Pertama
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Bab 1 • Durasi: 05:00
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="aspect-video bg-neutral-900 rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
              <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <p className="absolute bottom-4 left-4 text-white font-medium text-sm">
                Sedang memutar: Hello World
              </p>
            </div>

            <div className="text-gray-600 leading-relaxed text-justify space-y-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                maiores voluptatem temporibus quia, consequatur laudantium.
              </p>
              <p>
                Di materi ini kita akan mempelajari struktur dasar React component dan bagaimana cara me-render elemen ke DOM.
              </p>
            </div>

            <div className="flex flex-row justify-between w-full mt-4 pt-4 border-t">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" /> Sebelumnya
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                Selanjutnya <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR MATERI (STICKY) --- */}
        <div className="lg:col-span-1 lg:sticky lg:top-4 space-y-4">
          {/* Progress Card */}
          <div className="bg-white border shadow-sm rounded-2xl p-5 flex flex-col gap-4">
            <h1 className="text-lg font-bold text-gray-800">Progres Belajar</h1>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-500">2 dari 10 Materi Selesai</span>
                <span className="text-cyan-600">20%</span>
              </div>
              <Progress value={20} className="h-2 bg-gray-100" indicatorClassName="bg-cyan-500" />
            </div>
          </div>

          {/* List Materi (Accordion Style) */}
          <div className="bg-white border shadow-sm rounded-2xl overflow-hidden">
            <div className="p-4 border-b bg-gray-50/50">
              <h2 className="font-bold text-gray-800">Daftar Materi</h2>
            </div>

            <div className="flex flex-col divide-y">
              {courseData.map((chapter) => {
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

                    {/* --- AREA ANIMASI SMOOTH --- */}
                    {/* Menggunakan Grid template rows 0fr -> 1fr */}
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-in-out",
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="bg-gray-50/30 flex flex-col gap-1 p-2 border-t">
                          {chapter.modules.map((module) => {
                            const isActive = activeModuleId === module.id;

                            return (
                              <div
                                key={module.id}
                                onClick={() => setActiveModuleId(module.id)}
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 text-sm",
                                  isActive
                                    ? "bg-cyan-50 text-cyan-700 border border-cyan-100 shadow-sm"
                                    : "text-gray-600 hover:bg-cyan-50/50 hover:text-cyan-600 border border-transparent"
                                )}
                              >
                                {module.completed ? (
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
                                    {module.type === "video" ? "Video" : "Kuis"} •{" "}
                                    {module.duration}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {/* --- AKHIR AREA ANIMASI --- */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};