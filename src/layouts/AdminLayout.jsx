import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/shared/AdminSidebar";
import { AdminHeader } from "@/components/admin/shared/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block h-screen sticky top-0">
        <AdminSidebar />
      </div>
      <div className="flex flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
};

export default AdminLayout;