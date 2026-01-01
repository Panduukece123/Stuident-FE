import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MentoringService from "@/services/MentoringService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  GraduationCap,
  User,
  Video,
  ArrowLeft,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export const MentorSessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetchSessionFromAll();
  }, [id]);

  const fetchSessionFromAll = async () => {
    try {
      setLoading(true);
      const res = await MentoringService.getAllSessions();
      const sessions = res.data || res;
      const found = sessions.find((s) => String(s.id) === String(id));
      setSession(found || null);
    } catch (err) {
      console.error("Failed to load mentoring detail", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  if (!session)
    return (
      <p className="text-center mt-24 text-red-500 font-bold">
        Session tidak ditemukan
      </p>
    );

  const { mentor, schedule, type, status, session_id, notes } =
    session;
  const dateObj = new Date(schedule);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="group text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Dashboard
        </Button>
        <Badge
          variant="outline"
          className="px-4 py-1 border-blue-200 text-blue-700 bg-blue-50"
        >
          ID Sesi: {session_id}
        </Badge>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative">
                  <img
                    src={
                      mentor?.avatar ||
                      `https://ui-avatars.com/api/?name=${mentor?.name}&background=0D8ABC&color=fff`
                    }
                    alt={mentor?.name}
                    className="w-32 h-32 rounded-3xl object-cover shadow-2xl ring-4 ring-white"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                    {type === "academic" ? (
                      <GraduationCap size={20} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
                      {mentor?.name}
                    </h1>
                  </div>
                  <p className="text-lg font-medium text-blue-600">
                    {mentor?.institution}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-blue-500" />{" "}
                      {mentor?.education_level} {mentor?.major}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail size={16} /> {mentor?.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
                  Tentang Mentor
                </h3>
                <p className="text-gray-600 leading-relaxed bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  {mentor?.bio ||
                    "Mentor profesional yang berdedikasi untuk membantu perkembangan potensi Anda."}
                </p>
              </div>

              {notes && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <div className="h-6 w-1 bg-amber-500 rounded-full"></div>
                    Agenda Pembahasan
                  </h3>
                  <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl text-gray-700 italic">
                    "{notes}"
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="border-2 border-blue-600 shadow-2xl sticky top-8">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold border-b pb-4">Jadwal Sesi</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-blue-600">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Tanggal
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-blue-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Waktu
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formattedTime} WIB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-blue-600">
                    <Video size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Metode
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      Zoom (Online)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                  onClick={() => {
                    console.log("Booking session for mentor ID:", mentor?.id);
                  }}
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Book Session Now
                </Button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span>Mentor ini aktif & tersedia untuk minggu ini</span>
                </div>

                {status === "scheduled" && (
                  <p className="text-[10px] text-center text-gray-400 italic">
                    *Link pertemuan akan aktif 5 menit sebelum jadwal.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-100 p-4 rounded-2xl flex items-start gap-3 border border-dashed border-gray-300">
            <ExternalLink size={18} className="text-gray-400 mt-1" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Butuh bantuan atau ingin mengatur ulang jadwal? <br />
              Hubungi
              <span className="text-blue-600 font-bold cursor-pointer">
                Support Center
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
