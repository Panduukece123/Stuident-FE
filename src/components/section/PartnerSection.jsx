import React from "react";

const partners = [
  // TECH GIANTS
  { 
    name: "Google", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
  },
  { 
    name: "Microsoft", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" 
  },
  { 
    name: "Amazon", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
  },
  { 
    name: "Meta", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" 
  },
  { 
    name: "Netflix", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
  },
  { 
    name: "Apple", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
  },
  
  // INDONESIA & ASIA TECH
  { 
    name: "Gojek", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Gojek_logo_2019.svg" 
  },
  { 
    name: "Tokopedia", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_of_Tokopedia.svg" 
  },
  { 
    name: "Traveloka", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Traveloka_Primary_Logo.svg/2560px-Traveloka_Primary_Logo.svg.png" 
  },
  { 
    name: "Shopee", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" 
  },
  { 
    name: "Lazada", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Lazada_Logo.svg" 
  },
  { 
    name: "Blibli", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blibli_logo.svg" 
  },
];

export const Partner = () => {
  return (
    <div className="w-full py-8 md:py-6 bg-background">
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {partners.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-center rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50"
            >
              <img
                src={item.logo}
                alt={item.name}
                // PERUBAHAN: Hapus 'grayscale' dan 'opacity'. 
                // Tambah 'group-hover:scale-110' biar ada efek zoom dikit pas hover.
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};