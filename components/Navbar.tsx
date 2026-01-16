"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useNavbar } from "../contexts/NavbarContext";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { QodetLogo } from "./ui/QodetLogo";

const links = [
  { label: "Products", href: "/products" },
  { label: "Calculator", href: "/calculator" },
  { label: "Library", href: "/library" },
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const Navbar = () => {
  const { show, isMenuOpen, setIsMenuOpen } = useNavbar();
  const [pathname, setPathname] = useState("/");
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  // Ensure navbar stays visible if menu is open, regardless of scroll
  const isNavbarVisible = show || isMenuOpen;

  return (
    <motion.nav
      initial={{ y: -75 }}
      animate={{ y: isNavbarVisible ? 0 : -75 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 h-[75px] border-b border-[#3a3a3a] ${
        isMenuOpen ? "bg-[#1f1f1f]" : "bg-[#2a2a2a]/95 backdrop-blur-md"
      } text-white shadow-sm`}
    >
      <div className="h-full px-4 lg:px-10 flex items-center justify-between relative max-w-[1920px] mx-auto">
        {/* --- Left Links (Desktop) --- */}
        <div className="hidden lg:flex items-center gap-6 text-[16px] lg:text-[18px] font-medium font-poppins lg:gap-10 w-1/3">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`relative hover:text-[#00f866] transition-colors duration-300 ${
                pathname === href ? "text-white" : "text-gray-400"
              }`}
            >
              {label}
              {pathname === href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-[26px] left-0 right-0 h-[2px] bg-[#00f866]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* --- Center Logo Area --- */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-20 w-1/3">
          <Link
            href="/"
            className="group inline-flex justify-center"
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            {/* Logo Container */}
            <div
              className={`
                px-5 pt-3 pb-4 rounded-b-2xl border-b border-x 
                transition-all duration-300 shadow-lg
                ${
                  isLogoHovered
                    ? "bg-[#00885A] border-[#00F866]/30 shadow-[0_4px_30px_rgba(0,248,102,0.3)]"
                    : "bg-[#00F866] border-black/10 shadow-[0_4px_20px_rgba(0,248,102,0.15)]"
                }
            `}
            >
              <div className="flex items-center gap-3">
                <QodetLogo
                  className="h-8 md:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
                  isHoverable={true}
                  // Default: Dark logo on Light Green. Hover: Light logo on Dark Green.
                  primaryColor={isLogoHovered ? "#00F866" : "#000000"}
                  secondaryColor={isLogoHovered ? "#003d29" : "#1a1a1a"}
                />
                <span
                  className={`
                    font-righteous text-xl tracking-[0.15em] transition-colors duration-300
                    ${isLogoHovered ? "text-[#00F866]" : "text-black"}
                  `}
                >
                  QODET
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* --- Right Links (Desktop) --- */}
        <div className="hidden lg:flex items-center justify-end gap-4 font-poppins text-[16px] lg:text-[18px] lg:gap-8 w-1/3">
          <Link
            href="/about"
            className={`hover:text-[#00f866] transition-colors duration-300 ${
              pathname === "/about" ? "text-white" : "text-gray-400"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            className="bg-white hover:bg-[#00f866] transition-colors duration-300 text-black font-semibold px-5 py-2.5 rounded-lg text-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* --- Mobile/Tablet Menu Toggle --- */}
        <div className="lg:hidden ml-auto z-50">
          <button
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-[#00f866] transition-colors p-2 active:scale-95"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* --- Mobile/Tablet Menu Overlay --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-[#1f1f1f]/98 backdrop-blur-xl border-t border-[#3a3a3a] flex flex-col lg:hidden overflow-hidden z-40"
            >
              {/* Decorative Background Blur */}
              <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#00F866]/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-[10%] left-[-10%] w-[250px] h-[250px] bg-[#00885A]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="w-full flex flex-col pt-4 px-6 pb-20 overflow-y-auto h-full relative z-10">
                {/* Main Links */}
                <div className="flex flex-col gap-2 mb-6">
                  {links.map(({ label, href }) => (
                    <motion.div
                      key={href}
                      variants={itemVariants}
                      className="w-full"
                    >
                      <Link
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`
                            flex items-center justify-between w-full py-4 px-2 border-b border-white/5 
                            text-lg font-medium transition-all duration-200 group
                            ${
                              pathname === href
                                ? "text-[#00f866]"
                                : "text-white/80 hover:text-white"
                            }
                          `}
                      >
                        {label}
                        <ChevronRight
                          size={18}
                          className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${
                            pathname === href
                              ? "opacity-100 translate-x-0 text-[#00F866]"
                              : "text-white/40"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div variants={itemVariants} className="w-full">
                    <Link
                      href="/about"
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                          flex items-center justify-between w-full py-4 px-2 border-b border-white/5 
                          text-lg font-medium transition-all duration-200 group
                          ${
                            pathname === "/about"
                              ? "text-[#00f866]"
                              : "text-white/80 hover:text-white"
                          }
                        `}
                    >
                      About Us
                      <ChevronRight
                        size={18}
                        className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${
                          pathname === "/about"
                            ? "opacity-100 translate-x-0 text-[#00F866]"
                            : "text-white/40"
                        }`}
                      />
                    </Link>
                  </motion.div>
                </div>

                {/* Auth & CTA */}
                <div className="mt-auto flex flex-col gap-4 pb-8">
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/#contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-full py-4 rounded-xl bg-[#00F866] text-black font-bold hover:bg-[#00F866]/90 transition-colors shadow-lg shadow-[#00F866]/10"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
