import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, LogOut, Settings, ShoppingCart, User, Loader2, Edit } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"; 
import ProfileService from "@/services/ProfileService";
import authService from "@/services/AuthService";

export const ProfileLayout = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageHash, setImageHash] = useState(Date.now()); 

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    try {
      const result = await ProfileService.getProfile();
      setProfileData(result.data || result);
    } catch (error) {
      console.error("Gagal load me:", error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File terlalu besar! Maksimal 2MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Harap upload file gambar.");
      return;
    }

    try {
      setUploading(true);
      await ProfileService.uploadAvatar(file);
      
      const result = await ProfileService.getProfile();
      const freshData = result.data || result;
      setProfileData(freshData);
      
      if (freshData.user) {
        localStorage.setItem("user", JSON.stringify(freshData.user));
        window.dispatchEvent(new Event("user-updated"));
      }

      setImageHash(Date.now());
      alert("Foto profil berhasil diperbarui!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload foto profil.");
    } finally {
      setUploading(false);
      e.target.value = null; 
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const getSidebarClass = (path) => {
    const isActive = pathname === path;
    return `w-full justify-start text-base h-10 px-4 ${
      isActive ? "text-primary font-medium" : "font-light text-neutral-700 hover:bg-neutral-100 hover:text-primary" 
    }`;
  };

  if (loading && !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const user = profileData?.user || profileData;

  // --- REFACTOR: PANGGIL SERVICE (Bersih & Rapi) ---
  const avatarSrc = user 
    ? `${ProfileService.getAvatarUrl(user)}?t=${imageHash}` 
    : "";

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-neutral-50 p-6">
      <div className="flex flex-col justify-between overflow-hidden rounded-xl bg-linear-to-r from-[#074799] to-[#3DBDC2] p-8 text-white shadow-md md:flex-row md:items-center">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Avatar className="h-32 w-32 shadow-sm bg-white">
            <AvatarImage
              src={avatarSrc} // <--- Pakai variabel yang sudah direfactor
              alt={user?.name}
              className="h-full w-full object-cover"
            />
            <AvatarFallback className="text-neutral-800 font-medium text-5xl">
              {user?.name ? user.name.split(" ").map((n)=>n[0]).join("").substring(0, 2).toUpperCase() : "US"}
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
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/png, image/jpeg, image/jpg, image/gif"
          />
          <Button 
            variant="outline" 
            className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#074799] backdrop-blur-sm transition-all"
            onClick={handleEditAvatarClick}
            disabled={uploading}
          >
            {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Edit className="mr-2 h-4 w-4" />}
            {uploading ? "Uploading..." : "Edit Avatar"}
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
            <Link to="/profile/my-enrolled-courses">
              <Button variant="ghost" className={getSidebarClass("/profile/my-enrolled-courses")}>
                 <GraduationCap className="mr-3 h-5 w-5" /> Enrolled Courses
              </Button>
            </Link>
            <Link to="/profile/my-order-history">
              <Button variant="ghost" className={getSidebarClass("/profile/my-order-history")}>
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
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-base font-light text-red-500 hover:bg-red-50 hover:text-red-600 h-10 px-4">
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