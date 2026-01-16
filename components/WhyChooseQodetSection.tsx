"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion, Variants } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const WhyChooseQodetSection = (): React.JSX.Element => {
  const cardData = [
    {
      title: "Transparency",
      description:
        "Upfront pricing with a clear estimation calculator. Fixed costs, accurate timelines, and no hidden surprises.",
    },
    {
      title: "Accountability",
      description:
        "We take ownership of the entire lifecycle - from sign-up to project delivery",
    },
    {
      title: "Efficiency",
      description:
        "Streamlined workflows that maximize productivity. We deliver high-quality results in record time.",
    },
  ];

  const vector2 = (
    <svg
      width="354"
      height="103"
      viewBox="0 0 354 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto pointer-events-none select-none z-0"
    >
      <path
        opacity="0.5"
        d="M12.2285 70.7199L274.256 12.3337C276.652 11.7999 277.717 15.2181 275.442 16.1396L101.612 86.552C99.3738 87.4564 100.36 90.8184 102.733 90.371L341.229 45.399"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  const rectVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "backOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 3,
      },
    }),
  };

  // Graphic Size Logic: Scaled up by ~1.2x
  // Mobile: 312px | Tablet: 252px | Desktop: 374px

  const TransparencyGraphic = () => {
    return (
      <svg
        width="260"
        height="143"
        viewBox="0 0 260 143"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[312px] md:w-[252px] lg:w-[374px] h-auto flex-shrink-0"
      >
        <motion.rect
          custom={1}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="130.137"
          y="119.624"
          width="63.5922"
          height="63.5922"
          rx="4.37709"
          transform="rotate(-90 130.137 119.624)"
          fill="#00F866"
        />
        <motion.rect
          custom={2}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="64"
          y="100.046"
          width="63.5922"
          height="63.5922"
          rx="4.37709"
          transform="rotate(-90 64 100.046)"
          fill="#00F866"
        />
        <motion.rect
          custom={3}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="130.137"
          y="93.5923"
          width="63.5922"
          height="63.5922"
          rx="4.37709"
          transform="rotate(-90 130.137 93.5923)"
          fill="#00885A"
        />
        <motion.rect
          custom={4}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="64"
          y="63.5923"
          width="63.5922"
          height="63.5922"
          rx="4.37709"
          transform="rotate(-90 64 63.5923)"
          fill="#00885A"
        />
        <motion.rect
          custom={5}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="196"
          y="143"
          width="79"
          height="64"
          rx="4.37709"
          transform="rotate(-90 196 143)"
          fill="#00F866"
        />
        <motion.rect
          custom={6}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          y="134"
          width="49"
          height="64"
          rx="4.37709"
          transform="rotate(-90 0 134)"
          fill="#00F866"
        />
        <motion.rect
          custom={7}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="196"
          y="78.5923"
          width="63.5922"
          height="63.5922"
          rx="4.37709"
          transform="rotate(-90 196 78.5923)"
          fill="#00885A"
        />
        <motion.rect
          custom={8}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          y="99.5923"
          width="63.5922"
          height="63.5922"
          rx="4.37709"
          transform="rotate(-90 0 99.5923)"
          fill="#00885A"
        />
      </svg>
    );
  };

  const AccountabilityGraphic = () => {
    return (
      <svg
        width="203"
        height="180"
        viewBox="0 0 203 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[240px] md:w-[192px] lg:w-[288px] h-auto flex-shrink-0"
      >
        <g filter="url(#filter0_d_131_243)">
          <path
            d="M4.37207 139.881L4.37207 88.1191C4.37214 85.4973 6.49733 83.3721 9.11914 83.3721L61.8809 83.3721C64.5027 83.3721 66.6279 85.4973 66.6279 88.1191L66.6279 139.881C66.6279 142.503 64.5027 144.628 61.8809 144.628L9.11914 144.628C6.49733 144.628 4.37214 142.503 4.37207 139.881Z"
            fill="#00885A"
            stroke="#434343"
            strokeWidth="0.74375"
          />
          <path
            d="M4.37207 66.8809L4.37207 15.1191C4.37214 12.4973 6.49733 10.3721 9.11914 10.3721L61.8809 10.3721C64.5027 10.3721 66.6279 12.4973 66.6279 15.1191L66.6279 66.8809C66.6279 69.5027 64.5027 71.6279 61.8809 71.6279L9.11914 71.6279C6.49733 71.6279 4.37214 69.5027 4.37207 66.8809Z"
            fill="#00885A"
            stroke="#434343"
            strokeWidth="0.74375"
          />
          <path
            d="M135.372 66.8809L135.372 15.1191C135.372 12.4973 137.497 10.3721 140.119 10.3721L192.881 10.3721C195.503 10.3721 197.628 12.4973 197.628 15.1191L197.628 66.8809C197.628 69.5027 195.503 71.6279 192.881 71.6279L140.119 71.6279C137.497 71.6279 135.372 69.5027 135.372 66.8809Z"
            fill="#00885A"
            stroke="#434343"
            strokeWidth="0.74375"
          />
          <path
            d="M136.165 139.881L136.165 88.1191C136.165 85.4973 138.29 83.3721 140.912 83.3721L193.674 83.3721C196.296 83.3721 198.421 85.4973 198.421 88.1191L198.421 139.881C198.421 142.503 196.296 144.628 193.674 144.628L140.912 144.628C138.29 144.628 136.165 142.503 136.165 139.881Z"
            fill="#00885A"
            stroke="#434343"
            strokeWidth="0.74375"
          />
          <path
            d="M74.9122 114C72.0849 114 69.793 111.708 69.793 108.881L69.793 57.1193C69.793 54.292 72.0849 52 74.9122 52L127.674 52C130.501 52 132.793 54.292 132.793 57.1193L132.793 108.881C132.793 111.708 130.501 114 127.674 114L74.9122 114Z"
            fill="#00885A"
          />
          <motion.rect
            custom={1}
            variants={rectVariants}
            initial="hidden"
            animate="visible"
            x="4"
            y="62.793"
            width="62.793"
            height="62.793"
            rx="4.32208"
            transform="rotate(-90 4 62.793)"
            fill="#00F866"
          />
          <motion.rect
            custom={2}
            variants={rectVariants}
            initial="hidden"
            animate="visible"
            x="135.793"
            y="62.793"
            width="62.793"
            height="62.793"
            rx="4.32208"
            transform="rotate(-90 135.793 62.793)"
            fill="#00F866"
          />
          <motion.rect
            custom={3}
            variants={rectVariants}
            initial="hidden"
            animate="visible"
            x="4"
            y="171.379"
            width="62.793"
            height="62.793"
            rx="4.32208"
            transform="rotate(-90 4 171.379)"
            fill="#00F866"
          />
          <motion.rect
            custom={4}
            variants={rectVariants}
            initial="hidden"
            animate="visible"
            x="135.793"
            y="171.379"
            width="62.793"
            height="62.793"
            rx="4.32208"
            transform="rotate(-90 135.793 171.379)"
            fill="#00F866"
          />
          <path
            d="M74.9122 86C72.0849 86 69.793 83.708 69.793 80.8807L69.793 29.1193C69.793 26.292 72.0849 24 74.9122 24L127.674 24C130.501 24 132.793 26.292 132.793 29.1193L132.793 80.8807C132.793 83.708 130.501 86 127.674 86L74.9122 86Z"
            fill="#00F866"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_131_243"
            x="0"
            y="0"
            width="202.793"
            height="179.379"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_131_243"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_131_243"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  };

  const EfficiencyGraphic = () => {
    return (
      <svg
        width="195"
        height="214"
        viewBox="0 0 195 214"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[228px] md:w-[180px] lg:w-[276px] h-auto flex-shrink-0"
      >
        <rect
          x="131"
          y="198.793"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 131 198.793)"
          fill="#00885A"
        />
        <rect
          x="65"
          y="115.793"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 65 115.793)"
          fill="#00885A"
        />
        <rect
          x="132"
          y="62.793"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 132 62.793)"
          fill="#00885A"
        />
        <rect
          y="178.793"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 0 178.793)"
          fill="#00885A"
        />
        <motion.rect
          custom={1}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="65.3047"
          y="147.694"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 65.3047 147.694)"
          fill="#00F866"
        />
        <motion.rect
          custom={2}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          y="212.293"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 0 212.293)"
          fill="#00F866"
        />
        <motion.rect
          custom={3}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="65.3047"
          y="212.293"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 65.3047 212.293)"
          fill="#00F866"
        />
        <motion.rect
          custom={4}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="130.609"
          y="212.293"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 130.609 212.293)"
          fill="#00F866"
        />
        <motion.rect
          custom={5}
          variants={rectVariants}
          initial="hidden"
          animate="visible"
          x="131.207"
          y="82.793"
          width="62.793"
          height="62.793"
          rx="4.32208"
          transform="rotate(-90 131.207 82.793)"
          fill="#00F866"
        />
      </svg>
    );
  };

  const renderGraphic = (title: string) => {
    switch (title) {
      case "Transparency":
        return <TransparencyGraphic />;
      case "Accountability":
        return <AccountabilityGraphic />;
      case "Efficiency":
        return <EfficiencyGraphic />;
      default:
        return null;
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-[#1f1f1f] py-12 md:py-16 px-4 md:px-10">
      <div className="max-w-[1360px] mx-auto">
        <div className="flex flex-col gap-6 md:gap-10">
          <h2 className="font-righteous font-normal text-[32px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-center tracking-[0.80px] leading-tight md:leading-[1.1] lg:leading-[80px] px-2">
            <span className="text-white">Why Choose </span>
            <span className="relative inline-block text-[#00f866]">
              <span className="relative z-10">Qodet</span>
              {vector2}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full place-items-center">
            {cardData.map((card, index) => {
              // Glassmorphic Card Style
              const bgClass =
                "bg-[#434343]/20 backdrop-blur-md border border-white/10";

              return (
                <Card
                  key={index}
                  className={`w-full max-w-[396px] min-h-[280px] h-auto md:min-h-[400px] md:h-[500px] rounded-lg overflow-hidden ${bgClass}`}
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Graphic Area - Same percentage height on all screens to keep marker in same position */}
                    <div className="relative h-[62%] w-full min-h-[200px]">
                      {/* Blurred BG */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-60 blur-[3px] pointer-events-none overflow-hidden">
                        {renderGraphic(card.title)}
                      </div>

                      {/* Sharp Center - Same positioning on all screens */}
                      <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-[55%] lg:-translate-y-[60%]
                                      w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[240px] lg:h-[240px] 
                                      border border-white/10 bg-transparent rounded-xl overflow-hidden
                                      flex items-center justify-center z-10"
                      >
                        <div className="flex items-center justify-center min-w-max min-h-max scale-90 md:scale-100">
                          {renderGraphic(card.title)}
                        </div>
                      </div>
                    </div>

                    {/* Content Area - Same percentage height on all screens */}
                    <div className="relative h-[38%] w-full px-4 md:px-6 lg:px-8 pt-4 pb-4 md:pb-6 lg:pb-8 flex flex-col justify-start z-10">
                      <h3 className="font-righteous font-normal text-white text-xl md:text-2xl lg:text-4xl leading-tight mb-2 md:mb-3">
                        {card.title}
                      </h3>
                      <p className="font-poppins font-medium text-[#d5d5d5] text-xs md:text-sm lg:text-base leading-[18px] md:leading-[22px] lg:leading-[24px]">
                        {card.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center mt-4 md:mt-6 px-4">
            <Button
              onClick={scrollToContact}
              className="group relative h-12 md:h-14 px-6 md:px-8 rounded-xl bg-white text-[#202020] overflow-hidden transition-transform duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-[#00f866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2 font-righteous text-base md:text-lg group-hover:text-black transition-colors duration-300">
                Have A Quick Demo
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
