"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

export const TransformIdeasSection = (): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#" },
    { label: "Customers", href: "#" },
    { label: "Integrations", href: "#" },
  ];

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2A2A2A] border-b border-[#3a3a3a] shadow-lg font-poppins">
      <nav className="flex h-[75px] items-center justify-between px-6 md:px-10 max-w-[1440px] mx-auto">
        {/* Mobile Menu Toggle & Brand Section */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden text-white hover:text-[#4ade80] transition-colors focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              className="md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors text-base font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Brand - Centered on mobile/tablet if needed, or structured between */}
        <div className="flex-1 flex justify-center lg:justify-start lg:flex-none lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <a href="#" className="font-bold text-white text-xl tracking-wider">
            ACME
          </a>
        </div>

        {/* Right Section: Auth Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden lg:block text-white/80 hover:text-white font-medium transition-colors"
          >
            Login
          </a>
          <a
            href="#"
            className="px-5 py-2.5 rounded-lg bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20 hover:bg-[#4ade80]/20 font-semibold transition-all text-sm"
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "absolute left-0 w-full bg-[#2A2A2A] border-b border-[#3a3a3a] shadow-xl overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col px-6 py-4 gap-2">
          {/* Main Nav Links (Mobile) */}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-3 text-white/90 hover:text-white text-lg font-medium border-b border-[#3a3a3a]"
            >
              {link.label}
            </a>
          ))}

          <div className="h-2"></div>

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <a
              key={`${item}-${index}`}
              href="#"
              className={cn(
                "py-2 text-base transition-colors",
                index === 2
                  ? "text-[#4ade80]" // Activity - Primary color match
                  : index === menuItems.length - 1
                  ? "text-red-400" // Log Out - Destructive
                  : "text-white/80 hover:text-white"
              )}
            >
              {item}
            </a>
          ))}

          <div className="h-px bg-[#3a3a3a] my-3" />

          <a href="#" className="py-2 text-white/90 font-medium block">
            Login
          </a>
        </div>
      </div>
    </header>
  );
};
