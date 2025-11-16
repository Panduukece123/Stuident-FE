import React from "react";
import { Link } from "react-router";
import Logo from "../../assets/images/stuident-logo.svg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex w-full items-center gap-6 px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Stuident" width={44} height={44} />
          <div className="leading-tight">
            <p className="text-2xl text-foreground">Stuident</p>
          </div>
        </div>

        <NavigationMenu
          viewport={false}
          className="w-full justify-start md:w-auto md:flex-1 lg:flex-none"
        >
          <NavigationMenuList className="justify-start gap-1 text-sm font-medium text-muted-foreground">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="rounded-md px-3 py-2 transition hover:text-foreground data-[active=true]:bg-accent/60"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger className={"cursor-pointer"}>
                E-Learning
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 w-56 lg:grid-rows-[.75fr_1fr]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="#"
                        className="block rounded-md px-3 py-2 transition hover:bg-accent/50"
                      >
                        <div className="font-medium">Course</div>
                        <div className="text-muted-foreground">
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
                        <div className="font-medium">Bootcamp</div>
                        <div className="text-muted-foreground">
                          Belajar bareng mitra terbaik
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
                className="rounded-md px-3 py-2 transition hover:text-foreground data-[active=true]:bg-accent/60"
              >
                Scholarship
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger className={"cursor-pointer"}>
                My Mentor
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 w-56 lg:grid-rows-[.75fr_1fr]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="#"
                        className="block rounded-md px-3 py-2 transition hover:bg-accent/50"
                      >
                        <div className="font-medium">Life Plan Mentoring</div>
                        <div className="text-muted-foreground">
                          Mentoring bersama kita
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
                        <div className="font-medium">Academic Mentoring</div>
                        <div className="text-muted-foreground">
                          Mentoring bersama kita
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
                className="rounded-md px-3 py-2 transition hover:text-foreground data-[active=true]:bg-accent/60"
              >
                Community
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="rounded-md px-3 py-2 transition hover:text-foreground data-[active=true]:bg-accent/60"
              >
                Corporate Service
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="rounded-md px-3 py-2 transition hover:text-foreground data-[active=true]:bg-accent/60"
              >
                Article
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" className={"cursor-pointer"} size="sm">
            Login
          </Button>
          <Button size="sm" className={"cursor-pointer"}>
            Register
          </Button>
        </div>
      </div>
    </header>
  );
};
