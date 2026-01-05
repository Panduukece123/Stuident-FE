import React, { useState } from "react";
import { 
  Code, Smartphone, Database, Palette, Globe, 
  Briefcase, Terminal, Cpu, LineChart,
  Video, Gamepad2, PenTool, Hash, Cloud, Lock,
  LayoutGrid, ChevronUp, Zap, Dna, FlaskConical, 
  Scroll, Coins, Users, Trophy, Music, Calculator
} from "lucide-react";

export const ElearningCategories = ({ categories = [], onCategoryClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic: Kalau tutup, tampilkan 9 item (slot ke-10 buat tombol). Kalau buka, tampilkan semua.
  const visibleCategories = isExpanded ? categories : categories.slice(0, 9);

  // Helper warna & icon (Gabungan logic supaya sesuai style baru)
  const getCategoryStyle = (categoryName) => {
    if (!categoryName) return { icon: Hash, color: "text-gray-500" };
    const lowerName = categoryName.toLowerCase();

    if (lowerName.includes("web") || lowerName.includes("react")) return { icon: Globe, color: "text-sky-500" };
    if (lowerName.includes("code") || lowerName.includes("dev")) return { icon: Code, color: "text-slate-700" };
    if (lowerName.includes("mobile") || lowerName.includes("android")) return { icon: Smartphone, color: "text-green-600" };
    if (lowerName.includes("game")) return { icon: Gamepad2, color: "text-purple-600" };
    if (lowerName.includes("data") || lowerName.includes("sql")) return { icon: Database, color: "text-amber-600" };
    if (lowerName.includes("design") || lowerName.includes("ui")) return { icon: Palette, color: "text-pink-500" };
    if (lowerName.includes("market") || lowerName.includes("finance")) return { icon: LineChart, color: "text-emerald-600" };
    if (lowerName.includes("security")) return { icon: Lock, color: "text-red-500" };
    if (lowerName.includes("iot")) return { icon: Cpu, color: "text-indigo-500" };
    if (lowerName.includes("math")) return { icon: Calculator, color: "text-blue-500" };
    if (lowerName.includes("music")) return { icon: Music, color: "text-rose-500" };
    if (lowerName.includes("sport")) return { icon: Trophy, color: "text-orange-500" };
    if (lowerName.includes("bio")) return { icon: Dna, color: "text-green-500" };
    if (lowerName.includes("phys")) return { icon: Zap, color: "text-yellow-500" };
    if (lowerName.includes("chem")) return { icon: FlaskConical, color: "text-purple-500" };
    
    return { icon: Hash, color: "text-gray-500" };
  };

  return (
    // LAYOUT 1: Container persis kode pertama
    <section className="py-6 px-6 bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Pilihan E-Learning</h2>
        <p className="text-muted-foreground mb-8">
          Temukan ribuan kursus pilihan yang diajarkan oleh instruktur terbaik.
        </p>

        {categories.length > 0 ? (
          <div className="flex flex-col items-center">
            
            {/* GRID LAYOUT 1: Tetap md:grid-cols-3 lg:grid-cols-5 sesuai kode pertama */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full animate-in fade-in duration-500">
              
              {visibleCategories.map((cat, index) => {
                const { icon: IconComponent, color } = getCategoryStyle(cat);

                return (
                  // STYLE KARTU: Mengikuti request kode kedua (kotak h-24, icon warna)
                  <button
                    key={index}
                    onClick={() => onCategoryClick && onCategoryClick(cat)}
                    className="flex flex-col items-center justify-center h-24 p-2 bg-background border rounded-xl hover:border-primary hover:shadow-md transition-all group"
                  >
                    <IconComponent className={`w-8 h-8 mb-2 ${color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-medium capitalize">{cat}</span>
                  </button>
                );
              })}

              {/* TOMBOL LAINNYA/TUTUP: Masuk ke dalam grid (sebagai kartu) sesuai request kode kedua */}
              {categories.length > 9 && (
                !isExpanded ? (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="flex flex-col items-center justify-center h-24 p-2 bg-muted/30 border-2 border-dashed border-muted-foreground/30 rounded-xl text-muted-foreground hover:bg-accent hover:text-primary hover:border-primary/50 transition-all"
                  >
                    <LayoutGrid className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium">Lainnya</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="flex flex-col items-center justify-center h-24 p-2 bg-destructive/5 border border-destructive/20 rounded-xl text-destructive hover:bg-destructive/10 hover:border-destructive/40 transition-all"
                  >
                    <ChevronUp className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium">Tutup</span>
                  </button>
                )
              )}

            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Belum ada kategori.</p>
        )}
      </div>
    </section>
  );
};