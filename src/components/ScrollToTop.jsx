// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router"; // Atau "react-router-dom"

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Geser window ke posisi x:0, y:0 (Pojok Kiri Atas)
    window.scrollTo(0, 0);
  }, [pathname]); // Jalankan setiap kali 'pathname' (URL) berubah

  return null; // Komponen ini tidak merender apa-apa di layar
}