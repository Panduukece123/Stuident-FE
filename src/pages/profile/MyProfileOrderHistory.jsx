import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const MyProfileOrderHistory = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">Order History</h1>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <NavigationMenu>
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem className="px-4">
              Oktober
            </NavigationMenuItem>

            <NavigationMenuItem className="px-4">
              November
            </NavigationMenuItem>

            <NavigationMenuItem className="px-4">
              Desember
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Card className="w-full p-4 rounded-2xl shadow-md border flex flex-row gap-6">
          {/* Image */}
          <div className="w-1/3 flex items-center justify-center">
            <img
              src="https://placehold.co/300x200"
              alt="Course Thumbnail"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <CardContent className="w-2/3 flex flex-col gap-2 p-0">
            <h3 className="text-lg font-semibold">
              Name Course/Bootcamp/Mentoring
            </h3>

            <p className="text-sm">Price : Rp 100.000</p>
            <p className="text-sm">Method : QRIS</p>
            <p className="text-sm">Payment Date : 08-08-2028</p>
            <p className="text-sm">Duration : 6 months</p>
            <p className="text-sm font-medium">Status : Complete</p>
          </CardContent>
        </Card>
        <Card className="w-full p-4 rounded-2xl shadow-md border flex flex-row gap-6">
          {/* Image */}
          <div className="w-1/3 flex items-center justify-center">
            <img
              src="https://placehold.co/300x200"
              alt="Course Thumbnail"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <CardContent className="w-2/3 flex flex-col gap-2 p-0">
            <h3 className="text-lg font-semibold">
              Name Course/Bootcamp/Mentoring
            </h3>

            <p className="text-sm">Price : Rp 100.000</p>
            <p className="text-sm">Method : QRIS</p>
            <p className="text-sm">Payment Date : 08-08-2028</p>
            <p className="text-sm">Duration : 6 months</p>
            <p className="text-sm font-medium">Status : Complete</p>
          </CardContent>
        </Card>
        <Card className="w-full p-4 rounded-2xl shadow-md border flex flex-row gap-6">
          {/* Image */}
          <div className="w-1/3 flex items-center justify-center">
            <img
              src="https://placehold.co/300x200"
              alt="Course Thumbnail"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <CardContent className="w-2/3 flex flex-col gap-2 p-0">
            <h3 className="text-lg font-semibold">
              Name Course/Bootcamp/Mentoring
            </h3>

            <p className="text-sm">Price : Rp 100.000</p>
            <p className="text-sm">Method : QRIS</p>
            <p className="text-sm">Payment Date : 08-08-2028</p>
            <p className="text-sm">Duration : 6 months</p>
            <p className="text-sm font-medium">Status : Complete</p>
          </CardContent>
        </Card>
        <Card className="w-full p-4 rounded-2xl shadow-md border flex flex-row gap-6">
          {/* Image */}
          <div className="w-1/3 flex items-center justify-center">
            <img
              src="https://placehold.co/300x200"
              alt="Course Thumbnail"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <CardContent className="w-2/3 flex flex-col gap-2 p-0">
            <h3 className="text-lg font-semibold">
              Name Course/Bootcamp/Mentoring
            </h3>

            <p className="text-sm">Price : Rp 100.000</p>
            <p className="text-sm">Method : QRIS</p>
            <p className="text-sm">Payment Date : 08-08-2028</p>
            <p className="text-sm">Duration : 6 months</p>
            <p className="text-sm font-medium">Status : Complete</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
