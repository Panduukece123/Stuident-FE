import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 1. Tambah Import ini
import MentoringService from "@/services/MentoringService";
import { MentorCard } from "@/components/shared/MentorCard";
import { SessionCard } from "@/components/shared/SessionCard"; // 2. Tambah Import ini

export const MentorPage = () => {
  const navigate = useNavigate(); // 3. Inisialisasi navigate
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const [mySessions, setMySessions] = useState([]);

  const academicRef = useRef(null);
  const lifeRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [mentorRes, mySessionRes] = await Promise.all([
        MentoringService.getAllmentor(),
        MentoringService.getMySessions(),
      ]);

      setMentors(mentorRes.data || []);
      setMySessions(mySessionRes.data || []);
    } catch (error) {
      console.error("Failed to fetch mentor data", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (ref) => {
    if (!ref.current) return;

    const yOffset = -100;
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const myMentors = Array.from(
    new Map(
      mySessions.map((session) => [session.mentor.id, session.mentor])
    ).values()
  );

  const academicMentors = mentors;
  const lifeMentors = mentors;

  if (loading) {
    return (
      <p className="text-center mt-20 text-muted-foreground">
        Loading mentors...
      </p>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-10 space-y-16">
      
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Mentor</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Kelola sesi mentoring akademik dan pengembangan diri kamu bersama
          mentor pilihan
        </p>
      </div>

      {/* MARKETING CARDS (Tetap Ada) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-gray-50">
        {/* Academic Coaching Card */}
        <div
          onClick={() => scrollToSection(academicRef)}
          className="bg-white border-2 border-blue-400 rounded-[2rem] p-8 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-black text-center italic tracking-wider mb-6">
            ACADEMIC COACHING
          </h2>

          <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrU2Hi0Ae_yiCgeqoXPy8ZKgIqd5QkXsITvQ&s"
              alt="Academic Coaching"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-center text-sm font-medium leading-relaxed mb-6 px-4">
            Proses 1-on-1 yang mempertemukan Anda dengan coach berpengalaman
            yang siap mendengarkan dan membantu Anda menemukan jalan terbaik
            dalam perjalanan akademik Anda.
          </p>

          <div className="border-t border-b border-dashed border-blue-400 py-2 mb-6">
            <p className="text-center text-[0.75rem] font-bold italic">
              7 Benefits From Academic Coaching
            </p>
          </div>

          <ul className="space-y-3 text-sm font-bold italic ml-4">
            <li className="flex items-start">
              <span className="mr-2">•</span> Pre-Assessment
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Habit & Grit Tracker
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Personal Development Plan Form
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Laporan Coaching (PDF)
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> One-month Personalized Roadmap
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Akses ke Materi Tambahan
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Garansi Uang Kembali
            </li>
          </ul>
        </div>

        {/* Life Coaching Card */}
        <div
          onClick={() => scrollToSection(lifeRef)}
          className="bg-white border-2 border-blue-400 rounded-[2rem] p-8 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-black text-center italic tracking-wider mb-6">
            LIFE COACHING
          </h2>

          <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2dqfI0MC0J6jszIAR_QRLYjbXp3-iqWgJQ&s"
              alt="Life Coaching"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-center text-sm font-medium leading-relaxed mb-6 px-4">
            Proses 1-on-1 yang mempertemukan Anda dengan coach berpengalaman
            yang siap mendengarkan dan membantu Anda menemukan jalan terbaik
            dalam perjalanan akademik Anda.
          </p>

          <div className="border-t border-b border-dashed border-blue-400 py-2 mb-6">
            <p className="text-center text-[0.75rem] font-bold italic">
              7 Benefits From Life Coaching
            </p>
          </div>

          <ul className="space-y-3 text-sm font-bold italic ml-4 text-center">
            <li className="flex items-start text-ce">
              <span className="mr-2">•</span> Personality mapping
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Strength assessment
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Life timeline reflection
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Goal planning system
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> 30-day life roadmap
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Coach feedback PDF
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Monthly check-in option
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold">Jadwal Sesi Mentoring</h2>
        
        {mySessions.length === 0 ? (
           <div className="rounded-xl border border-dashed bg-neutral-50 p-10 text-center text-neutral-500">
             Belum ada sesi mentoring yang terdaftar.
           </div>
        ) : (
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      {/* ========================================================= */}

      {/* SECTION: ACADEMIC LIST (Tetap Ada) */}
      <section ref={academicRef} className="space-y-4 scroll-mt-20">
        <h2 className="text-xl font-semibold">🎓 Academic Coaching</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {academicMentors.map((mentor) => (
            <MentorCard key={`academic-${mentor.id}`} mentor={mentor} />
          ))}
        </div>
      </section>

      {/* SECTION: LIFE LIST (Tetap Ada) */}
      <section ref={lifeRef} className="space-y-4 scroll-mt-20">
        <h2 className="text-xl font-semibold">🌱 Life Coaching</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lifeMentors.map((mentor) => (
            <MentorCard key={`life-${mentor.id}`} mentor={mentor} />
          ))}
        </div>
      </section>
    </div>
  );
};