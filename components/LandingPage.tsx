"use client";
import React from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { CustomSolutionsSection } from "./CustomSolutionsSection";
import { WhyChooseQodetSection } from "./WhyChooseQodetSection";
import { SuccessStoriesSection } from "./SuccessStoriesSection";
import { FaqSection } from "./FaqSection";
import { CalculatorSection } from "./CalculatorSection";
import { FooterSection } from "./FooterSection";
import { ContactUsSection } from "./ContactUsSection";

export const LandingPage = () => {
  return (
    <main className="min-h-screen w-full bg-[#1f1f1f] pt-[75px]">
      <Navbar />
      <HeroSection />

      {/* Gap between Hero and Services */}
      <div className="w-full bg-[#1f1f1f] h-16 md:h-24" />

      <CustomSolutionsSection />
      <WhyChooseQodetSection />
      <SuccessStoriesSection />
      <FaqSection />
      <CalculatorSection />
      <ContactUsSection />
      <FooterSection />
    </main>
  );
};
