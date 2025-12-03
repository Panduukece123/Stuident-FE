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

      <div className="mx-auto max-w-7xl flex flex-col gap-16 md:gap-24">
        
        {/* --- SECTION 1: E-LEARNING --- */}
        {/* Normal: Gambar Kiri, Teks Kanan */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Image */}
          <div className="w-full lg:flex-1">
            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video lg:aspect-auto lg:h-[400px]">
              <img
                src="https://placehold.co/600x400"
                alt="E-Learning Platform"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                E-Learning
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Kuasai skill baru kapanpun & di manapun, dengan materi praktis
                dan sertifikat kelulusan.
              </p>
            </div>
            <ul className="space-y-3 list-none">
              {[
                "Akses materi video, modul, dan studi kasus secara fleksibel sesuai kecepatan belajar Anda.",
                "Kurikulum terstruktur yang dirancang praktis, mulai dari level pemula hingga mahir.",
                "Akses seumur hidup ke grup komunitas eksklusif dan sesi bonus bulanan."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button size="lg" className="w-full md:w-auto">Jelajahi Materi</Button>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: BOOTCAMP --- */}
        {/* Reverse: Teks Kiri, Gambar Kanan (Di Desktop) */}
        {/* Di Mobile tetep Gambar Atas, Teks Bawah karena 'flex-col' */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
          
          {/* Image (Ditaruh duluan di codingan biar di HP muncul di atas) */}
          <div className="w-full lg:flex-1">
            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video lg:aspect-auto lg:h-[400px]">
              <img
                src="https://placehold.co/600x400"
                alt="Bootcamp"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Bootcamp
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Kelas interaktif intensif bersama praktisi ahli, fokus pada
                praktek dan portofolio.
              </p>
            </div>
            <ul className="space-y-3 list-none">
              {[
                "Pembelajaran berbasis proyek (project-based) dengan studi kasus nyata dan diskusi interaktif.",
                "Sesi mentoring privat dan grup untuk membangun portofolio yang siap dilirik industri.",
                "Bergabung dengan jaringan 20.000+ alumni sukses yang telah terkurasi."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button size="lg" className="w-full md:w-auto">Lihat Pilihan Bootcamp</Button>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: MY MENTOR --- */}
        {/* Normal: Gambar Kiri, Teks Kanan */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          <div className="w-full lg:flex-1">
            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video lg:aspect-auto lg:h-[400px]">
              <img
                src="https://placehold.co/600x400"
                alt="Mentoring"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                My Mentor
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Bimbingan Karier Privat 1-on-1 dengan Praktisi Terbaik.
              </p>
            </div>
            <ul className="space-y-3 list-none">
               {[
                "Dapatkan sesi konsultasi deep-dive untuk bedah portofolio, CV, dan persiapan interview.",
                "Susun roadmap karier yang terpersonalisasi langsung dari ahli di bidang yang Anda tuju.",
                "Fleksibilitas penuh untuk menjadwalkan sesi kapanpun Anda membutuhkan bimbingan."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button size="lg" className="w-full md:w-auto">Cari Mentor Anda</Button>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: CORPORATE --- */}
        {/* Reverse: Teks Kiri, Gambar Kanan (Di Desktop) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
          
          <div className="w-full lg:flex-1">
            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video lg:aspect-auto lg:h-[400px]">
              <img
                src="https://placehold.co/600x400"
                alt="Corporate"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Corporate Service
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Solusi Pelatihan In-house & Kustom untuk Tim Perusahaan Anda.
              </p>
            </div>
            <ul className="space-y-3 list-none">
              {[
                "Kurikulum pelatihan yang dirancang khusus (customized) sesuai kebutuhan spesifik perusahaan Anda.",
                "Program upskilling & reskilling karyawan dengan metrik kesuksesan yang jelas dan terukur.",
                "Layanan B2B untuk talent acquisition dan program Management Trainee."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button size="lg" className="w-full md:w-auto">Hubungi Kami</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};