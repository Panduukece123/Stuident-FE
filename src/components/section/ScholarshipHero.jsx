import React, { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { GraduationCap, Globe, UserPlus, Search } from "lucide-react";
import FilterDropdown from "@/components/shared/FilterDropdownSimple";
import { fieldOptions, locationOptions, statusOptions } from "@/data/mockData";
import { useScholarship } from "@/context/ScholarshipContext";
import { useQueryClient } from "@tanstack/react-query";

export const ScholarshipHero = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  
  const { filters, updateFilter, setShowAllList } = useScholarship();
  const queryClient = useQueryClient();
  const hasFilteredRef = useRef(false);

  // Handle filter logic
  useEffect(() => {
    const isActive = 
      filters.search !== "" || 
      filters.location !== "" || 
      filters.field !== "" || 
      filters.status !== "";

    if (isActive) {
      hasFilteredRef.current = true;
      setShowAllList(true); 
    } else {
      if (hasFilteredRef.current) {
        setShowAllList(false); 
        queryClient.cancelQueries({ queryKey: ['all-scholarships'] });
        queryClient.removeQueries({ queryKey: ['all-scholarships'] });
        queryClient.invalidateQueries({ queryKey: ['popularity-scholarships'] });
        queryClient.invalidateQueries({ queryKey: ['recommended-scholarships'] });
        hasFilteredRef.current = false;
      }
    }
  }, [filters, queryClient, setShowAllList]);

  // Handle carousel
  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilter("search", searchValue);
  };

  const handleFilterChange = (key, value) => {
    updateFilter(key, value);
  };

  const handleClearFilter = (key) => {
    updateFilter(key, "");
  };

  const slides = [
    {
      id: 1,
      badge: "Raih Impianmu",
      icon: GraduationCap,
      headline: "FIND YOUR",
      highlight: "SCHOLAR",
      suffix: "SHIP",
      description: "Temukan berbagai program beasiswa dalam dan luar negeri untuk melanjutkan pendidikanmu",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop",
      color: "from-emerald-600/80 to-teal-900/90",
    },
    {
      id: 2,
      badge: "Studi di Luar Negeri",
      icon: Globe,
      headline: "EXPLORE",
      highlight: "GLOBAL",
      suffix: "OPPORTUNITIES",
      description: "Wujudkan mimpimu berkuliah di universitas terkemuka dunia",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop", 
      color: "from-blue-600/80 to-indigo-900/90",
    },
    {
      id: 3,
      badge: "Gabung Sekarang",
      icon: UserPlus,
      headline: "START YOUR",
      highlight: "JOURNEY",
      suffix: "TODAY",
      description: "Daftar sekarang dan dapatkan akses ke bimbingan beasiswa terbaik",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop",
      color: "from-rose-600/80 to-red-900/90", 
    },
  ];

  return (
    <section className="w-full relative">
      <Carousel
        setApi={setApi}
        className="w-full group"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => {
            const Icon = slide.icon;

            return (
              <CarouselItem key={slide.id} className="relative min-h-[380px] md:min-h-[420px]">
                
                <div className="absolute inset-0">
                  <img 
                    src={slide.image} 
                    alt="Scholarship Hero" 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${slide.color}`} />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* CONTENT CONTAINER */}
                <div className="relative z-10 w-full h-full py-10 px-6 flex flex-col justify-center items-center text-center">
                  <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    
                    {/* BADGE */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                      <Icon className="w-3 h-3 text-yellow-400" />
                      {slide.badge}
                    </div>

                    {/* HEADLINE */}
                    <div className="flex flex-col items-center gap-1">
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                        {slide.headline}
                      </h1>
                      <div className="flex flex-row items-center justify-center text-3xl md:text-5xl lg:text-6xl font-bold">
                        <span className="bg-[#ffda39] text-black px-3 py-0.5 rounded-lg shadow-lg mr-2 transform -rotate-1">
                          {slide.highlight}
                        </span>
                        <span className="text-white drop-shadow-lg">
                          {slide.suffix}
                        </span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-sm md:text-base text-gray-100 max-w-2xl leading-relaxed">
                      {slide.description}
                    </p>

                    {/* SEARCH BOX */}
                    <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mt-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cari beasiswa berdasarkan bidang, universitas, atau nama..."
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          className="w-full pl-12 pr-28 py-3 rounded-full bg-white/95 backdrop-blur-sm text-gray-800 text-sm placeholder:text-gray-500 shadow-xl border-2 border-white/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <button
                          type="submit"
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full transition-all shadow-lg"
                        >
                          Cari
                        </button>
                      </div>
                    </form>

                    {/* FILTER DROPDOWNS */}
                    <div className="flex flex-wrap justify-center gap-2 w-full max-w-2xl">
                      <FilterDropdown
                        label="Lokasi"
                        options={locationOptions}
                        value={filters.location}
                        onValueChange={(value) => handleFilterChange("location", value)}
                        onClear={() => handleClearFilter("location")}
                      />
                      <FilterDropdown
                        label="Status"
                        options={statusOptions}
                        value={filters.status}
                        onValueChange={(value) => handleFilterChange("status", value)}
                        onClear={() => handleClearFilter("status")}
                      />
                      <FilterDropdown
                        label="Bidang Studi"
                        options={fieldOptions}
                        value={filters.field}
                        onValueChange={(value) => handleFilterChange("field", value)}
                        onClear={() => handleClearFilter("field")}
                      />
                    </div>

                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="hidden md:block">
           <CarouselPrevious className="left-4 z-30 bg-white/10 hover:bg-white/30 text-white border-white/20" />
           <CarouselNext className="right-4 z-30 bg-white/10 hover:bg-white/30 text-white border-white/20" />
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index + 1 === current 
                  ? "bg-white w-8" 
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
