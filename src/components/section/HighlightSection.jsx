import React from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

export const Highlight = () => {
  return (
    <div className="w-full p-4 py-8 md:p-6"> {/* Padding disesuaikan */}
      
      {/* HEADER SECTION */}
      <div className="mb-10 md:mb-16 flex flex-col gap-3 items-center text-center">
        <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
          Temukan Jalur Belajar Terbaik Anda
        </h1>
        <div className="mx-auto h-1 w-96 rounded-full bg-primary" />
        <p className="text-base md:text-lg text-muted-foreground w-full md:w-3/5">
          Kami menyediakan beragam format pembelajaran untuk menyesuaikan dengan
          gaya dan kesibukan Anda.
        </p>
      </div>

      <div className="mx-auto max-w-7xl flex flex-col gap-8 md:gap-12">
        
        {/* --- SECTION 1: E-LEARNING --- */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          
          {/* Image */}
          <div className="w-full lg:flex-1">
            {/* Shadow pakai primary biar ada glow sesuai tema */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 aspect-video lg:aspect-auto lg:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                alt="E-Learning Platform"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:flex-1 space-y-6">
            <div className="space-y-4">
              {/* Badge: Background primary transparan, text primary */}
              <div className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                Fleksibel & Mandiri
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                E-Learning
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Kuasai skill baru kapanpun & di manapun, dengan materi praktis
                dan sertifikat kelulusan yang diakui industri.
              </p>
            </div>
            <ul className="space-y-4 list-none">
              {[
                "Akses materi video kualitas tinggi, modul, dan studi kasus 24/7.",
                "Kurikulum terstruktur dari level pemula hingga mahir.",
                "Akses seumur hidup ke komunitas eksklusif dan update materi."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {/* Icon Container: Background primary transparan */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              {/* Button default Shadcn biasanya sudah primary */}
              <Button size="lg" className="w-full md:w-auto px-8">Jelajahi Materi</Button>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: BOOTCAMP --- */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-20">
          
          {/* Image */}
          <div className="w-full lg:flex-1">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 aspect-video lg:aspect-auto lg:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
                alt="Bootcamp Suasana"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:flex-1 space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                Intensif & Praktis
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Bootcamp
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Kelas interaktif intensif bersama praktisi ahli, fokus pada
                praktek nyata membangun portofolio yang kuat.
              </p>
            </div>
            <ul className="space-y-4 list-none">
              {[
                "Pembelajaran berbasis proyek (project-based learning) dengan studi kasus riil.",
                "Sesi live coding dan feedback langsung dari instruktur ahli.",
                "Jalur cepat karier dengan koneksi ke 500+ perusahaan partner."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Button size="lg" className="w-full md:w-auto px-8">Lihat Pilihan Bootcamp</Button>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: MY MENTOR --- */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          
          {/* Image */}
          <div className="w-full lg:flex-1">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 aspect-video lg:aspect-auto lg:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop"
                alt="Mentoring Sesi"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:flex-1 space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                Personal & Eksklusif
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                My Mentor
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Bimbingan karier privat 1-on-1 dengan praktisi terbaik di industri
                untuk akselerasi karier Anda.
              </p>
            </div>
            <ul className="space-y-4 list-none">
                {[
                "Konsultasi deep-dive untuk bedah CV, portofolio, dan simulasi interview.",
                "Roadmap karier yang dipersonalisasi langsung dari ahli di bidangnya.",
                "Jadwal fleksibel penuh, tentukan sesi kapanpun Anda butuh bimbingan."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Button size="lg" className="w-full md:w-auto px-8">Cari Mentor Anda</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};