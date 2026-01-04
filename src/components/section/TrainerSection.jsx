import React from "react";
import { Link } from "react-router-dom"; // Jangan lupa import ini
import { Card, CardContent } from "../ui/card";
import { ArrowRight } from "lucide-react"; // Import icon panah
import BgInfo from "../../assets/images/bg-trainer.svg";

export const Trainer = () => {
  // Data Dummy 12 item dengan Foto Asli Unsplash
  const trainers = [
    {
      name: "Sarah Jenkins",
      education: "M.Sc. Computer Science",
      experience: "Senior Engineer at Google",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "David Chen",
      education: "Ph.D. Data Science",
      experience: "Lead Data Scientist at Netflix",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Michael Johnson",
      education: "B.Eng Software Engineering",
      experience: "Tech Lead at Microsoft",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Emily Davis",
      education: "AI/ML Specialist",
      experience: "AI Researcher at OpenAI",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "James Wilson",
      education: "Full Stack Developer",
      experience: "VP of Engineering at Gojek",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Anita Rahmawati",
      education: "UI/UX Design Lead",
      experience: "Product Designer at Traveloka",
      image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Robert Fox",
      education: "DevOps Engineer",
      experience: "Cloud Architect at AWS",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Lisa Wong",
      education: "Cyber Security",
      experience: "Security Analyst at IBM",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    },
    {
        name: "Marcus Reid",
        education: "Blockchain Dev",
        experience: "Core Dev at Ethereum",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    },
    {
        name: "Sophia Li",
        education: "Product Manager",
        experience: "Senior PM at TikTok",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
    // Data ke-11 dan 12 ini TIDAK AKAN MUNCUL karena di-slice(0, 10)
    { name: "Extra User", education: "Hidden", experience: "Hidden", image: "https://placehold.co/300x200" },
    { name: "Extra User 2", education: "Hidden", experience: "Hidden", image: "https://placehold.co/300x200" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <Card
        className={"p-6 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 relative overflow-hidden"}
        style={{
          background: `linear-gradient(to right, #074799, #3DBDC2)`,
        }}
      >
        <img
          src={BgInfo}
          alt="Dekorasi background"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* BAGIAN TEKS */}
          <div className="w-full lg:w-1/5 flex flex-col gap-3 lg:gap-5 text-center shrink-0">
            <h1 className="text-xl md:text-2xl font-semibold text-white">
              Belajar Langsung dari Mentor Berpengalaman
            </h1>
            <p className="text-sm md:text-base text-justify text-white">
              Materi kami disusun dan dibawakan oleh para senior-level di
              bidangnya yang aktif bekerja di perusahaan teknologi terdepan.
            </p>
          </div>

          {/* BAGIAN LIST TRAINER */}
          <div className="w-full lg:flex-1 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-4 min-w-max">
              
              {/* SLICE DATA JADI 10 SAJA */}
              {trainers.slice(0, 10).map((trainer, index) => (
                <Card
                  key={index}
                  className="w-52 shrink-0 bg-white overflow-hidden"
                >
                  <CardContent className="text-center px-3">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="object-cover mb-2 rounded h-40 w-full"
                    />
                    <h3 className="font-semibold text-lg truncate">{trainer.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {trainer.education}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {trainer.experience}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {/* KARTU LIHAT SELENGKAPNYA (DI PALING KANAN) */}
              <Link to="/my-mentor" className="w-52 shrink-0 flex items-stretch text-decoration-none">
                 <div className="w-full h-full bg-white/10 hover:bg-white/20 border-2 border-white/30 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-6 gap-3 transition-colors cursor-pointer group text-white">
                    <div className="p-4 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                        <ArrowRight className="w-8 h-8" />
                    </div>
                    <span className="font-semibold text-center">Lihat Selengkapnya</span>
                 </div>
              </Link>

            </div>
          </div>

        </div>
      </Card>
    </div>
  );
};