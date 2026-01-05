import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, GraduationCap, Trophy } from "lucide-react";

export const LandingBanner = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  // STATE: Cek status login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cek token saat komponen dimuat
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true jika token ada, false jika tidak

    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const slides = [
    {
      id: 1,
      badge: "New Course Available",
      icon: Sparkles,
      title: "Kuasai Skill Masa Depan",
      description: "Tingkatkan karirmu dengan ribuan kursus teknologi terkini mulai dari AI, Blockchain, hingga Cloud Computing.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop",
      color: "from-blue-600/90 to-slate-900/90",
      linkSecondary: "/e-learning",      // Tujuan jika sudah login
      textSecondary: "Lihat Katalog"
    },
    {
      id: 2,
      badge: "Scholarship Open",
      icon: GraduationCap,
      title: "Program Beasiswa 2026",
      description: "Kesempatan emas belajar gratis untuk talenta digital berbakat. Dapatkan pendanaan penuh dan sertifikasi industri.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1920&auto=format&fit=crop", 
      color: "from-yellow-600/90 to-orange-900/90",
      linkSecondary: "/scholarship",  // Tujuan jika sudah login
      textSecondary: "Info Beasiswa"
    },
    {
      id: 3,
      badge: "Expert Mentoring",
      icon: Trophy,
      title: "Mentoring Eksklusif",
      description: "Bukan sekadar video. Dapatkan bimbingan langsung one-on-one dari para senior engineer di perusahaan unicorn.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920&auto=format&fit=crop",
      color: "from-emerald-600/90 to-teal-900/90",
      linkSecondary: "/my-mentor",      // Tujuan jika sudah login
      textSecondary: "Cari Mentor"
    },
  ];

  return (
    <section className="w-full relative group pb-6">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 10000, 
          }),
        ]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => {
            const Icon = slide.icon;

            const primaryLink = isLoggedIn ? slide.linkSecondary : "/login";

            return (
              <CarouselItem key={slide.id} className="relative min-h-[250px] md:min-h-[350px]">
                
                {/* BACKGROUND IMAGE & OVERLAY */}
                <div className="absolute inset-0">
                  <img 
                    src={slide.image} 
                    alt="Banner Background" 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* CONTENT CONTAINER */}
                <div className="relative z-10 w-full h-full py-14 px-6 flex flex-col justify-center items-center text-center">
                  <div className="container mx-auto max-w-4xl flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    
                    {/* BADGE */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-medium">
                      <Icon className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                      {slide.badge}
                    </div>

                    {/* TITLE */}
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
                      {slide.title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="text-sm md:text-base text-gray-100 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                      
                      {/* TOMBOL PRIMARY (DINAMIS) */}
                      <Link to={primaryLink}>
                        <Button
                          size="default"
                          className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 font-bold shadow-xl border-none"
                        >
                          Mulai Belajar
                        </Button>
                      </Link>
                      
                      {/* TOMBOL SECONDARY (TETAP) */}
                      <Link to={slide.linkSecondary}>
                        <Button
                          variant="secondary"
                          size="default"
                          className="bg-white cursor-pointer text-primary hover:bg-gray-100 font-bold shadow-xl border-none"
                        >
                          {slide.textSecondary} <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>

                    </div>

                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-8 bg-white/10 hover:bg-white/30 border-white/20 text-white backdrop-blur-sm" />
          <CarouselNext className="right-8 bg-white/10 hover:bg-white/30 border-white/20 text-white backdrop-blur-sm" />
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index + 1 === current 
                  ? "bg-white w-6 md:w-8" 
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </Carousel>
    </section>
  );
};