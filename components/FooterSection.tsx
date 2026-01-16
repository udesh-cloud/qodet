
"use client";
import React from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { QodetLogo } from "./ui/QodetLogo";

export const FooterSection = (): React.JSX.Element => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Library", href: "/library" },
    { label: "Calculator", href: "/calculator" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/#contact" },
  ];

  return (
    <footer className="w-full flex flex-col md:flex-row min-h-[500px]">
      {/* Left Section: Green Background */}
      <div className="w-full md:w-3/5 bg-[#00885A] px-6 py-12 md:px-16 md:py-16 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
             {/* Small Logo for Header Context if needed, but text is fine */}
             <h2 className="font-righteous text-[#00F866] text-5xl md:text-7xl tracking-wider">
               QODET
             </h2>
          </div>
          <p className="font-poppins text-white text-lg md:text-xl font-medium max-w-xl leading-relaxed">
            Upfront pricing with a clear estimation calculator. Fixed costs, accurate timelines, and no hidden surprises.
          </p>
        </div>
        
        <div className="mt-12 md:mt-0">
          <ul className="flex flex-wrap gap-6 md:gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href}
                  className="font-poppins text-white text-base md:text-lg hover:text-[#00F866] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Section: Dark Background with Q Graphic */}
      <div className="w-full md:w-2/5 bg-[#1F1F1F] flex items-center justify-center py-16 md:py-0 relative overflow-hidden">
        {/* Subtle blur effect behind the Q */}
        <div className="absolute w-[200px] h-[200px] bg-[#00F866] opacity-10 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 p-8 flex justify-center w-full cursor-pointer">
            <QodetLogo 
              className="w-auto h-[200px] md:h-[250px] lg:h-[350px] xl:h-[440px] max-w-full" 
              isHoverable={true} 
            />
        </div>
      </div>
    </footer>
  );
};
