import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

export const LandingBanner = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
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
      title: "Belajar Skill Baru Hari Ini",
      description:
        "Tingkatkan karirmu dengan ribuan kursus dari instruktur ahli.",
      bg: "bg-gradient-to-r from-blue-600 to-cyan-500",
    },
    {
      id: 2,
      title: "Diskon Spesial Bulan Ini",
      description: "Dapatkan potongan harga hingga 50% untuk kursus pilihan.",
      bg: "bg-gradient-to-r from-indigo-600 to-purple-500",
    },
    {
      id: 3,
      title: "Mentoring Eksklusif",
      description: "Bimbingan langsung dari para profesional di bidangnya.",
      bg: "bg-gradient-to-r from-emerald-600 to-teal-500",
    },
  ];

  return (
    <section className="w-full relative pb-6">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div
                className={`w-full ${slide.bg} text-white py-20 px-6 text-center min-h-[300px] flex flex-col items-center justify-center`}
              >
                <div className="container mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="font-semibold"
                  >
                    Mulai Belajar
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 border-none text-white" />
          <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 border-none text-white" />
        </div>
      </Carousel>

      {/* Dots Indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index + 1 === current ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
