import React from "react";

const partners = [
  { name: "Google", logo: "https://placehold.co/120x60?text=Google" },
  { name: "Microsoft", logo: "https://placehold.co/120x60?text=Microsoft" },
  { name: "Amazon", logo: "https://placehold.co/120x60?text=Amazon" },
  { name: "Meta", logo: "https://placehold.co/120x60?text=Meta" },
  { name: "Netflix", logo: "https://placehold.co/120x60?text=Netflix" },
  { name: "Apple", logo: "https://placehold.co/120x60?text=Apple" },
  { name: "Gojek", logo: "https://placehold.co/120x60?text=Gojek" },
  { name: "Tokopedia", logo: "https://placehold.co/120x60?text=Tokopedia" },
  { name: "Traveloka", logo: "https://placehold.co/120x60?text=Traveloka" },
  { name: "Shopee", logo: "https://placehold.co/120x60?text=Shopee" },
  { name: "Lazada", logo: "https://placehold.co/120x60?text=Lazada" },
  { name: "Blibli", logo: "https://placehold.co/120x60?text=Blibli" },
];

export const Partner = () => {
  return (
    <div className="w-full py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10 md:gap-12">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col gap-3 items-center text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
            Partner Kami
          </h1>
          <div className="mx-auto h-1 w-28 rounded-full bg-primary" />
          <p className="text-sm md:text-base text-muted-foreground w-full md:w-2/3 lg:w-1/2">
            Para mentor kami adalah praktisi aktif yang membawa pengalaman dunia
            nyata dari perusahaan teknologi terdepan.
          </p>
        </div>

        {/* --- LOGO GRID SECTION --- */}
        {/* - grid-cols-2 : Di HP (2 logo per baris)
           - md:grid-cols-4 : Di Tablet (4 logo per baris)
           - lg:grid-cols-6 : Di Laptop (6 logo per baris)
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {partners.map((item, idx) => (
            <div
              key={idx}
              // Style Card:
              // 1. h-20 md:h-24: Tinggi fix biar rapi
              // 2. grayscale hover:grayscale-0: Efek hitam putih jadi warna
              // 3. opacity-70: Agak transparan biar gak mencolok, jadi jelas pas hover
              className="group flex items-center justify-center rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50"
            >
              <img
                src={item.logo}
                alt={item.name}
                // grayscale & opacity transition
                className="h-8 md:h-10 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};