import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  User,
  MapPin,
  Mail,
  Phone,
  Building,
  Briefcase,
  Award,
  Video,
  Calendar,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProfileService from "@/services/ProfileService";
import { MyPortfolioSkeleton } from "@/components/skeleton/MyPortfolioSkeleton";

export const MyPortfolio = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // --- FETCH DATA PORTFOLIO ---
  const {
    data: portfolioRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["portfolio", token],
    queryFn: ProfileService.getPortfolio,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <MyPortfolioSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-red-500">
        Gagal memuat portfolio.
      </div>
    );
  }

  const {
    profile,
    prestasi = [],
    pengalaman = [],
    organisasi = [],
    kursus = [],
    lamaran_beasiswa = [],
    sesi_mentoring = {},
  } = portfolioRes?.data || {};

  const { sebagai_murid = [], sebagai_mentor = [] } = sesi_mentoring;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* HEADER + BACK BUTTON */}
      <div className="w-full flex items-center gap-2 bg-transparent border-b-2 border-b-primary py-2">
        <Link to="/profile/my-profile" className="flex gap-3 items-center">
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
          <h1 className="text-xl text-neutral-800">My Portfolio</h1>
        </Link>
      </div>

      {/* --- SECTION 1: PROFILE INFO --- */}
      <div className="bg-white border border-neutral-300 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-medium text-neutral-900">
              {profile?.name}
            </h2>
            <p className="text-primary font-medium capitalize">
              {profile?.role || "Student"}
            </p>
          </div>

          <p className="text-neutral-600 leading-relaxed font-light">
            {profile?.bio || "No biography available."}
          </p>

          {/* Specialization Tags */}
          <div className="flex flex-wrap gap-2">
            {profile?.specialization && profile.specialization.length > 0 ? (
              profile.specialization.map((spec, i) => (
                <Badge key={i}>{spec}</Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground italic">
                No specialization listed
              </span>
            )}
          </div>
        </div>

        {/* Contact & Detail Info (Right Side) */}
        <div className="w-full md:w-1/3 bg-neutral-50 rounded-xl p-5 border border-neutral-100 flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-3 text-neutral-700">
            <Mail className="w-4 h-4 text-neutral-400 shrink-0" />{" "}
            {profile?.email}
          </div>
          <div className="flex items-center gap-3 text-neutral-700">
            <Phone className="w-4 h-4 text-neutral-400 shrink-0" />{" "}
            {profile?.phone || "-"}
          </div>
          <div className="flex items-start gap-3 text-neutral-700">
            <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />{" "}
            {profile?.address || "-"}
          </div>
          <div className="h-px bg-neutral-200 my-1" />
          <div className="flex items-center gap-3 text-neutral-700">
            <Building className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">
                {profile?.institution}
              </span>
              <span className="text-xs text-muted-foreground">
                {profile?.major} ({profile?.education_level})
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* PENGALAMAN KERJA */}
          <div className="flex flex-col gap-4 bg-white p-6 border border-neutral-300 rounded-2xl">
            <h2 className="text-xl font-medium flex items-center gap-2 text-neutral-800">
              <div className="rounded-lg text-orange-600">
                <Briefcase size={20} />
              </div>
              Professional Experience
            </h2>
            <div className="space-y-4">
              {pengalaman.length > 0 ? (
                pengalaman.map((exp, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-neutral-200 rounded-xl p-5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-medium text-neutral-800">
                          {exp.title}
                        </h3>
                        <div className="text-sm text-primary font-medium flex items-center gap-2">
                          {exp.company}
                          <Badge
                            variant="outline"
                            className="text-[10px] capitalize h-5"
                          >
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400 font-medium py-1">
                        {formatDate(exp.start_date)} -{" "}
                        {formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground italic py-4 bg-white rounded-xl border border-dashed">
                  Belum ada data pengalaman.
                </p>
              )}
            </div>
          </div>

          {/* PRESTASI */}
          <div className="flex flex-col gap-4 bg-white p-6 border border-neutral-300 rounded-2xl">
            <h2 className="text-xl font-medium flex items-center gap-2 text-neutral-800">
              <div className="rounded-lg text-yellow-600">
                <Award size={20} />
              </div>
              Achievements
            </h2>
            <div className="space-y-4">
              {prestasi.length > 0 ? (
                prestasi.map((ach, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col gap-2"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-neutral-800">
                          {ach.title}
                        </h3>
                        <span className="text-sm font-bold text-neutral-500">
                          {ach.year}
                        </span>
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {ach.organization}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {ach.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground italic py-4 bg-white rounded-xl border border-dashed">
                  Belum ada data prestasi.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {/* ORGANISASI */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Organization
            </h2>
            {organisasi.length > 0 ? (
              <div className="flex flex-col gap-3">
                {organisasi.map((org, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-neutral-50 rounded-lg border border-neutral-100"
                  >
                    <h3 className="font-semibold text-neutral-800 text-sm">
                      {org.name}
                    </h3>
                    <p className="text-xs text-neutral-500">Member</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No organization history.
              </p>
            )}
          </div>

          {/* KURSUS / TRAINING */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" /> Courses
            </h2>
            {kursus.length > 0 ? (
              <div className="flex flex-col gap-3">
                {kursus.map((item, idx) => {
                  // Handle struktur JSON: kadang 'course_title' langsung, kadang didalam obj 'course'
                  const title =
                    item.course?.title || item.course_title || "Unknown Course";
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-neutral-50 rounded-lg border border-neutral-100"
                    >
                      <div className="flex justify-between items-end mb-1">
                        <h3 className="font-medium text-neutral-800 text-sm line-clamp-2">
                          {title}
                        </h3>
                        <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">
                          {item.progress}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No courses taken.
              </p>
            )}
          </div>

          {/* SESI MENTORING (Sebagai Murid) */}
          <div className="bg-white border border-neutral-300 rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-600" /> Mentoring (Mentee)
            </h2>
            {sebagai_murid.length > 0 ? (
              <div className="flex flex-col gap-3">
                {sebagai_murid.map((sesi, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded capitalize">
                        {sesi.type?.replace("_", " ")}
                      </span>
                      <Badge className="bg-transparent text-neutral-500">
                        {sesi.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <Clock className="w-3 h-3" />{" "}
                      {formatDateTime(sesi.schedule)}
                    </div>
                    {/* Karena nama mentor tidak ada di JSON mentoring murid, kita tampilkan ID atau placeholder */}
                    <div className="text-xs text-neutral-500">
                      Mentor ID: {sesi.mentor_id}
                    </div>

                    {sesi.meeting_link && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs w-full mt-1 border-primary text-primary hover:bg-primary/20"
                        onClick={() => window.open(sesi.meeting_link, "_blank")}
                      >
                        Join Meeting
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No mentoring sessions.
              </p>
            )}
          </div>

          {/* LAMARAN BEASISWA */}
          <div className="bg-white border border-neutral-300 rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-yellow-600" /> Scholarships
            </h2>
            {lamaran_beasiswa.length > 0 ? (
              <div className="flex flex-col gap-3">
                {lamaran_beasiswa.map((bea, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-100"
                  >
                    <span className="font-semibold text-sm text-neutral-800">
                      {bea.scholarship_name}
                    </span>
                    <Badge
                      variant={
                        bea.status === "pending" ? "secondary" : "default"
                      }
                      className="text-[10px] capitalize"
                    >
                      {bea.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No applications.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
