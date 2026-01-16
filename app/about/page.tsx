
import React from "react";
import { Navbar } from "../../components/Navbar";
import { AboutUsSection } from "../../components/AboutUsSection";
import { FooterSection } from "../../components/FooterSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[#1f1f1f] pt-[75px]">
      <Navbar />
      <AboutUsSection />
      <FooterSection />
    </main>
  );
}
