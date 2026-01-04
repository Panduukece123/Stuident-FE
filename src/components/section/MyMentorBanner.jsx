import React, { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Sparkles, GraduationCap, Rocket, Target } from "lucide-react";

export const MyMentorBanner = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const slides = [
    {
      id: 1,
      title: "CHOOSE YOUR",
      highlight: "MENTOR",
      afterText: "", 
      desc: "Bimbingan 1-on-1 bersama para ahli untuk raih prestasi akademik impianmu.",
      bgColor: "bg-[#EEF2FF]", 
      accentColor: "bg-[#FFDA35]",
      tag: "ACADEMIC EXCELLENCE",
      icon: <GraduationCap size={160} />
    },
    {
      id: 2,
      title: "YOU LIKE THIS ?", 
      highlight: "LIFE",
      afterText: "COACHING",
      desc: "Rancang strategi masa depan dan temukan potensi terbaik dalam dirimu.",
      bgColor: "bg-[#FDF2F8]",
      accentColor: "bg-[#4ADE80]",
      tag: "PERSONAL GROWTH",
      icon: <Target size={160} />
    },
    {
      id: 3,
      title: "OR THIS ?", 
      highlight: "ACADEMIC",
      afterText: "COACHING",
      desc: "Bangun networking dan persiapkan karir profesionalmu sejak dini bersama kami.",
      bgColor: "bg-[#FFF7ED]",
      accentColor: "bg-[#60A5FA]",
      tag: "CAREER PREPARATION",
      icon: <Rocket size={160} />
    },
  ];

 return (
    <section className="w-full relative group overflow-hidden border-none p-0 m-0">
      <Carousel setApi={setApi} plugins={[plugin.current]} className="w-full border-none">
        <CarouselContent className="ml-0 border-none">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 border-none">
              {/* DIKECILKAN: min-h dikurangi dari 500px ke 350px/450px */}
              <div className={`relative w-full min-h-[350px] md:min-h-[450px] py-12 flex items-center justify-center transition-colors duration-500 ${slide.bgColor}`}>
                
                {/* Ikon Background tetap ada tapi disesuaikan ukurannya */}
                <div className="absolute top-5 left-10 opacity-10 hidden lg:block rotate-[-15deg] pointer-events-none">
                  <GraduationCap size={120} />
                </div>

                <div className="text-center relative z-10 px-4 md:px-0 flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest mb-6 shadow-md">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    {slide.tag}
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 mb-6 w-full">
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-neutral-900 leading-none uppercase min-h-[1em]">
                      {slide.title}
                    </h1>
                    
                    <div className="flex flex-row items-center justify-center gap-3 md:gap-5 mt-1">
                      <div className={`px-5 md:px-8 py-2 md:py-3 rounded-[1.2rem] md:rounded-[2rem] border-[3px] md:border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 ${slide.accentColor}`}>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-black leading-none uppercase">
                          {slide.highlight}
                        </h2>
                      </div>
                      {slide.afterText && (
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-neutral-900 leading-none uppercase">
                          {slide.afterText}
                        </h2>
                      )}
                    </div>
                  </div>

                  <p className="max-w-xs md:max-w-xl mx-auto text-sm md:text-lg text-neutral-700 font-bold leading-snug">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all" />
      </Carousel>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 rounded-full ${index + 1 === current ? "w-8 h-1.5 bg-black/80" : "w-1.5 h-1.5 bg-black/20"}`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
};