import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function Header() {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const items = [
    {
      id: 1,
      image: "https://placehold.co/600x400",
    },
    {
      id: 2,
      image: "https://placehold.co/600x400",
    },
    {
      id: 3,
      image: "https://placehold.co/600x400",
    },
    {
      id: 4,
      image: "https://placehold.co/600x400",
    },
    {
      id: 5,
      image: "https://placehold.co/600x400",
    },
  ];

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 30000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full p-6">
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={item.id}>
                <div className="p-1">
                  <div className="relative w-full h-96 overflow-hidden rounded-lg">
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
        </Carousel>
        <div className="flex justify-center gap-2 mt-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-1 rounded-full transition-all ${
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
