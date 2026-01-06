import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Coffee } from "lucide-react";
import BgInfo from "../../assets/images/bg-infografis.svg";

// Menerima props dari Parent (ElearningPage)
export const InfoSubscription = ({ subscriptions, loading, onSubscribe }) => {
  
  // Helper: Cek status plan berdasarkan props subscriptions
  const isPlanActive = (planName) => {
    return subscriptions.some(
      (sub) => sub.plan === planName && sub.status === "active"
    );
  };

  // --- STYLES ---
  const styles = {
    headerPadding: "text-center ",
    iconWrapper: "mx-auto p-3 rounded-full w-fit mb-3",
    iconSize: "h-6 w-6",
    titleFont: "text-xl font-bold",
    priceFont: "text-3xl font-bold text-slate-800",
    descFont: "text-xs text-muted-foreground ",
    listContainer: "space-y-2",
    listText: "text-sm text-slate-600 flex items-center gap-2",
    checkIcon: "h-4 w-4 flex-shrink-0",
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Card
        className="p-6 md:p-8 relative overflow-hidden border-none shadow-2xl"
        style={{
          background: `linear-gradient(to right, #074799, #3DBDC2)`,
        }}
      >
        <img
          src={BgInfo}
          alt="Dekorasi background"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-20"
        />
        <div className="text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold ">
            Pilih Paket Belajarmu
          </h2>
          <p className="text-blue-100 text-sm md:text-base opacity-90">
            Investasi terbaik untuk masa depan karir kodingmu.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
          
          {/* 1. FREE PLAN */}
          <Card className="relative bg-white border-2 border-amber-700 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white order-2 md:order-1 flex flex-col h-full">
            <CardHeader className={styles.headerPadding}>
              <div className={`${styles.iconWrapper} bg-amber-100`}>
                <Coffee className={`${styles.iconSize} text-amber-700`} />
              </div>
              <CardTitle className={`${styles.titleFont} text-amber-900`}>
                Free
              </CardTitle>
              <div className={styles.priceFont}>Rp 0</div>
              <CardDescription className={styles.descFont}>
                Mulai iseng-iseng
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className={styles.listContainer}>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-amber-600`} />
                  <span>Akses Terbatas</span>
                </li>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-amber-600`} />
                  <span>Komunitas Umum</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className={styles.footerPadding}>
              <Button
                variant={isPlanActive("free") ? "secondary" : "outline"}
                disabled={isPlanActive("free") || loading}
                onClick={() => onSubscribe("free")}
                className={
                  isPlanActive("free")
                    ? "w-full bg-slate-200 text-slate-500 cursor-not-allowed border-none"
                    : "w-full border-amber-700 text-amber-700 hover:bg-amber-50"
                }
              >
                {loading ? "..." : isPlanActive("free") ? "Paket Aktif" : "Daftar Gratis"}
              </Button>
            </CardFooter>
          </Card>

          {/* 2. PREMIUM PLAN */}
          <Card className="bg-white border-2 border-purple-600 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative order-1 md:order-2 flex flex-col h-full ">
            <div className="absolute top-0 inset-x-0 mx-auto w-fit -mt-3">
              <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Paling Laris
              </span>
            </div>
            <CardHeader className={styles.headerPadding}>
              <div className={`${styles.iconWrapper} bg-purple-100 animate-pulse`}>
                <Star className={`${styles.iconSize} text-purple-600 fill-purple-600`} />
              </div>
              <CardTitle className={`${styles.titleFont} text-purple-900`}>
                Premium
              </CardTitle>
              <div className={styles.priceFont}>
                Rp 1.999.000
                <span className="text-sm font-normal text-muted-foreground">/bln</span>
              </div>
              <CardDescription className={styles.descFont}>
                Full Akses + Mentor
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className={styles.listContainer}>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-purple-600`} />
                  <span>Semua Course Terbuka</span>
                </li>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-purple-600`} />
                  <span>1-on-1 Mentoring</span>
                </li>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-purple-600`} />
                  <span>Sertifikat Kompetensi</span>
                </li>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-purple-600`} />
                  <span>Code Review</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className={styles.footerPadding}>
              <Button
                disabled={isPlanActive("premium") || loading}
                // Panggil function dari props saat diklik
                onClick={() => onSubscribe("premium")}
                className={
                  isPlanActive("premium")
                    ? "w-full bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
                    : "w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200"
                }
              >
                {loading ? "..." : isPlanActive("premium") ? "Paket Aktif" : "Langganan Sekarang"}
              </Button>
            </CardFooter>
          </Card>

          {/* 3. REGULAR PLAN */}
          <Card className="relative bg-white border-2 border-yellow-500 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white order-3 md:order-3 flex flex-col h-full">
            <CardHeader className={styles.headerPadding}>
              <div className={`${styles.iconWrapper} bg-yellow-50`}>
                <Zap className={`${styles.iconSize} text-yellow-600`} />
              </div>
              <CardTitle className={`${styles.titleFont} text-yellow-700`}>
                Regular
              </CardTitle>
              <div className={styles.priceFont}>
                Rp 999.000
                <span className="text-sm font-normal text-muted-foreground">/crs</span>
              </div>
              <CardDescription className={styles.descFont}>
                Beli Ketengan
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className={styles.listContainer}>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-yellow-500`} />
                  <span>Akses Selamanya</span>
                </li>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-yellow-500`} />
                  <span>Sertifikat Tamat</span>
                </li>
                <li className={styles.listText}>
                  <Check className={`${styles.checkIcon} text-yellow-500`} />
                  <span>Grup Telegram</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={isPlanActive("regular") ? "secondary" : "outline"}
                disabled={isPlanActive("regular") || loading}
                // Panggil function dari props saat diklik
                onClick={() => onSubscribe("regular")}
                className={
                  isPlanActive("regular")
                    ? "w-full bg-slate-200 text-slate-500 cursor-not-allowed border-none"
                    : "w-full border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                }
              >
                {loading ? "..." : isPlanActive("regular") ? "Paket Aktif" : "Beli Regular"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Card>
    </div>
  );
};