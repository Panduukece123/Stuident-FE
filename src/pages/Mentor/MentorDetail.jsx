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

  // =========================
  // Fetch Mentor Detail
  // =========================
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

  // =========================
  // Fetch Mentor Schedule
  // =========================
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

  // =========================
  // Loading & Error
  // =========================
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
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-blue-600"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="border-none shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8 space-y-8">
          {/* Top */}
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

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                {mentor.education_level && (
                  <span className="flex items-center gap-1">
                    <GraduationCap size={16} className="text-blue-500" />
                    {mentor.education_level} – {mentor.major}
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {mentor.address || "Indonesia"}
                </span>

                <span className="flex items-center gap-1">
                  <Mail size={16} />
                  {mentor.email}
                </span>
              </div>

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
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="h-6 w-1 bg-blue-600 rounded-full" />
              Tentang Mentor
            </h3>

            <p className="text-gray-600 leading-relaxed bg-white p-5 rounded-2xl border shadow-sm">
              {mentor.bio ||
                "Mentor profesional dengan pengalaman luas di bidangnya."}
            </p>
          </div>

          {/* Schedule */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="h-6 w-1 bg-red-500 rounded-full" />
              Jadwal
            </h3>

            {schedules.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                Belum ada jadwal terbooking
              </p>
            ) : (
              <div className="space-y-2">
                {schedules.map((item) => {
                  const date = new Date(item.schedule);

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <CalendarDays className="text-red-500" size={18} />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
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
                })}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              className="flex-1 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg"
              onClick={() => navigate(`/my-mentor/${mentor.id}/booking`)}
            >
              Book Mentoring Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
