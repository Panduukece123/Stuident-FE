import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useQueryClient } from "@tanstack/react-query"; 
import {
  LayoutDashboard,
  Users,
  Settings,
  BookOpen,
  LogOut,
  Package2,
  GraduationCap,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../../../assets/images/stuident-logo.svg";
import authService from "@/services/AuthService";

export const AdminSidebar = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const queryClient = useQueryClient(); 

  const menus = [
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Scholarships", href: "/admin/scholarships", icon: GraduationCap },
    { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
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
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <img src={Logo} alt="Stuident" width={32} height={32} />
          <span className="">Stuident Admin</span>
        </Link>
      </div>

      {/* Menu Area */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium lg:px-6 gap-1">
          {menus.map((menu, index) => {
            const isActive = location.pathname.startsWith(menu.href);
            return (
              <Link
                key={index}
                to={menu.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isActive
                    ? "bg-primary/10 text-primary"
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