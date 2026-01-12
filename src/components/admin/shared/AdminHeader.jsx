import React from "react";
import { Menu, Search, LogOut, Settings, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { useQuery, useQueryClient } from "@tanstack/react-query"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { Skeleton } from "@/components/ui/skeleton";
import { AdminSidebar } from "./AdminSidebar";
import ProfileService from "@/services/ProfileService";
import authService from "@/services/AuthService";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const token = localStorage.getItem("token");

  const queryClient = useQueryClient();

  // --- FETCH DATA USER ---
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile", token], 
    queryFn: async () => {
      const result = await ProfileService.getProfile();
      return result.data || result;
    },
    staleTime: 1000 * 60 * 5, 
  });

  const user = profileData?.user || {};

  const handleLogout = async () => {
    try {
      await authService.logout(); 
      console.log("Logout backend success");
    } catch (error) {
      console.warn("Logout backend failed (token might be expired):", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      queryClient.removeQueries({ queryKey: ["profile"] });

      navigate("/login");
    }
  };

  // --- 3. LOGIC MENENTUKAN JUDUL ---
  const getPageTitle = () => {
    const path = location.pathname;

    // Cek path dan kembalikan judul yang sesuai
    if (path.includes("/admin/users")) return "User Management";
    if (path.includes("/admin/courses")) return "Courses";
    if (path.includes("/admin/scholarships")) return "Scholarships";
    if (path.includes("/admin/organizations")) return "Organizations";
    if (path.includes("/admin/articles")) return "Articles";
    if (path.includes("/admin/transactions")) return "Transactions";
    
    return "Admin Panel"; // Default title
  };

  return (
    <header className="flex h-14 items-center justify-between gap-20 border-b bg-white px-4 lg:h-15 lg:px-6 sticky top-0 z-30 shadow-sm">
      
      {/* MOBILE TRIGGER */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 w-60">
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* --- 4. TAMPILKAN JUDUL DINAMIS DI SINI --- */}
      <h1 className="font-semibold text-xl md:text-2xl text-neutral-800 whitespace-nowrap">
        {getPageTitle()}
      </h1>

      {/* USER DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-auto rounded-lg px-3 hover:bg-neutral-100 transition-colors">
            {isLoading ? (
              <div className="flex items-center gap-2">
                 <Skeleton className="h-8 w-8 rounded" />
                 <Skeleton className="h-4 w-20 hidden md:block" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage
                    src={user.avatar || user.profile_photo}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-neutral-700 hidden md:block">
                    {user.name}
                </span>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/profile/my-profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};