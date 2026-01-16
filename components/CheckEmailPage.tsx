
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { Button } from "./ui/button";
import { Mail, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export const CheckEmailPage = (): React.JSX.Element => {
  const openEmailApp = () => {
    window.location.href = "mailto:";
  };

  // Modern underline vector
  const vectorUnderline = (
    <svg
      width="180"
      height="20"
      viewBox="0 0 180 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-4 left-0 w-full h-auto pointer-events-none select-none z-0"
    >
      <path
        d="M2 12C30 12 50 5 90 5C130 5 150 15 178 15"
        stroke="#00885A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-[#1f1f1f] text-white">
      <Navbar />

      <main className="pt-[100px] pb-20 relative min-h-[calc(100vh-100px)] flex items-center justify-center">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] bg-[#00885A] opacity-[0.04] blur-[150px] rounded-full" />
        </div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-4 relative z-10"
        >
            <div className="bg-[#242424]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center gap-8">
                
                {/* Icon - 3D Block Aesthetic */}
                <div className="relative w-24 h-24 mx-auto">
                    {/* Dark Green Square (Shadow Depth) */}
                    <div className="absolute inset-0 bg-[#00885A] rounded-2xl translate-x-3 translate-y-3" />
                    
                    {/* Light Green Square (Top) */}
                    <div className="relative w-full h-full bg-[#00F866] rounded-2xl flex items-center justify-center shadow-xl z-10 border border-white/10">
                        {/* Icon */}
                        <Mail className="w-10 h-10 text-[#1f1f1f]" strokeWidth={1.5} />
                    </div>
                </div>

                <div>
                    <h1 className="font-righteous text-3xl md:text-4xl text-white mb-4">
                        Check your{" "}
                        <span className="text-[#00F866] relative inline-block">
                            inbox
                            {vectorUnderline}
                        </span>
                    </h1>
                    <p className="font-poppins text-white/60 text-base leading-relaxed">
                        We've sent a secure login link to your email address. Please click the link to continue.
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full relative z-10">
                    <Button 
                        onClick={openEmailApp}
                        className="group h-14 w-full bg-white text-black hover:bg-white/90 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg relative"
                    >
                         <div className="absolute inset-0 bg-[#00F866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                         <span className="relative z-10 flex items-center justify-center gap-2 font-righteous text-lg group-hover:text-black transition-colors duration-300">
                             Open Email App <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                         </span>
                    </Button>
                    
                    <div className="text-sm font-poppins text-white/40 mt-2">
                        Did not receive the email? <br/> Check your spam filter, or <Link href="/forgot-password" className="text-[#00F866] hover:text-white transition-colors underline decoration-1 underline-offset-4 decoration-[#00F866]/50 hover:decoration-[#00F866]">try another email address</Link>
                    </div>
                </div>

                {/* Navigation Back */}
                <Link href="/signup">
                   <motion.div 
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white hover:text-[#00F866] text-sm font-poppins flex items-center justify-center gap-2 transition-colors inline-flex cursor-pointer mt-2"
                   >
                      <ArrowLeft size={16} /> Back to Signup
                   </motion.div>
                </Link>

            </div>
        </motion.div>

      </main>

      <FooterSection />
    </div>
  );
};
