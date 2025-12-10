import * as React from "react";
import { Header } from "@/components/section/HeaderSection";
import { Infografis } from "@/components/section/InfografisSection";
import { Highlight } from "@/components/section/HighlightSection";
import { Trainer } from "@/components/section/TrainerSection";
import { Partner } from "@/components/section/PartnerSection";
import { Faq } from "@/components/section/FaqSection";
import { LandingBanner } from "@/components/section/LandingBanner";

export function HomePage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <LandingBanner />
      <Header/>
      <Infografis />
      <Highlight />
      <Trainer />
      <Partner />
      <Faq />
    </div>
  );
}
