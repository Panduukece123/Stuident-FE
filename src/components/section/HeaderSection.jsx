import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "@/components/ui/carousel";
import { carouselItems } from "@/data/mockData";

export function Header() {
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
    <div className="max-w-7xl mx-auto">
      <div className="w-full p-4 md:p-6">
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
                      src={item.image} // Keep the original image source
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
  );
}