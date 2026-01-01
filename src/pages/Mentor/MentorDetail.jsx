import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MentoringService from "@/services/MentoringService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Clock,
  CalendarDays,
  FileText,
} from "lucide-react";

export const MentorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [mentor, setMentor] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (id) {
      fetchMentorDetail();
      fetchMentorSchedule();
    }
  }, [id]);

  const fetchMentorDetail = async () => {
    try {
      setLoading(true);
      const res = await MentoringService.getAllMentorDetails(id);
      setMentor(res.data || res);
    } catch (err) {
      console.error("Failed to load mentor detail", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMentorSchedule = async () => {
    try {
      const res = await MentoringService.getMentorSchedule(id, {
        from_date: "2026-01-01",
        to_date: "2026-12-31",
      });
      setSchedules(res.data || []);
    } catch (err) {
      console.error("Failed to load mentor schedule", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!mentor) {
    return (
      <p className="text-center mt-24 text-red-500 font-bold">
        Mentor tidak ditemukan
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <Button
        variant="ghost"
        className="text-gray-600 hover:text-blue-600"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <Card className="border-none shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8 space-y-8">
          {/* Profile */}
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={
                mentor.avatar ||
                mentor.profile_photo ||
                `https://ui-avatars.com/api/?name=${mentor.name}&background=0D8ABC&color=fff`
              }
              alt={mentor.name}
              className="w-32 h-32 rounded-3xl object-cover shadow-xl ring-4 ring-white"
            />

            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-black uppercase italic">
                {mentor.name}
              </h1>

              <p className="text-lg font-semibold text-blue-600">
                {mentor.institution || "Independent Mentor"}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                {mentor.education_level && mentor.major && (
                  <span className="flex items-center gap-1">
                    <GraduationCap size={16} className="text-blue-500" />
                    {mentor.education_level} – {mentor.major}
                  </span>
                )}

                {mentor.address && (
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {mentor.address}
                  </span>
                )}

                {mentor.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={16} />
                    {mentor.email}
                  </span>
                )}
              </div>

              {/* Status */}
              {mentor.status === "active" ? (
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
                  <ShieldCheck size={14} />
                  Mentor Aktif & Terverifikasi
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                  <Clock size={14} />
                  {mentor.status || "Status tidak diketahui"}
                </div>
              )}
              {mentor.specialization && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {mentor.specialization.split(",").map((item, i) => (
                    <Badge key={i} variant="secondary">
                      {item.trim()}
                    </Badge>
                  ))}
                </div>
              )}
              {mentor.cv_path && (
                <Button
                  variant="outline"
                  className="mt-3 w-fit gap-2"
                  onClick={() => window.open(mentor.cv_path, "_blank")}
                >
                  <FileText size={16} />
                  Lihat CV
                </Button>
              )}
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Tentang Mentor</h3>
            <p className="text-gray-600 bg-white p-5 rounded-2xl border">
              {mentor.bio ||
                "Mentor profesional dengan pengalaman luas di bidangnya."}
            </p>
          </div>

          {/* Schedule */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Jadwal</h3>

            {schedules.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                Belum ada jadwal terbooking
              </p>
            ) : (
              schedules.map((item) => {
                const date = new Date(item.schedule);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-red-50 border rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} className="text-red-500" />
                      <div>
                        <p className="text-sm font-semibold">
                          {date.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {date.toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          WIB
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-600 text-[10px]">
                      Booked
                    </Badge>
                  </div>
                );
              })
            )}
          </div>
          <Button
            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl"
            onClick={() => navigate(`/my-mentor/${mentor.id}/booking`)}
          >
            Book Mentoring Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
