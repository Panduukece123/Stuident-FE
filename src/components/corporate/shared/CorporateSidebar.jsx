import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useQueryClient } from "@tanstack/react-query"; 
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Building2,
  LogOut,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/images/stuident-logo.svg"; // Sesuaikan path logo kamu
import authService from "@/services/AuthService";

export const CorporateSidebar = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const queryClient = useQueryClient(); 

  // MENU KHUSUS CORPORATE
  const menus = [
    { name: "Kelola Beasiswa", href: "/corporate/scholarships", icon: GraduationCap },
    { name: "Kelola Artikel", href: "/corporate/articles", icon: FileText },
    { name: "Profil Perusahaan", href: "/corporate/profile", icon: Building2 },
  ];

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

  return (
    <div className={`flex h-full flex-col gap-2 ${className}`}>
      {/* Logo Area */}
      <div className="flex h-14 items-center border-b px-6 lg:h-[60px]">
        <Link to="/corporate/dashboard" className="flex items-center gap-2 font-semibold">
          <img src={Logo} alt="Stuident" width={32} height={32} />
          <span className="">Stuident Corporate</span>
        </Link>
      </div>

      {/* Menu Area */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium lg:px-6 gap-1">
          {menus.map((menu, index) => {
            // Logic active state: kalau URL diawali href menu tersebut
            const isActive = location.pathname.startsWith(menu.href);
            return (
              <Link
                key={index}
                to={menu.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <menu.icon className="h-4 w-4" />
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area (Logout) */}
      <div className="mt-auto p-4">
        <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
};