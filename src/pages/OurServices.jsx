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
    </div>
  );
}
