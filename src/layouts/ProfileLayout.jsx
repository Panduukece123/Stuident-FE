import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, LogOut, Settings, ShoppingCart, User, Loader2, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import ProfileService from "@/services/ProfileService";

export const ProfileLayout = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ProfileService.getProfile();
        setProfileData(result.data || result);
      } catch (error) {
        console.error("Gagal load me:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getSidebarClass = (path) => {
    // Cek apakah URL saat ini sama dengan path tombol
    const isActive = pathname === path;
    
    return `w-full justify-start text-base h-10 px-4 ${
      isActive 
        ? "text-primary font-medium" // Style Kalo Aktif
        : "font-light text-neutral-700 hover:bg-neutral-100 hover:text-primary" // Style Biasa
    }`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const user = profileData?.user || profileData;

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-neutral-50 p-6">
      <div className="flex flex-col justify-between overflow-hidden rounded-xl bg-linear-to-r from-[#074799] to-[#3DBDC2] p-8 text-white shadow-md md:flex-row md:items-center">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Avatar className="h-32 w-32 border-4 border-white/30 shadow-sm bg-white">
            <AvatarImage
              src={user?.avatar_url}
              alt={user?.name}
              className="h-full w-full object-cover"
            />
            <AvatarFallback className="text-neutral-800 font-medium text-5xl">
                {user?.name ? user.name.split(" ").map((n)=>n[0]).join("").substring(0, 2) : "US"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">{user?.name || "User"}</h1>
            <p className="opacity-90">{user?.email}</p>
            <p className="opacity-90">{user?.phone || "-"}</p>
            <div className="mt-2 flex items-center justify-center gap-3 md:justify-start">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm border border-white/10">
                {user?.role || "Student"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#074799] backdrop-blur-sm transition-all">
            <Edit className="mr-2 h-4 w-4" /> Edit Avatar
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="w-full shrink-0 md:w-64">
          <div className="sticky top-20 flex flex-col gap-2 rounded-xl border border-neutral-300 bg-white p-4 shadow-sm">
            <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Menu</h2>
            
            <Link to="/profile/my-profile">
              <Button variant="ghost" className={getSidebarClass("/profile/my-profile")}>
                 <User className="mr-3 h-5 w-5" /> My Profile
              </Button>
            </Link>

            <Link to="/profile/enrolled-courses">
              <Button variant="ghost" className={getSidebarClass("/profile/enrolled-courses")}>
                 <GraduationCap className="mr-3 h-5 w-5" /> Enrolled Courses
              </Button>
            </Link>

            <Link to="/profile/order-history">
              <Button variant="ghost" className={getSidebarClass("/profile/order-history")}>
                 <ShoppingCart className="mr-3 h-5 w-5" /> Order History
              </Button>
            </Link>

            <div className="my-2 h-px w-full bg-neutral-100" />
            
            <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2 mt-2">Account</h2>
            
            <Link to="/profile/settings">
              <Button variant="ghost" className={getSidebarClass("/profile/settings")}>
                 <Settings className="mr-3 h-5 w-5" /> Settings
              </Button>
            </Link>

            <Button variant="ghost" className="w-full justify-start text-base font-light text-red-500 hover:bg-red-50 hover:text-red-600 h-10 px-4">
               <LogOut className="mr-3 h-5 w-5" /> Logout
            </Button>
          </div>
        </aside>

        <main className="w-full">
            <Outlet context={profileData} />
        </main>
      </div>
    </div>
  );
};