import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // 1. Tambah useLocation
import { Menu, Search } from "lucide-react";
import Logo from "../../assets/images/stuident-logo.svg";

// Import Components
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Navbar = () => {
  // 2. Ambil lokasi URL saat ini
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const user = JSON.parse(localStorage.getItem("user"));

  // Helper function buat Mobile Menu (biar kodingan rapi)
  const getMobileLinkClass = (path) => {
    return pathname === path
      ? "text-sm font-bold text-primary transition-colors" // Style Active
      : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors"; // Style Default
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 gap-4">
        {/* --- 1. LOGO --- */}
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="Stuident" width={36} height={36} />
          <div className="leading-tight">
            <p className="text-xl text-foreground">Stuident</p>
          </div>
        </Link>

        {/* --- SEARCH BAR --- */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari program, mentor..."
            className="w-full pl-9 pr-3 py-2 rounded-md border bg-background focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* --- 2. DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex md:flex-1 md:justify-start">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="justify-start gap-1 text-sm font-medium text-muted-foreground">
              {/* HOME LINK */}
              <NavigationMenuItem>
                {/* Gunakan asChild agar bisa pakai Link router */}
                <NavigationMenuLink
                  asChild
                  active={pathname === "/"} // 3. Logic Active Desktop
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-active:text-primary focus:bg-transparent cursor-pointer"
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* E-LEARNING */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  // Kalau diklik Trigger-nya, dia ke paling atas halaman E-Learning
                  onClick={() => navigate("/e-learning")}
                  className={`group cursor-pointer bg-transparent hover:text-primary hover:bg-accent/60 data-[state=open]:bg-accent/60! data-[state=open]:text-primary ${
                    pathname === "/e-learning" ? "text-primary" : ""
                  }`}
                >
                  E-Learning
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 w-56 lg:grid-rows-[.75fr_1fr]">
                    <li>
                      <NavigationMenuLink asChild>
                        {/* PERUBAHAN DISINI: Tambah #course */}
                        <Link
                          to="/e-learning#course"
                          className="block rounded-md px-3 py-2 transition hover:bg-accent/50"
                        >
                          <div className="font-medium text-foreground">
                            Course
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Belajar bareng mitra terbaik
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        {/* PERUBAHAN DISINI: Tambah #bootcamp */}
                        <Link
                          to="/e-learning#bootcamp"
                          className="block rounded-md px-3 py-2 transition hover:bg-accent/50"
                        >
                          <div className="font-medium text-foreground">
                            Bootcamp
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Program intensif siap kerja
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* SCHOLARSHIP */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={pathname === "/scholarship"}
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-active:text-primary cursor-pointer"
                >
                  <Link to="/scholarship">Scholarship</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* MY MENTOR */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer bg-transparent hover:text-primary hover:bg-accent/60 data-[state=open]:text-primary data-[state=open]:bg-accent/60!">
                  My Mentor
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 w-56 lg:grid-rows-[.75fr_1fr]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/life-plan"
                          className={`block rounded-md px-3 py-2 transition hover:bg-accent/50 ${
                            pathname === "/life-plan"
                              ? "bg-accent/50 text-primary"
                              : ""
                          }`}
                        >
                          <div className="font-medium text-foreground">
                            Life Plan Mentoring
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Mentoring rencana hidup
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="#"
                          className="block rounded-md px-3 py-2 transition hover:bg-accent/50"
                        >
                          <div className="font-medium text-foreground">
                            Academic Mentoring
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Bimbingan akademik
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* CORPORATE */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={pathname === "/corporate"}
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-active:text-primary whitespace-nowrap cursor-pointer"
                >
                  <Link to="/corporate">Corporate Service</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* ARTICLE */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={pathname === "/article"}
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-active:text-primary cursor-pointer"
                >
                  <Link to="/article">Article</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {user ? (
          // Jika user sudah login
          <div className="hidden items-center gap-2 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative bg-primary hover:bg-primary/50 flex flex-row gap-2 focus-visible:ring-0 cursor-pointer"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-white">{user.name}</h1>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={"cursor-pointer"}>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className={"cursor-pointer"}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          // Jika user belum login
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/login">
              <Button variant={"outline"} size="sm" className="cursor-pointer">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="cursor-pointer">
                Register
              </Button>
            </Link>
          </div>
        )}
        {/* --- MOBILE SHEET --- */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-3">
            <SheetHeader>
              <div className="flex items-center gap-2">
                <img src={Logo} alt="Stuident" width={32} height={32} />
                <SheetTitle className="text-left">Stuident</SheetTitle>
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col space-y-3">
                {/* 4. Logic Active Mobile */}
                <Link to="/" className={getMobileLinkClass("/")}>
                  Home
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="elearning" className="border-b-0">
                    <AccordionTrigger
                      className={`cursor-pointer text-sm hover:no-underline hover:text-primary ${
                        pathname.includes("course")
                          ? "text-primary font-bold"
                          : "font-medium"
                      }`}
                    >
                      E-Learning
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-2 pl-4 border-l ml-2">
                      <Link
                        to="/course"
                        className={getMobileLinkClass("/course")}
                      >
                        Course
                      </Link>
                      <Link
                        to="/bootcamp"
                        className={getMobileLinkClass("/bootcamp")}
                      >
                        Bootcamp
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                  {/* ... Accordion Mentor sama logikanya ... */}
                </Accordion>

                <Link
                  to="/scholarship"
                  className={getMobileLinkClass("/scholarship")}
                >
                  Scholarship
                </Link>
                <Link
                  to="/corporate"
                  className={getMobileLinkClass("/corporate")}
                >
                  Corporate Service
                </Link>
                <Link to="/article" className={getMobileLinkClass("/article")}>
                  Article
                </Link>
              </div>

              {user ? (
                // Jika user sudah login di mobile
                <div className="mt-3 flex flex-col gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="mt-3 flex flex-col gap-3">
                  <Link to="/register">
                    <Button className="w-full" size="sm">
                      Register
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="w-full" size="sm">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};