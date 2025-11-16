import * as React from "react";
import { Header } from "@/components/shared/header";
import { Infografis } from "@/components/shared/infografis";
import { Highlight } from "@/components/shared/highlight";
import { Trainer } from "@/components/shared/trainer";
import { Partner } from "@/components/shared/partner";
import { Faq } from "@/components/shared/faq";

export function HomePage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Header />
      <Infografis />
      
      <Highlight />
      <Trainer />
      <Partner />
      <Faq/>
    </div>
  );
}
