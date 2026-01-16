
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { GreenSquares } from "./Squares";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

/**
 * HeroSection (responsive)
 * - Ensures decorative GreenSquares never overflow next sections by growing the section
 *   to include any part of the squares that sit below the section bottom.
 * - Adds a spacer div to keep normal flow safe.
 */

export const HeroSection = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const greenWrapRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // minHeight applied to section (px)
  const [sectionMinHeight, setSectionMinHeight] = useState<number | undefined>(
    undefined
  );
  // extra spacing required to contain decorations that overflow bottom of section
  const [bottomExtra, setBottomExtra] = useState<number>(0);
  // Track if mobile to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Set mobile state on client side only
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Initial check
    if (!sectionRef.current || !greenWrapRef.current) return;

    const measure = () => {
      // Guard clause for async execution (e.g. ResizeObserver callback)
      const sectionEl = sectionRef.current;
      const greenRoot = greenWrapRef.current;

      if (!sectionEl || !greenRoot) return;

      const sectionRect = sectionEl.getBoundingClientRect();

      // baseline (bumped up)
      const baseline = isMobile ? 460 : 640;

      // find furthest bottom of children inside greenRoot (most accurate)
      // selector expanded to include common element types (div, span, svg)
      const nodes = Array.from(
        greenRoot.querySelectorAll("div, span, svg")
      ) as Element[];
      let furthestBottom = -Infinity;
      if (nodes.length) {
        for (const n of nodes) {
          const r = n.getBoundingClientRect();
          if (r.bottom > furthestBottom) furthestBottom = r.bottom;
        }
      } else {
        // fallback
        furthestBottom = greenRoot.getBoundingClientRect().bottom;
      }

      // safety buffer for blur/transform / visual viewport quirks
      const buffer = isMobile ? 36 : 56;

      // compute how much the decorations extend *below* the current section bottom
      const overflowBelow = Math.max(
        0,
        furthestBottom - sectionRect.bottom + buffer
      );

      // required height: either baseline OR current section height plus overflow
      const required = Math.max(baseline, sectionRect.height + overflowBelow);

      // write results
      setBottomExtra(Math.ceil(overflowBelow));
      setSectionMinHeight(Math.ceil(required));
    };

    measure();

    const ro = new ResizeObserver(() => {
      // collapse bursts
      requestAnimationFrame(measure);
    });
    
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (greenWrapRef.current) ro.observe(greenWrapRef.current);
    
    // also observe children of greenWrap in case they animate / change layout
    const childObserver = new MutationObserver(() => {
      requestAnimationFrame(measure);
    });
    
    if (greenWrapRef.current) {
        childObserver.observe(greenWrapRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        });
    }

    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    if ((window as any).visualViewport) {
      (window as any).visualViewport.addEventListener("resize", measure);
    }

    return () => {
      ro.disconnect();
      childObserver.disconnect();
      window.removeEventListener("resize", onResize);
      if ((window as any).visualViewport) {
        (window as any).visualViewport.removeEventListener("resize", measure);
      }
    };
  }, [isMobile]);

  const vector3 = (
    <svg
      width="316"
      height="103"
      viewBox="0 0 316 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[115%] h-auto pointer-events-none select-none -z-20 max-w-none"
    >
      <path
        opacity="0.5"
        d="M12.2285 70.6489L243.619 12.3566C245.979 11.7621 247.153 15.1011 244.94 16.1144L91.3299 86.4617C89.1577 87.4564 90.243 90.7342 92.5796 90.2361L303.229 45.328"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCalculator = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Transform ideas into reality"
      className="relative w-full md:min-h-[80vh] lg:min-h-[85vh] bg-[#2a2a2a] p-4 sm:p-6 md:p-10 lg:p-12 overflow-hidden flex flex-col"
      style={
        sectionMinHeight ? { minHeight: sectionMinHeight } : { minHeight: 640 }
      }
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      {/* Green squares (absolute container) */}
      <div
        ref={greenWrapRef}
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <GreenSquares />
      </div>

      {/* Centering wrapper - z-10 ensures it sits between the 'behind' squares (z-1) and 'above' squares (z-20) */}
      <div className="relative z-10 w-full flex-grow flex flex-col">
        {/* Card */}
        <div
          ref={cardRef}
          className={`
            relative w-full flex-grow rounded-2xl text-center
            bg-[rgba(16,16,16,0.40)] backdrop-blur-[4px]
            flex flex-col items-center justify-center
            px-4 sm:px-10 md:px-12 py-12 sm:py-20 lg:py-[200px]
            min-h-[420px] md:min-h-[520px]
          `}
          style={{
            backgroundColor: "rgba(26,26,26,0.6)",
            zIndex: 20, // Local z-index, but contained in parent's z-10 context relative to siblings.
          }}
        >
          {/* subtle border highlight */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              zIndex: 21,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 20,
                outline: "1px solid rgba(0,248,118,0.06)",
                mixBlendMode: "screen" as const,
                filter: "blur(0.6px)",
                opacity: 0.95,
              }}
            />
          </div>

          {/* Card content */}
          <div className="flex flex-col justify-center items-center gap-2 md:gap-4 relative z-40">
            {" "}
            <h1
              className="font-righteous font-normal text-[36px] sm:text-[50px] md:text-[64px] lg:text-[80px] leading-[1.1] tracking-[0.8px] mx-auto w-full text-white"
            >
              <div className="hidden md:flex flex-col items-center">
                <span>Transform</span>
                <div className="flex flex-row justify-center items-center mt-2">
                  <span>
                    Ideas into
                    <span
                      className="text-[#00f866] ml-3 inline-block relative whitespace-nowrap"
                    >
                      Reality
                      {vector3}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center md:hidden gap-1">
                <span className="block">Transform</span>
                <span className="block">Ideas into </span>
                <span className="inline-block text-[#00f866] relative whitespace-nowrap mt-1">
                  Reality
                  {vector3}
                </span>
              </div>
            </h1>
            <p
              className="font-poppins font-medium text-[#d5d5d5] max-w-2xl leading-[1.4] text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] mt-4 px-2"
            >
              Enterprise-grade development and services tailored to your
              business needs
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-10 relative z-50 w-full sm:w-auto px-4">
            <Button
              onClick={scrollToCalculator}
              className="group relative h-14 px-8 w-full sm:w-auto rounded-xl bg-white text-black font-righteous text-lg overflow-hidden border border-white transition-transform duration-300 hover:scale-105 z-50"
            >
               <div className="absolute inset-0 bg-[#00f866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
               <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
                 Get Started
                 <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
               </span>
            </Button>

            <Button
              onClick={scrollToContact}
              className="group relative h-14 px-8 w-full sm:w-auto rounded-xl bg-transparent border border-white/20 text-white font-righteous text-lg overflow-hidden transition-all duration-300 hover:border-white/50 z-50"
            >
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
               <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
                <PlayCircle className="w-5 h-5" />
                Have A Quick Demo
               </span>
            </Button>
          </div>

        </div>
      </div>

      {/* invisible spacer to guarantee flow — when decorations overflow below section bottom we
          insert this height so following content is pushed down in normal document flow */}
      <div
        aria-hidden
        style={{
          width: "1px",
          height: bottomExtra,
          minHeight: bottomExtra,
          pointerEvents: "none",
          opacity: 0,
        }}
      />
    </motion.section>
  );
};
