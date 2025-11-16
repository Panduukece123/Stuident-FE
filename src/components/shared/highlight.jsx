import React from "react";
import { Button } from "../ui/button";
import { Check, CheckCheck, CheckCircle2 } from "lucide-react";

export const Highlight = () => {
  return (
    <div className="w-full p-6">
      <div className="mb-10 flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-semibold text-center">
          Temukan Jalur Belajar Terbaik Anda
        </h1>
        <p className="text-lg text-center w-4/5">
          Kami menyediakan beragam format pembelajaran untuk menyesuaikan dengan
          gaya dan kesibukan Anda.
        </p>
      </div>
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Image Section */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-2xl from-primary/10 to-primary/5 shadow-lg">
              <img
                src="https://placehold.co/600x400"
                alt="E-Learning Platform"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0  from-black/20 to-transparent" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl lg:text-2xl">
                E-Learning
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-md">
                Kuasai skill baru kapanpun & di manapun, dengan materi praktis
                dan sertifikat kelulusan.
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Akses materi video, modul, dan studi kasus secara fleksibel
                  sesuai kecepatan belajar Anda.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Kurikulum terstruktur yang dirancang praktis, mulai dari level
                  pemula hingga mahir.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Akses seumur hidup ke grup komunitas eksklusif dan sesi bonus
                  bulanan.
                </p>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-2">
              <Button size="lg">Jelajahi Materi</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl lg:text-2xl">
                Bootcamp
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-md">
                Kelas interaktif intensif bersama praktisi ahli, fokus pada
                praktek dan portofolio.
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Pembelajaran berbasis proyek (project-based) dengan studi
                  kasus nyata dan diskusi interaktif.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Sesi mentoring privat dan grup untuk membangun portofolio yang
                  siap dilirik industri.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Bergabung dengan jaringan 20.000+ alumni sukses yang telah
                  terkurasi.
                </p>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-2">
              <Button size="lg">Lihat Pilihan Bootcamp</Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-2xl from-primary/10 to-primary/5 shadow-lg">
              <img
                src="https://placehold.co/600x400"
                alt="E-Learning Platform"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0  from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Image Section */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-2xl from-primary/10 to-primary/5 shadow-lg">
              <img
                src="https://placehold.co/600x400"
                alt="E-Learning Platform"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0  from-black/20 to-transparent" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl lg:text-2xl">
                My Mentor
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-md">
                Bimbingan Karier Privat 1-on-1 dengan Praktisi Terbaik.
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Dapatkan sesi konsultasi deep-dive untuk bedah portofolio, CV,
                  dan persiapan interview.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Susun roadmap karier yang terpersonalisasi langsung dari ahli
                  di bidang yang Anda tuju.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Fleksibilitas penuh untuk menjadwalkan sesi kapanpun Anda
                  membutuhkan bimbingan.
                </p>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-2">
              <Button size="lg">Cari Mentor Anda</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl lg:text-2xl">
                Corporate Service
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-md">
                Solusi Pelatihan In-house & Kustom untuk Tim Perusahaan Anda.
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Kurikulum pelatihan yang dirancang khusus (customized) sesuai
                  kebutuhan spesifik perusahaan Anda.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Program upskilling & reskilling karyawan dengan metrik
                  kesuksesan yang jelas dan terukur.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                  Layanan B2B untuk talent acquisition dan program Management
                  Trainee.
                </p>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-2">
              <Button size="lg">Hubungi Kami</Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-2xl from-primary/10 to-primary/5 shadow-lg">
              <img
                src="https://placehold.co/600x400"
                alt="E-Learning Platform"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0  from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
