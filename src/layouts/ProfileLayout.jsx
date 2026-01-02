import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  LogOut,
  ShoppingCart,
  User,
  Loader2,
  Edit,
  Presentation, // Icon untuk Mentoring Session
} from "lucide-react";
import React, { useState, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProfileService from "@/services/ProfileService";
import authService from "@/services/AuthService";
import { ProfileLayoutSkeleton } from "@/components/skeleton/ProfileSkeleton";

export const ProfileLayout = () => {
  const queryClient = useQueryClient();
  const [imageHash, setImageHash] = useState(Date.now());
  const token = localStorage.getItem("token");

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const fileInputRef = useRef(null);

  // --- FETCH PROFILE ---
  const { data: profileData, isLoading: loading } = useQuery({
    queryKey: ["profile", token],
    queryFn: async () => {
      try {
        const result = await ProfileService.getProfile();
        return result.data || result;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // --- UPLOAD MUTATION ---
  const uploadMutation = useMutation({
    mutationFn: (file) => ProfileService.uploadAvatar(file),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      setImageHash(Date.now());
      const updatedData = queryClient.getQueryData(["profile"]);
      if (updatedData?.user) {
        localStorage.setItem("user", JSON.stringify(updatedData.user));
        window.dispatchEvent(new Event("user-updated"));
      }
      alert("Foto profil berhasil diperbarui!");
    },
    onError: (error) => {
      console.error("Upload error:", error);
      alert("Gagal upload foto profil.");
    },
  });

  // --- HANDLERS ---
  const handleEditAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
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
    uploadMutation.mutate(file);
    e.target.value = null;
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      queryClient.clear();
      navigate("/login");
    }
  };

  const getSidebarClass = (path) => {
    const isActive = pathname === path;
    return `w-full justify-start text-base h-10 px-4 ${
      isActive
        ? "text-primary font-medium"
        : "font-light text-neutral-700 hover:bg-neutral-100 hover:text-primary"
    }`;
  };

  // --- UI ---
  if (loading) {
    return <ProfileLayoutSkeleton />;
  }

  const user = profileData?.user || profileData;
  const isUploading = uploadMutation.isPending;

  const avatarSrc = user
    ? `${ProfileService.getAvatarUrl(user)}?t=${imageHash}`
    : "";

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-neutral-50 p-6">
      <div className="flex flex-col justify-between overflow-hidden rounded-xl bg-linear-to-r from-[#074799] to-[#3DBDC2] p-8 text-white shadow-md md:flex-row md:items-center">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Avatar className="h-32 w-32 shadow-sm bg-white">
            <AvatarImage
              src={avatarSrc}
              alt={user?.name}
              className="h-full w-full object-cover"
            />
            <AvatarFallback className="text-neutral-800 font-medium text-5xl">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()
                : "US"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">
              {user?.name || "User"}
            </h1>
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
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {isUploading ? "Uploading..." : "Edit Avatar"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="w-full shrink-0 md:w-64">
          <div className="sticky top-20 flex flex-col gap-2 rounded-xl border border-neutral-300 bg-white p-4 shadow-sm">
            <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
              Menu
            </h2>
            <Link to="/profile/my-profile">
              <Button
                variant="ghost"
                className={getSidebarClass("/profile/my-profile")}
              >
                <User className="mr-3 h-5 w-5" /> My Profile
              </Button>
            </Link>
            <Link to="/profile/my-enrolled-courses">
              <Button
                variant="ghost"
                className={getSidebarClass("/profile/my-enrolled-courses")}
              >
                <GraduationCap className="mr-3 h-5 w-5" /> Enrolled Courses
              </Button>
            </Link>
            <Link to="/profile/my-order-history">
              <Button
                variant="ghost"
                className={getSidebarClass("/profile/my-order-history")}
              >
                <ShoppingCart className="mr-3 h-5 w-5" /> Order History
              </Button>
            </Link>

            {/* --- MENTORING SESSION (ALL ROLES) --- */}
            {/* Langsung dirender tanpa cek kondisi role */}
            <Link to="/profile/my-mentoring-sessions">
              <Button
                variant="ghost"
                className={getSidebarClass("/profile/my-mentoring-sessions")}
              >
                <Presentation className="mr-3 h-5 w-5" /> Mentoring Sessions
              </Button>
            </Link>
            {/* ------------------------------------- */}

            <Link to="/profile/my-scholarship-applications">
              <Button
                variant="ghost"
                className={getSidebarClass("/profile/my-scholarship-applications")}
              >
                <GraduationCap className="mr-3 h-5 w-5" /> Scholarships
              </Button>
            </Link>

            <div className="my-2 h-px w-full bg-neutral-100" />
            <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2 mt-2">
              Account
            </h2>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-base font-light text-red-500 hover:bg-red-50 hover:text-red-600 h-10 px-4"
            >
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