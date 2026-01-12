import React from "react";

const partners = [
  // --- TECH GIANTS (DEFAULT) ---
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
  
  // --- GLOBAL TECH (PENGGANTI YANG ERROR) ---
  // Adobe, Samsung, Intel diganti dengan link PNG yang stabil
  { 
    name: "Zoom", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/2560px-Zoom_Communications_Logo.svg.png" 
  },
  { 
    name: "Spotify", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" 
  },
  { 
    name: "Salesforce", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png" 
  },
  { 
    name: "Dropbox", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Dropbox_logo_2017.svg/2560px-Dropbox_logo_2017.svg.png" 
  },
  { 
    name: "IBM", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" 
  },
  { 
    name: "Oracle", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" 
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
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};