import React from "react";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  MapPin,
  Mail,
  Building2,
  Clock,
  Globe,
  GraduationCap,
  Briefcase,
  Linkedin, // Import Icon LinkedIn
  Instagram, // Import Icon Instagram
} from "lucide-react";

// --- DATA SERVICES ---
const servicesData = [
  {
    id: 1,
    badge: "Education & Development",
    title: "Rekan Academy",
    icon: GraduationCap,
    description:
      "Divisi yang berfokus pada pengembangan karakter dan manajemen pendidikan untuk mencetak talenta unggul masa depan.",
    points: [
      "Scholarship & Fellowship Management",
      "Students Character Development",
      "Alumni Management",
      "Revund (Fund Management)",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "Professional Services",
    title: "Rekan Pro",
    icon: Briefcase,
    description:
      "Solusi strategis untuk kebutuhan korporasi mulai dari rekrutmen talenta terbaik hingga konsultasi teknis.",
    points: [
      "Assessment & Consultant",
      "Recruitment & Selection",
      "Corporate Training",
      "IT Solutions",
    ],
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
  },
];

export function OurServices() {
  return (
    <section className="w-full pb-10 bg-background">
      {/* --- 1. HERO: POWERED BY REKANESIA --- */}
      <div className="w-full bg-primary/5 border-b mb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Teks Intro */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                <Building2 className="w-4 h-4" />
                Powered by PT Resultan Karya Indonesia
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                Menciptakan Dampak Nyata & Berkelanjutan
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                Bersama <strong>Rekanesia</strong>, kami merancang setiap proyek
                edukasi dan teknologi dengan visi jangka panjang. Melalui
                ekosistem <strong>Stuident</strong>, kami menghadirkan solusi
                terintegrasi antara pengembangan karakter siswa dan kebutuhan
                profesional industri.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://rekanesia.co.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                  >
                    <Globe className="mr-2 w-4 h-4" /> Website Rekanesia
                  </Button>
                </a>
              </div>
            </div>

            {/* Gambar Hero */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Tim Rekanesia"
                className="relative z-10 w-full rounded-2xl shadow-2xl object-cover aspect-video transform hover:scale-[1.02] transition-transform duration-500"
              />

              <div className="absolute bottom-6 right-6 z-20 bg-background/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-border">
                <p className="text-sm font-bold text-foreground">
                  PT Resultan Karya Indonesia
                </p>
                <p className="text-xs text-muted-foreground">
                  Depok, West Java
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. SERVICES LIST --- */}
      <div className="flex flex-col gap-10 mb-10">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          const Icon = service.icon;

          return (
            <div key={service.id} className="w-full">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
                <div
                  className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${
                    !isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative w-full h-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover block transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col gap-5">
                    <div className="inline-flex">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wide border border-primary/20">
                        {service.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed text-justify">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {service.points.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-foreground font-medium p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- 3. CTA & CONTACT HUB --- */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
          <div
            className="text-white rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(to right, #074799, #3DBDC2)`,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Kolom Kiri: Info Kantor */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Hubungi Kami
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed mb-8">
                    Silakan hubungi kami untuk diskusi lebih lanjut mengenai
                    program beasiswa, pengembangan karakter siswa, atau
                    kebutuhan rekrutmen perusahaan Anda.
                  </p>
                </div>

                <div className="space-y-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <div className="flex items-start gap-4">
                    <Building2 className="w-6 h-6 text-white shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">
                        PT RESULTAN KARYA INDONESIA
                      </h4>
                      <div className="flex gap-2 mt-1 text-white/80 text-sm">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>
                          Jl. H. Kodja Raya No.10, RT.3/RW.4, Kukusan, Kec.
                          Beji, Kota Depok, Jawa Barat 16425
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Tombol Aksi */}
              <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-center items-start lg:items-center border-t lg:border-t-0 lg:border-l border-white/20">
                <div className="w-full max-w-sm space-y-4">
                  <p className="text-center text-white/90 mb-6 font-medium">
                    Saluran Komunikasi Resmi:
                  </p>

                  {/* WhatsApp */}
                  <a
                    href="http://wa.me/6285124423755"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg group"
                  >
                    <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Chat WhatsApp
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@rekanesia.co.id"
                    className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-100 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg group"
                  >
                    <Mail className="w-6 h-6 text-slate-900 group-hover:scale-110 transition-transform" />
                    Kirim Email
                  </a>

                  {/* SOSMED BUTTONS (ROW) */}
                  <div className="flex gap-4 w-full">
                    {/* LinkedIn */}
                    <a
                      href="https://id.linkedin.com/company/rekanesia" // Ganti URL
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#0077b5] hover:bg-[#005e93] text-white font-semibold py-3 rounded-xl transition-all shadow-lg group"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/rekanesia/" // Ganti URL
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all shadow-lg group"
                    >
                      <Instagram className="w-5 h-5" />
                      Instagram
                    </a>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Jl.+H.+Kodja+Raya+No.10,+Kukusan,+Depok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full mt-4"
                  >
                    <Button
                      variant="link"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      Lihat Lokasi di Google Maps{" "}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
