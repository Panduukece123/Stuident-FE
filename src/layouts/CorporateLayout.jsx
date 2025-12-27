import React from "react";
import { Outlet } from "react-router-dom";
import { CorporateSidebar } from "@/components/corporate/shared/CorporateSidebar"; // Sesuaikan path
import { CorporateHeader } from "@/components/corporate/shared/CorporateHeader"; // Sesuaikan path

const CorporateLayout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
      {/* SIDEBAR FIXED DI KIRI */}
      <div className="hidden border-r bg-muted/40 md:block h-screen sticky top-0 overflow-hidden">
        <CorporateSidebar />
      </div>
      
      {/* KONTEN KANAN */}
      <div className="flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <CorporateHeader />
        
        {/* MAIN CONTENT (SCROLLABLE) */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-50/50">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
};

export default CorporateLayout;