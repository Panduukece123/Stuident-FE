import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { carouselItems } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";

export function OurServices() {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full">
      {/* BANNER */}
      <div className="w-full mb-12">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6">
          <Carousel
            setApi={setApi}
            className="w-full relative group"
            opts={{ loop: true }}
          >
            <CarouselContent>
              {carouselItems.map((item) => (
                <CarouselItem key={item.id}>
                  <div>
                    <div className="relative w-full aspect-4/1 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={`Slide ${item.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CarouselNext className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Carousel>
          <div className="flex justify-center gap-2 mt-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1 md:h-2 rounded-full transition-all ${
                  current === index ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Photo + Desc 1*/}
      <div className="w-full mt-12">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[600px] md:pr-6">
                <Card>
                  <CardContent className="p-0">
                    <img
                      src="https://placehold.co/600x400"
                      alt="Service Photo"
                      className="w-full aspect-3/2 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Description Section */}
            <div className="flex flex-col justify-center md:pl-6">
              <h3 className="text-3xl font-bold mb-4">Stuident</h3>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed text-justify">
                Platform pembelajaran yang modern, responsif, dan mudah diakses oleh mahasiswa 
                dan pekerja untuk mendapatkan informasi program terbaru.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed text-justify">
                Dengan antarmuka yang intuitif, pengguna dapat dengan mudah menavigasi
                berbagai fitur seperti pendaftaran program, akses materi pembelajaran, 
                dan pelacakan kemajuan belajar mereka.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo + Desc 2*/}
      <div>
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center md:justify-start md:order-2">
              <div className="w-full max-w-[600px] md:pl-6">
                <Card>
                  <CardContent className="p-0">
                    <img
                      src="https://placehold.co/600x400"
                      alt="Service Photo"
                      className="w-full aspect-3/2 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Description Section */}
            <div className="flex flex-col justify-center md:order-1 md:pr-6">
              <h3 className="text-3xl font-bold mb-4">Stuident</h3>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed text-justify">
                Platform pembelajaran yang modern, responsif, dan mudah diakses oleh mahasiswa 
                dan pekerja untuk mendapatkan informasi program terbaru.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed text-justify">
                Dengan antarmuka yang intuitif, pengguna dapat dengan mudah menavigasi
                berbagai fitur seperti pendaftaran program, akses materi pembelajaran, 
                dan pelacakan kemajuan belajar mereka.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo + Desc 3*/}
      <div className="w-full mt-12">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[600px] md:pr-6">
                <Card>
                  <CardContent className="p-0">
                    <img
                      src="https://placehold.co/600x400"
                      alt="Service Photo"
                      className="w-full aspect-3/2 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Description Section */}
            <div className="flex flex-col justify-center md:pl-6">
              <h3 className="text-3xl font-bold mb-4">Stuident</h3>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed text-justify">
                Platform pembelajaran yang modern, responsif, dan mudah diakses oleh mahasiswa 
                dan pekerja untuk mendapatkan informasi program terbaru.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed text-justify">
                Dengan antarmuka yang intuitif, pengguna dapat dengan mudah menavigasi
                berbagai fitur seperti pendaftaran program, akses materi pembelajaran, 
                dan pelacakan kemajuan belajar mereka.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full mt-16">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6">
          <div className="bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold">Let's collaborate</h3>
              <p className="mt-2 text-sm md:text-base text-white/90">
                Ingin mengembangkan program bersama atau mengetahui lebih lanjut? Hubungi narahubung kami melalui WhatsApp.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/628123456789?text=${encodeURIComponent("Halo, saya tertarik untuk berkolaborasi.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-green-700 px-5 py-3 rounded-lg font-medium shadow hover:opacity-90 transition leading-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 align-middle" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.52 3.48A11.88 11.88 0 0012.01.04C6.01.04 1.06 4.99 1.06 10.99c0 1.94.5 3.83 1.45 5.52L.05 23l6.66-1.76A11.94 11.94 0 0012.01 22c6 0 10.95-4.95 10.95-10.96 0-3.01-1.18-5.82-3.44-7.56zM12.01 20.07c-1.16 0-2.29-.25-3.33-.73l-.24-.1-3.95 1.05 1.05-3.84-.12-.26a8.03 8.03 0 01-1.27-4.1c0-4.48 3.64-8.12 8.12-8.12 4.48 0 8.12 3.64 8.12 8.12 0 4.48-3.64 8.12-8.12 8.12z"/>
                  <path d="M16.02 14.6l-.9-.3a1.7 1.7 0 00-1.66.38l-.38.34a8.71 8.71 0 01-3.94-3.95l.34-.38a1.66 1.66 0 00.38-1.66l-.3-.9A1.69 1.69 0 008.7 6.4L8.05 6.1C7.86 6 7.63 6.08 7.49 6.26A6.44 6.44 0 005.9 9c-.05.17-.11.34-.16.51-.2.75-.05 1.53.48 2.1l1.77 1.77a9.38 9.38 0 004.97 2.77c.79.17 1.6-.18 2.05-.85l.71-1.02c.18-.26.14-.59-.1-.76z"/>
                </svg>
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
