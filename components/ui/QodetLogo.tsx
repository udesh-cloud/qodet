
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

interface QodetLogoProps {
  className?: string;
  primaryColor?: string;   // Foreground (Light Green default)
  secondaryColor?: string; // Background (Dark Green default)
  isHoverable?: boolean;
}

export const QodetLogo = ({
  className = "h-10 w-auto",
  primaryColor = "#00F866",
  secondaryColor = "#00885A",
  isHoverable = false,
}: QodetLogoProps) => {
  
  const hoverVariant = (offsetY: number): Variants => ({
    initial: { y: 0 },
    hover: { 
      y: isHoverable ? offsetY : 0,
      transition: { duration: 0.5, ease: "backOut" }
    }
  });

  return (
    <motion.svg
      viewBox="0 0 283 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="initial"
      whileHover="hover"
    >
      {/* Dark Squares (Static Background) */}
      <rect y="300.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 0 300.793)" fill={secondaryColor}/>
      <rect x="188" y="300.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 188 300.793)" fill={secondaryColor}/>
      <rect y="168.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 0 168.793)" fill={secondaryColor}/>
      <rect x="188" y="168.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 188 168.793)" fill={secondaryColor}/>
      <rect y="234.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 0 234.793)" fill={secondaryColor}/>
      <rect x="188" y="234.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 188 234.793)" fill={secondaryColor}/>
      <rect x="24" y="102.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 24 102.793)" fill={secondaryColor}/>
      <rect x="24" y="366.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 24 366.793)" fill={secondaryColor}/>
      <rect x="90" y="92.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 90 92.793)" fill={secondaryColor}/>
      <rect x="90" y="366.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 90 366.793)" fill={secondaryColor}/>
      <rect x="156" y="102.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 156 102.793)" fill={secondaryColor}/>
      <rect x="156" y="366.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 156 366.793)" fill={secondaryColor}/>
      <rect x="220" y="439.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 220 439.793)" fill={secondaryColor}/>

      {/* Light Squares (Animated Foreground) */}
      
      {/* Group 1: Offset 10px */}
      <motion.g variants={hoverVariant(10)}>
        <rect y="290.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 0 290.793)" fill={primaryColor}/>
        <rect x="188" y="290.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 188 290.793)" fill={primaryColor}/>
        <rect x="90" y="356.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 90 356.793)" fill={primaryColor}/>
      </motion.g>

      {/* Group 2: Offset 20px */}
      <motion.g variants={hoverVariant(20)} transition={{ delay: 0.05 }}>
        <rect y="214.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 0 214.793)" fill={primaryColor}/>
        <rect x="188" y="214.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 188 214.793)" fill={primaryColor}/>
      </motion.g>

      {/* Group 3: Offset 30px */}
      <motion.g variants={hoverVariant(30)} transition={{ delay: 0.1 }}>
        <rect y="138.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 0 138.793)" fill={primaryColor}/>
        <rect x="188" y="138.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 188 138.793)" fill={primaryColor}/>
        <rect x="24" y="72.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 24 72.793)" fill={primaryColor}/>
        <rect x="24" y="336.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 24 336.793)" fill={primaryColor}/>
        <rect x="90" y="62.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 90 62.793)" fill={primaryColor}/>
        <rect x="156" y="72.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 156 72.793)" fill={primaryColor}/>
        <rect x="156" y="336.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 156 336.793)" fill={primaryColor}/>
        <rect x="220" y="409.793" width="62.793" height="62.793" rx="4.32208" transform="rotate(-90 220 409.793)" fill={primaryColor}/>
      </motion.g>
    </motion.svg>
  );
};
