import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";

export const LearnLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
