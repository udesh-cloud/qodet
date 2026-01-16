
import React from "react";
import { Navbar } from "../../components/Navbar";
import { ProductShowcase } from "../../components/ProductShowcase";
import { FooterSection } from "../../components/FooterSection";

export default function ProductsPage() {
  return (
    <main className="min-h-screen w-full bg-[#1f1f1f] pt-[75px]">
      <Navbar />
      <ProductShowcase />
      <FooterSection />
    </main>
  );
}
