"use client";
import React from "react";
import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";

export const CustomSolutionsSection = (): React.JSX.Element => {
  // Decorative Background Vectors
  const vector9 = (
    <svg
      width="219"
      height="81"
      viewBox="0 0 219 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-auto pointer-events-none select-none z-0"
    >
      <path
        opacity="0.5"
        d="M12.2281 38.95L172.719 12.2869C175.05 11.8997 176.008 15.1643 173.837 16.0974L60.76 64.6996C58.6454 65.6085 59.4874 68.7831 61.7745 68.5244L206.433 52.1619"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  const vector10 = (
    <svg
      width="817"
      height="112"
      viewBox="0 0 817 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto pointer-events-none select-none z-0"
    >
      <path
        opacity="0.5"
        d="M12.2266 75.8012L699.623 12.1743L182.581 99.1743L804.227 50.4803"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  // 1. AI Graphic - Brain/Circuit
  // Reduced mobile size further to w-16 h-16 to be very compact
  const aiSvg = (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 md:w-44 md:h-44 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]"
    >
      <path
        d="M60 20C40 20 20 35 20 60C20 85 35 100 60 100"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        className="opacity-90"
      />
      <path
        d="M60 20C80 20 100 35 100 60C100 85 85 100 60 100"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      {/* Circuit Nodes */}
      <circle cx="60" cy="60" r="8" fill="#4ade80" />
      <circle cx="40" cy="40" r="5" fill="#4ade80" fillOpacity="0.8" />
      <circle cx="80" cy="40" r="5" fill="#4ade80" fillOpacity="0.8" />
      <circle cx="40" cy="80" r="5" fill="#4ade80" fillOpacity="0.8" />
      <circle cx="80" cy="80" r="5" fill="#4ade80" fillOpacity="0.8" />

      {/* Connections */}
      <path d="M60 60L40 40" stroke="white" strokeWidth="2" />
      <path d="M60 60L80 40" stroke="white" strokeWidth="2" />
      <path d="M60 60L40 80" stroke="white" strokeWidth="2" />
      <path d="M60 60L80 80" stroke="white" strokeWidth="2" />
      <path d="M60 20V35" stroke="#4ade80" strokeWidth="2" />
      <path d="M60 85V100" stroke="#4ade80" strokeWidth="2" />
    </svg>
  );

  // 2. Web & App Graphic - Monitor & Phone Vector
  const webAppSvg = (
    <svg
      viewBox="0 0 168 139"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-24 h-24 md:w-32 md:h-32 transition-transform duration-500 group-hover:rotate-1 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
    >
      {/* Monitor */}
      <rect
        x="10"
        y="20"
        width="120"
        height="80"
        rx="6"
        fill="#2A2A2A"
        stroke="#4ade80"
        strokeWidth="2"
      />
      <path
        d="M10 85H130"
        stroke="#4ade80"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <rect x="50" y="100" width="40" height="5" fill="#4ade80" />
      <rect
        x="30"
        y="105"
        width="80"
        height="3"
        rx="1.5"
        fill="#4ade80"
        fillOpacity="0.5"
      />

      {/* Monitor Screen Elements */}
      <rect
        x="20"
        y="30"
        width="40"
        height="30"
        rx="2"
        fill="white"
        fillOpacity="0.1"
      />
      <rect
        x="70"
        y="30"
        width="50"
        height="4"
        rx="2"
        fill="white"
        fillOpacity="0.3"
      />
      <rect
        x="70"
        y="40"
        width="40"
        height="4"
        rx="2"
        fill="white"
        fillOpacity="0.3"
      />
      <rect
        x="70"
        y="50"
        width="30"
        height="4"
        rx="2"
        fill="white"
        fillOpacity="0.3"
      />

      {/* Mobile Phone (overlapping) */}
      <rect
        x="110"
        y="45"
        width="45"
        height="80"
        rx="6"
        fill="#1f1f1f"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M110 55H155"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <path
        d="M110 115H155"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <circle cx="132.5" cy="120" r="3" fill="#4ade80" />

      {/* Mobile Screen Elements */}
      <rect
        x="118"
        y="65"
        width="29"
        height="30"
        rx="2"
        fill="#4ade80"
        fillOpacity="0.2"
      />
      <rect
        x="118"
        y="100"
        width="20"
        height="3"
        rx="1.5"
        fill="white"
        fillOpacity="0.4"
      />
    </svg>
  );

  // 3. API Graphic - Cloud/Nodes
  const apiSvg = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-110"
    >
      {/* Central Hexagon */}
      <path
        d="M50 30 L70 40 V60 L50 70 L30 60 V40 L50 30Z"
        stroke="#4ade80"
        strokeWidth="3"
        fill="none"
        className="group-hover:fill-[#4ade80]/10 transition-colors duration-300"
      />
      <circle cx="50" cy="50" r="6" fill="white" />

      {/* Connections */}
      <line
        x1="50"
        y1="30"
        x2="50"
        y2="15"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <line
        x1="70"
        y1="40"
        x2="85"
        y2="30"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <line
        x1="70"
        y1="60"
        x2="85"
        y2="70"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <line
        x1="50"
        y1="70"
        x2="50"
        y2="85"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <line
        x1="30"
        y1="60"
        x2="15"
        y2="70"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <line
        x1="30"
        y1="40"
        x2="15"
        y2="30"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 2"
      />

      {/* Nodes */}
      <circle cx="50" cy="15" r="4" fill="#4ade80" />
      <circle cx="85" cy="30" r="4" stroke="white" strokeWidth="2" />
      <circle cx="85" cy="70" r="4" fill="#4ade80" />
      <circle cx="50" cy="85" r="4" stroke="white" strokeWidth="2" />
      <circle cx="15" cy="70" r="4" fill="#4ade80" />
      <circle cx="15" cy="30" r="4" stroke="white" strokeWidth="2" />
    </svg>
  );

  // 4. UI/UX Graphic - Design Tools
  const uiUxSvg = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
    >
      {/* Pen Tool Shape */}
      <path
        d="M20 80 L35 75 L75 35 C80 30 85 30 90 35 C95 40 95 45 90 50 L50 90 L45 105 L20 80 Z"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M35 75 L50 90" stroke="white" strokeWidth="2" />

      {/* Palette Swatches */}
      <circle cx="30" cy="30" r="10" fill="#4ade80" opacity="0.8" />
      <circle cx="55" cy="20" r="8" fill="white" opacity="0.2" />
      <circle cx="20" cy="55" r="8" fill="white" opacity="0.2" />

      {/* Cursor */}
      <path
        d="M60 60 L75 90 L82 82 L90 75 L60 60"
        fill="#4ade80"
        stroke="#242424"
        strokeWidth="2"
        className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"
      />
    </svg>
  );

  return (
    <section className="w-full bg-[#1f1f1f] py-12 md:py-16 px-4 md:px-10">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-6 md:gap-10 mb-12 md:mb-16">
          <h2 className="font-righteous font-normal text-center tracking-[0.80px] leading-tight md:leading-[1.1] lg:leading-[80px] text-[32px] sm:text-4xl md:text-6xl lg:text-[80px]">
            <span className="text-white">Custom solutions built for </span>
            <span className="relative inline-block text-[#4ade80] whitespace-nowrap">
              <span className="relative z-10">scale</span>
              {vector9}
            </span>
            <span className="text-white">,</span>
            <br className="hidden md:block" />
            <span className="relative inline-block text-[#4ade80] mt-1 md:mt-0">
              <span className="relative z-10 whitespace-nowrap">
                speed, and success
              </span>
              {vector10}
            </span>
            <span className="text-white">.</span>
          </h2>

          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-2 flex items-center gap-2.5 rounded-lg border-none bg-transparent"
            >
              <StarIcon className="w-5 h-5 md:w-6 md:h-6 text-[#4ade80]" />
              <span className="font-righteous font-normal text-[#4ade80] text-sm md:text-base tracking-[0]">
                Services
              </span>
            </Badge>
          </div>
        </div>

        {/* Service Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:h-[420px]">
          {/* Card 1: AI-Powered Development (Large Left) */}
          <div className="col-span-1 md:col-span-5 bg-[#1c6339] rounded-lg p-6 md:p-8 flex flex-col justify-between md:h-full min-h-[220px] md:min-h-[320px] group hover:bg-[#1f7041] transition-colors duration-300 cursor-pointer overflow-hidden relative border border-transparent hover:border-[#4ade80]/30 shadow-lg">
            <div className="mb-4 md:mb-6 relative z-10 flex justify-center md:justify-start">
              {aiSvg}
            </div>
            <div className="relative z-10">
              <h3 className="font-righteous font-normal text-white text-2xl md:text-[36px] leading-tight md:leading-[40px] mb-3 md:mb-4 group-hover:text-[#4ade80] transition-colors duration-300">
                AI-Powered Development
              </h3>
              <p className="font-poppins font-medium text-white/90 text-sm md:text-lg leading-relaxed md:leading-[24px]">
                Unlock the power of artificial intelligence. We build custom
                models, integrate LLMs, and automate complex workflows.
              </p>
            </div>
          </div>

          {/* Right Side - 7 columns */}
          <div className="col-span-1 md:col-span-7 flex flex-col gap-6 h-full">
            {/* Card 2: Web & App Development (Top Right) */}
            <div className="bg-[#1e2422] rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6 flex-1 group hover:bg-[#252c29] transition-colors duration-300 cursor-pointer border border-transparent hover:border-[#4ade80]/20 shadow-md">
              <div className="flex-shrink-0 mx-auto sm:mx-0">{webAppSvg}</div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-righteous font-normal text-white text-xl md:text-[24px] leading-[28px] mb-3 group-hover:text-[#4ade80] transition-colors duration-300">
                  Web & App Development
                </h3>
                <p className="font-poppins font-medium text-white/80 text-sm md:text-base leading-[20px]">
                  Seamless experiences across all devices. From high-performance
                  web apps to native mobile solutions, we code for speed and
                  scalability.
                </p>
              </div>
            </div>

            {/* Bottom Right - Two Cards Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {/* Card 3: API Development */}
              <div className="bg-[#20332d] rounded-lg p-6 flex flex-col justify-between min-h-[200px] group hover:bg-[#263e36] transition-colors duration-300 cursor-pointer border border-transparent hover:border-[#4ade80]/20 shadow-md">
                <div className="flex items-center justify-center sm:justify-start mb-4">
                  {apiSvg}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-righteous font-normal text-white text-lg md:text-[20px] leading-[24px] mb-3 group-hover:text-[#4ade80] transition-colors duration-300">
                    API Development & Integrations
                  </h3>
                  <p className="font-poppins font-medium text-white/80 text-sm leading-[18px]">
                    Robust back-end infrastructure. We design secure, scalable
                    APIs that connect your systems and power your digital
                    ecosystem.
                  </p>
                </div>
              </div>

              {/* Card 4: UI/UX Design */}
              <div className="bg-[#242424] rounded-lg p-6 flex flex-col justify-between min-h-[200px] group hover:bg-[#2e2e2e] transition-colors duration-300 cursor-pointer border border-transparent hover:border-[#4ade80]/20 shadow-md">
                <div className="flex items-center justify-center sm:justify-start mb-4">
                  {uiUxSvg}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-righteous font-normal text-white text-lg md:text-[20px] leading-[24px] mb-3 group-hover:text-[#4ade80] transition-colors duration-300">
                    UI/UX Design & Prototyping
                  </h3>
                  <p className="font-poppins font-medium text-white/80 text-sm leading-[18px]">
                    Design that delights. We craft intuitive user interfaces and
                    engaging experiences that convert visitors into loyal
                    customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
