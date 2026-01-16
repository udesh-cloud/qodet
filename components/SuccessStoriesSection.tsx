"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  BookCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

// Internal component for the masked image
const MaskedCardImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const measure = () => {
      // Async safety check
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(measure);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const { width, height } = dimensions;

  // Dynamic Path Generation
  const generatePath = (w: number, h: number) => {
    if (w === 0 || h === 0) return "";

    const r = 16; // Corner radius for the mask

    // Button Logic:
    // Button Size: 80px (w-20)
    // Gap: 0px (Flush)
    // Cutout Size = Button Size

    const buttonSize = 64;
    const gap = 8;
    const cw = buttonSize + gap;
    const ch = buttonSize + gap;

    // Protection against very small containers
    if (w < cw + r * 2 || h < ch + r * 2) {
      return `M0 ${r} Q0 0 ${r} 0 H${w - r} Q${w} 0 ${w} ${r} V${
        h - r
      } Q${w} ${h} ${w - r} ${h} H${r} Q0 ${h} 0 ${h - r} Z`;
    }

    // Path tracing the image shape (everything EXCEPT the bottom-right cutout)
    return `
      M0 ${r}
      Q0 0 ${r} 0
      H${w - r}
      Q${w} 0 ${w} ${r}
      V${h - ch - r}
      Q${w} ${h - ch} ${w - r} ${h - ch}
      H${w - cw + r}
      Q${w - cw} ${h - ch} ${w - cw} ${h - ch + r}
      V${h - r}
      Q${w - cw} ${h} ${w - cw - r} ${h}
      H${r}
      Q0 ${h} 0 ${h - r}
      V${r}
      Z
    `
      .replace(/\s+/g, " ")
      .trim();
  };

  const pathD = generatePath(width, height);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative group/image-container cursor-pointer"
    >
      {/* 
          CSS clip-path Implementation 
          The image div uses the path. 
          The image inside scales on hover.
       */}
      {width > 0 && height > 0 && (
        <div
          className="w-full h-full bg-[#2a2a2a] overflow-hidden"
          style={{
            clipPath: `path('${pathD}')`,
            WebkitClipPath: `path('${pathD}')`,
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/image-container:scale-110 opacity-80 group-hover/image-container:opacity-100"
          />
          <div className="absolute inset-0 bg-black/20 group-hover/image-container:bg-transparent transition-colors duration-500 pointer-events-none" />
        </div>
      )}

      {/* 
          Action Button
          - Size: w-20 h-20 (80px)
          - Position: bottom-0 right-0
       */}
      <div className="absolute bottom-0 right-0 z-20">
        <Button
          size="icon"
          className="w-16 h-16 rounded-2xl bg-white text-black border-0 m-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors shadow-lg flex items-center justify-center hover:bg-[#00f866] group-hover/image-container:bg-[#00f866]"
        >
          <ExternalLink className="w-6 h-6" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
};

export const SuccessStoriesSection = (): React.JSX.Element => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Approx card width
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const cards = [
    {
      title: "Transparency",
      description:
        "Upfront pricing with a clear estimation calculator. Fixed costs, accurate timelines, and no hidden surprises.",
      tag: "Case Study",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Efficiency",
      description:
        "Streamlined workflows that maximize productivity. We deliver high-quality results in record time.",
      tag: "Blog",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    },
    {
      title: "Innovation",
      description:
        "Cutting-edge solutions tailored to your unique business needs, leveraging the latest technologies.",
      tag: "Case Study",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    },
    {
      title: "Support",
      description:
        "Dedicated 24/7 support team ensuring your systems run smoothly and efficiently at all times.",
      tag: "Service",
      image:
        "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2669&auto=format&fit=crop",
    },
  ];

  const vector5 = (
    <svg
      width="391"
      height="103"
      viewBox="0 0 391 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto pointer-events-none select-none -z-10"
    >
      <path
        opacity="0.5"
        d="M12.2285 70.7687L304.052 12.317C306.476 11.8315 307.452 15.3116 305.129 16.11573L111.629 86.6134C109.341 87.4466 110.247 90.8175 112.648 90.4645L378.229 45.4478"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  const vector7 = (
    <svg
      width="391"
      height="103"
      viewBox="0 0 391 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto pointer-events-none select-none -z-10"
    >
      <path
        opacity="0.5"
        d="M12.2285 70.7687L304.052 12.317C306.476 11.8315 307.452 15.3116 305.129 16.1573L111.629 86.6134C109.341 87.4466 110.247 90.8715 112.648 90.4645L378.229 45.4478"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  const vector4 = (
    <svg
      width="431"
      height="109"
      viewBox="0 0 431 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto pointer-events-none select-none -z-10"
    >
      <path
        opacity="0.5"
        d="M12.2285 75.1714L337.897 12.3118C340.33 11.8422 341.276 15.3424 338.938 16.1627L121.003 92.6317C118.698 93.4403 119.577 96.8864 121.987 96.4927L418.229 48.1043"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <section className="w-full bg-[#1f1f1f] py-12 md:py-16 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1360px] mx-auto">
        <h2 className="font-righteous font-normal text-[32px] sm:text-4xl md:text-6xl lg:text-[80px] tracking-[0.80px] leading-tight lg:leading-[80px] mb-8 md:mb-10 text-center md:text-left">
          <span className="relative inline-block text-[#00f866] z-0 whitespace-nowrap">
            Success
            {vector5}
          </span>{" "}
          <span className="relative inline-block text-[#00f866] z-0 whitespace-nowrap">
            stories
            {vector7}
          </span>{" "}
          <span className="text-white block md:inline">showing </span>
          <span className="text-white">measurable results </span>
          <br className="hidden md:block" />
          <span className="relative inline-block text-[#00f866] z-0 whitespace-nowrap">
            with Qodet
            {vector4}
          </span>
        </h2>

        <div className="flex flex-col gap-5 w-full">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <div className="flex items-center gap-2.5 py-2 md:py-4">
              <BookCheckIcon className="w-5 h-5 md:w-6 md:h-6 text-[#00f866]" />
              <span className="font-righteous font-normal text-[#00f866] text-sm md:text-base">
                Library
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#343339] rounded-lg border-none hover:bg-[#343339]/80"
              >
                <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-none hover:bg-white/90"
              >
                <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-black" />
              </Button>
            </div>
          </div>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-4 md:gap-6 w-full overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cards.map((card, index) => (
              <Card
                key={index}
                // Glassmorphic Style
                className="relative flex-shrink-0 w-[300px] md:w-[396px] h-auto md:h-[500px] rounded-2xl border border-white/10 bg-[#434343]/20 backdrop-blur-md overflow-hidden flex flex-col snap-center p-0 group"
              >
                {/* Top Content */}
                <div className="p-8 flex flex-col gap-4 relative z-10 bg-transparent">
                  <h3 className="font-righteous text-white text-3xl md:text-[40px] leading-[1]">
                    {card.title}
                  </h3>
                  <p className="font-poppins text-[#d5d5d5] text-sm md:text-base leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="rounded-full border-[#525252] text-white px-4 py-1.5 hover:bg-[#525252] transition-colors"
                    >
                      <span className="font-poppins font-medium text-xs md:text-sm">
                        {card.tag}
                      </span>
                    </Badge>
                  </div>
                </div>

                {/* Bottom Image Block with SVG Mask */}
                <div className="flex-grow relative mt-4 mx-2 mb-2 group/image min-h-[200px] md:min-h-0">
                  <MaskedCardImage src={card.image} alt={card.title} />
                </div>
              </Card>
            ))}
            {/* Spacer for right padding in scroll view */}
            <div className="w-2 md:w-6 flex-shrink-0" />
          </div>
        </div>

        <div className="flex justify-center mt-6 md:mt-10">
          <Button
            onClick={scrollToContact}
            className="group relative h-14 px-10 rounded-xl bg-white text-[#202020] overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#00f866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2 font-righteous text-lg group-hover:text-black transition-colors duration-300">
              Schedule A Call
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
