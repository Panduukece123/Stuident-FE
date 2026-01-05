import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MentoringService from "@/services/MentoringService";
import { MentorCard } from "@/components/shared/MentorCard";
import { SessionCard } from "@/components/shared/SessionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MyMentorBanner } from "@/components/section/MyMentorBanner";

export const MentorPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const [mySessions, setMySessions] = useState([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterType, setFilterType] = useState("both");

  const academicRef = useRef(null);
  const lifeRef = useRef(null);

  // ✅ CEK LOGIN TANPA AUTHSERVICE
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchMentors();

    if (isLoggedIn) {
      fetchMySessions();
    }
  }, []);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await MentoringService.getAllmentor();
      setMentors(res?.data ?? []);
    } catch (err) {
      console.error("Failed to fetch mentors", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMySessions = async () => {
    try {
      const res = await MentoringService.getMySessions();
      setMySessions(res?.data ?? []);
    } catch (err) {
      console.warn("Skip my sessions (not logged in)");
    }
  };

  /* ================= SEARCH ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const matchSearch = (mentor) =>
    mentor.name?.toLowerCase().includes(debouncedSearch.toLowerCase());

  const isAcademic = (mentor) => Number(mentor.academic_sessions_count) > 0;
  const isLife = (mentor) => Number(mentor.life_plan_sessions_count) > 0;

  const filteredMentors = mentors.filter((mentor) => {
    if (!matchSearch(mentor)) return false;
    if (filterType === "academic") return isAcademic(mentor);
    if (filterType === "life") return isLife(mentor);
    return isAcademic(mentor) || isLife(mentor);
  });

  const academicMentors = filteredMentors.filter(isAcademic);
  const lifeMentors = filteredMentors.filter(isLife);

  const scrollToSection = (ref) => {
    if (!ref.current) return;
    const yOffset = -100;
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-muted-foreground uppercase tracking-widest font-bold">
        Loading mentors...
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col bg-white">
      <MyMentorBanner />
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 py-16 space-y-24">
        {/* HEADER & SEARCH AREA */}
        <div className="flex flex-col items-center space-y-12">
          {/* My Mentor Title */}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-black to-neutral-500 tracking-tighter">
              My Mentoring
            </h1>
            <p className="mt-8 text-neutral-500 font-light max-w-lg mx-auto text-lg leading-relaxed">
              Kelola sesi mentoring akademik dan pengembangan diri kamu bersama
              mentor pilihan
            </p>
          </div>
        </div>

        {/* 3. COACHING CARDS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Academic Card */}
          <div
            onClick={() => scrollToSection(academicRef)}
            className="cursor-pointer group bg-white border-4 border-blue-400 rounded-[3rem] p-10 flex flex-col"
          >
            <h2 className="text-3xl font-black text-center tracking-tighter mb-8 transition-colors">
              ACADEMIC COACHING
            </h2>
            <div className="w-full h-56 rounded-[2rem] overflow-hidden mb-8 border-2 border-neutral-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrU2Hi0Ae_yiCgeqoXPy8ZKgIqd5QkXsITvQ&s"
                alt="Academic"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-center font-semibold text-neutral-600 mb-8 leading-relaxed">
              Proses 1-on-1 bersama coach berpengalaman untuk membantu menemukan
              jalan terbaik dalam perjalanan akademik Anda.
            </p>
            <div className="border-y-2 border-dashed border-blue-200 py-3 mb-8">
              <p className="text-center text-xs font-black italic text-blue-400 uppercase tracking-widest">
                7 Benefits From Academic Coaching
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 text-sm italic text-neutral-700">
              {[
                "Pre-Assessment",
                "Habit & Grit Tracker",
                "Personal Development Plan",
                "Laporan Coaching (PDF)",
                "Personalized Roadmap",
                "Materi Tambahan",
                "Garansi Uang Kembali",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Life Card */}
          <div
            onClick={() => scrollToSection(lifeRef)}
            className="cursor-pointer group bg-white border-4 border-emerald-400 rounded-[3rem] p-10 flex flex-col"
          >
            <h2 className="text-3xl font-black text-center tracking-tighter mb-8 transition-colors">
              LIFE COACHING
            </h2>
            <div className="w-full h-56 rounded-[2rem] overflow-hidden mb-8 border-2 border-neutral-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2dqfI0MC0J6jszIAR_QRLYjbXp3-iqWgJQ&s"
                alt="Life"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-center font-semibold text-neutral-600 mb-8 leading-relaxed">
              Temukan potensi diri, pemetaan kepribadian, dan rancang strategi
              masa depan bersama coach profesional.
            </p>
            <div className="border-y-2 border-dashed border-emerald-200 py-3 mb-8">
              <p className="text-center text-xs font-black italic text-emerald-400 uppercase tracking-widest">
                7 Benefits From Life Coaching
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 text-sm italic text-neutral-700">
              {[
                "Personality mapping",
                "Strength assessment",
                "Life timeline reflection",
                "Goal planning system",
                "30-day life roadmap",
                "Coach feedback PDF",
                "Monthly check-in",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SEARCH */}
        <div className="flex justify-center w-full">
          <div className="flex gap-2 w-full max-w-4xl bg-white p-1.5 rounded-full border border-neutral-200 flex-wrap justify-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="Cari mentor berdasarkan nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-14 rounded-full px-8 border-neutral-200 focus-visible:ring-blue-400 bg-white font-medium"
              />
            </div>
            <div className="flex gap-2 shrink-0 bg-white p-1.5 rounded-full border border-neutral-200">
              {["both", "academic", "life"].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "ghost"}
                  className={`rounded-full px-6 font-bold capitalize ${
                    filterType === type
                      ? "bg-black text-white hover:bg-black"
                      : "text-neutral-500"
                  }`}
                  onClick={() => setFilterType(type)}
                >
                  {type === "both" ? "All" : type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MY SESSIONS (LOGIN ONLY) ================= */}
        {isLoggedIn && (
          <section className="space-y-6 pt-12 border-t-2 border-neutral-100">
            <h2 className="text-2xl font-black uppercase">
              Jadwal Sesi Mentoring
            </h2>

            {mySessions.length === 0 ? (
              <div className="rounded-[2rem] border-4 border-dashed border-neutral-100 bg-neutral-50 p-12 text-center font-bold text-neutral-400">
                Belum ada sesi mentoring yang terdaftar.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mySessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onClick={() =>
                      navigate(`/profile/my-mentoring-sessions/${session.id}`)
                    }
                  />
                ))}
              </div>
            )}
          </section>
        )}

        <section ref={academicRef} className="space-y-8 scroll-mt-24">
          <h2 className="text-2xl font-black">🎓 Academic Coaching</h2>
          {academicMentors.length === 0 ? (
            <p className="text-neutral-400 font-bold italic">
              Mentor academic tidak ditemukan.
            </p>
          ) : (
             <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-12">
              {academicMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}
        </section>

        <section ref={lifeRef} className="space-y-8 scroll-mt-24">
          <h2 className="text-2xl font-black">🌱 Life Coaching</h2>
          {lifeMentors.length === 0 ? (
            <p className="text-neutral-400 font-bold italic">
              Mentor life tidak ditemukan.
            </p>
          ) : (
            // Tambahkan xl dan 2xl agar saat zoom out jumlah kolom bertambah
            <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-12">
              {lifeMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
