import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import Logo from "../../assets/images/stuident-logo.svg";
import ProfileService from "@/services/ProfileService";

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
import authService from "@/services/AuthService";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // 1. STATE USER (Ambil dari LocalStorage)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // State tambahan buat maksa refresh gambar di navbar
  const [imageHash, setImageHash] = useState(Date.now());

  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log("Logout backend success");
    } catch (error) {
      console.warn("Logout backend failed (token might be expired):", error);
    } finally {
      // 3. Bersihkan Local Storage & State (Apapun hasil API-nya)
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);

      // 4. Redirect ke Login
      navigate("/login");
    }
  };

  // 2. LISTENER UPDATE USER (Ini Kuncinya!)
  // Fungsi ini mendengarkan sinyal 'user-updated' dari ProfileLayout
  useEffect(() => {
    const syncUserFromStorage = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setImageHash(Date.now()); // Update hash biar gambar ke-refresh
      }
    };

    // Pasang telinga
    window.addEventListener("user-updated", syncUserFromStorage);

    // Copot telinga pas unmount (Cleanup)
    return () => {
      window.removeEventListener("user-updated", syncUserFromStorage);
    };
  }, []);

  // 3. CEK USER SAAT PINDAH HALAMAN (Backup Logic)
  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Cek kalau ada perbedaan data (misal nama berubah)
        if (JSON.stringify(user) !== JSON.stringify(parsedUser)) {
          setUser(parsedUser);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
  }, [location, user]);

  // 4. CEK TOKEN VALIDITY
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        await ProfileService.getMe();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };
    checkTokenValidity();
  }, []);

  // --- REFACTOR: PANGGIL SERVICE (Bersih & Rapi) ---
  const avatarSrc = user
    ? `${ProfileService.getAvatarUrl(user)}?t=${imageHash}`
    : "";

  const getMobileLinkClass = (path) => {
    return pathname === path
      ? "text-sm font-bold text-primary transition-colors"
      : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors";
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 gap-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="Stuident" width={36} height={36} />
          <div className="leading-tight">
            <p className="text-xl text-foreground">Stuident</p>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-full items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari program, mentor..."
            className="w-full pl-9 pr-3 py-2 rounded-md border bg-background focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex md:flex-1 md:justify-start">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="justify-start gap-1 text-sm font-medium text-muted-foreground">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={pathname === "/"}
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-active:text-primary focus:bg-transparent cursor-pointer focus:text-primary"
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => navigate("/e-learning")}
                  className={`group cursor-pointer bg-transparent hover:text-primary hover:bg-accent/60 data-[state=open]:bg-accent/60! focus:bg-transparent data-[state=open]:text-primary focus:text-primary ${
                    pathname === "/e-learning" ? "text-primary" : ""
                  }`}
                >
                  E-Learning
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 w-56 lg:grid-rows-[.75fr_1fr]">
                    <li>
                      <NavigationMenuLink asChild>
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

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={pathname === "/scholarship"}
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-active:text-primary cursor-pointer focus:text-primary focus:bg-transparent"
                >
                  <Link to="/scholarship">Scholarship</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="cursor-pointer bg-transparent hover:text-primary hover:bg-accent/60"
                  onClick={() => navigate("/my-mentor")}
                >
                  My Mentor

                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/my-mentor"
                      className={`block rounded-md px-3 py-2 transition hover:bg-accent/50 ${
                        pathname === "/my-mentor"
                          ? "bg-accent/50 text-primary"
                          : ""
                      }`}
                    >
                      <div className="font-medium">All Mentoring</div>
                      <div className="text-xs text-muted-foreground">
                        Life Plan & Academic Mentoring
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={pathname === "/our-services"}
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-active:text-primary whitespace-nowrap cursor-pointer focus:text-primary focus:bg-transparent"
                >
                  <Link to="/our-services">Corporate Service</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={pathname === "/article"}
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-active:text-primary cursor-pointer focus:text-primary focus:bg-transparent"
                >
                  <Link to="/article">Article</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* USER MENU */}
        {user ? (
          <div className="hidden items-center gap-2 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative bg-primary hover:bg-primary/50 flex flex-row gap-2 focus-visible:ring-0 cursor-pointer"
                >
                  {/* AVATAR DESKTOP */}
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={avatarSrc}
                      alt={user.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {/* Fallback Inisial Nama */}
                      {user.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()
                        : "US"}
                    </AvatarFallback>
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
                <DropdownMenuItem className={"cursor-pointer"} asChild>
                  <Link to="/profile/my-profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={"cursor-pointer text-red-500 focus:text-red-500"}
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
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

        {/* MOBILE SHEET */}
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

              {/* MOBILE USER MENU */}
              {user ? (
                <div className="mt-3 flex flex-col gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        {/* AVATAR MOBILE */}
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={avatarSrc}
                            alt={user.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {user.name
                              ? user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase()
                              : "US"}
                          </AvatarFallback>
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
                      <DropdownMenuItem asChild>
                        <Link to="/profile/my-profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-500 focus:text-red-500"
                      >
                        Log out
                      </DropdownMenuItem>
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
