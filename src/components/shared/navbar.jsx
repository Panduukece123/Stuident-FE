import React from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react"; // Ikon Hamburger
import { Search } from "lucide-react"; // Ikon Search
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

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 gap-4">
        {/* --- 1. LOGO (KIRI) --- */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Stuident" width={36} height={36} />
          <div className="leading-tight">
            <p className="text-xl text-foreground">Stuident</p>
          </div>
        </div>

        {/* --- SEARCH BAR (TENGAH, HANYA DI DESKTOP) --- */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari program, mentor..."
            className="w-full pl-9 pr-3 py-2 rounded-md border bg-background focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* --- 2. DESKTOP NAVIGATION (TENGAH) --- */}
        {/* Bagian ini saya kembalikan PERSIS seperti kode asli Anda */}
        <div className="hidden md:flex md:flex-1 md:justify-start">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="justify-start gap-1 text-sm font-medium text-muted-foreground">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-[active=true]:bg-accent/60"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Dropdown E-Learning (Punya Anda) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="group cursor-pointer bg-transparent hover:text-primary hover:bg-accent/60 data-[state=open]:bg-accent/60! data-[state=open]:text-primary">
                  E-Learning
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* Layout Grid Asli Anda */}
                  <ul className="grid gap-2 w-56 lg:grid-rows-[.75fr_1fr]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="#"
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
                          to="#"
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
                  href="#"
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-[active=true]:bg-accent/60"
                >
                  Scholarship
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Dropdown My Mentor (Punya Anda) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer bg-transparent hover:text-primary hover:bg-accent/60 data-[state=open]:text-primary data-[state=open]:bg-accent/60!">
                  My Mentor
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* Layout Grid Asli Anda */}
                  <ul className="grid gap-2 w-56 lg:grid-rows-[.75fr_1fr]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="#"
                          className="block rounded-md px-3 py-2 transition hover:bg-accent/50"
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

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-[active=true]:bg-accent/60 whitespace-nowrap"
                >
                  Corporate Service
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className="rounded-md px-3 py-2 transition hover:text-primary hover:bg-accent/60 data-[active=true]:bg-accent/60"
                >
                  Article
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            <Button variant="outline" size="sm" className="cursor-pointer ">
              Login
            </Button>
          </Link>
          <Button
            size="sm"
            className="cursor-pointer"
          >
            Register
          </Button>
        </div>

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

            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-3">
                <Link
                  to="#"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>

                {/* Accordion khusus HP */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="elearning" className="border-b-0">
                    <AccordionTrigger className="cursor-pointer text-sm hover:no-underline hover:text-primary font-medium">
                      E-Learning
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-2 pl-4 border-l ml-2">
                      <Link
                        to="#"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        Course
                      </Link>
                      <Link
                        to="#"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        Bootcamp
                      </Link>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mentor" className="border-b-0">
                    <AccordionTrigger className="cursor-pointer text-sm hover:no-underline hover:text-primary font-medium">
                      My Mentor
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-2 pl-4 border-l ml-2">
                      <Link
                        to="#"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        Life Plan Mentoring
                      </Link>
                      <Link
                        to="#"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        Academic Mentoring
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link
                  to="#"
                  className="pb-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  Scholarship
                </Link>
                <Link
                  to="#"
                  className="pb-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  Corporate Service
                </Link>
                <Link
                  to="#"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Article
                </Link>
              </div>

              <div className="mt-3 flex flex-col gap-3">
                <Button className="w-full" size="sm">
                  Register
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Login
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
