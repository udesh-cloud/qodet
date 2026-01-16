
import React from "react";
import { Navbar } from "../../components/Navbar";
import { DetailedCalculator } from "../../components/DetailedCalculator";
import { FooterSection } from "../../components/FooterSection";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen w-full bg-[#1f1f1f] pt-[75px]">
      <Navbar />
      <DetailedCalculator />
      <FooterSection />
    </main>
  );
}
