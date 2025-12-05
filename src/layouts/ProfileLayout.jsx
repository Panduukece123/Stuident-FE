import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Edit,
  GraduationCap,
  LogOut,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import React from "react";
import { Outlet } from "react-router";

export const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen flex-col gap-6 bg-neutral-50 p-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col justify-between overflow-hidden rounded-xl bg-linear-to-r from-[#074799] to-[#3DBDC2] p-8 text-white shadow-md md:flex-row md:items-center">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Avatar className="h-32 w-32 border-4 border-white/30 shadow-sm">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="h-full w-full object-cover"
            />
            <AvatarFallback>BA</AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">
              Bima Adnandita
            </h1>
            <p>bima.adnandita@gmail.com</p>
            <p>+62 812 1234 5678</p>
            <div className="mt-2 flex items-center justify-center gap-3 md:justify-start">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                Free Tier
              </span>
              <span className="text-sm text-blue-100">
                Joined since January 2023
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <Button
            variant="outline"
            className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#074799] backdrop-blur-sm transition-all"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Avatar
          </Button>
        </div>
      </div>

      {/* --- CONTENT & SIDEBAR --- */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* SIDEBAR */}
        <aside className="w-full shrink-0 md:w-64">
          <div className="sticky top-20 flex flex-col gap-2 rounded-xl border border-neutral-300 bg-white p-4">
            {/* Bagian Menu */}
            <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Menu
            </h2>

            <Button
              variant="ghost"
              className="w-full justify-start text-base font-light text-neutral-700 h-10 px-4"
            >
              <User className="mr-3 h-5 w-5" />
              My Profile
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base font-light text-neutral-700 h-10 px-4"
            >
              <GraduationCap className="mr-3 h-5 w-5" />
              Enrolled Courses
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base font-light text-neutral-700 h-10 px-4"
            >
              <ShoppingCart className="mr-3 h-5 w-5" />
              Order History
            </Button>

            <div className="my-2 h-px w-full bg-neutral-100" />

            {/* Bagian Account */}
            <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Account
            </h2>

            <Button
              variant="ghost"
              className="w-full justify-start text-base font-light text-neutral-700 h-10 px-4"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base font-light text-red-500 hover:bg-red-50 hover:text-red-600 h-10 px-4"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </aside>
        <main className="w-full">
            <Outlet />
        </main>
      </div>
    </div>
  );
};
