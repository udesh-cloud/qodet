
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { Button } from "./ui/button";
import { Mail, ArrowRight, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

export const ForgotPasswordPage = (): React.JSX.Element => {
  // Use window.location instead of useRouter for preview environment compatibility
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate using window location for preview safety
      window.location.href = "/check-email";
    }, 1500);
  };

  const vectorUnderline = (
    <svg
      width="220"
      height="20"
      viewBox="0 0 220 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-4 right-0 w-full h-auto pointer-events-none select-none z-0"
    >
      <path
        d="M5 12C50 12 90 5 130 5C170 5 200 15 215 15"
        stroke="#00885A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-[#1f1f1f] text-white">
      <Navbar />

      <main className="pt-[100px] pb-20 relative min-h-[calc(100vh-100px)] flex items-center justify-center">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-[#00F866] opacity-[0.03] blur-[150px] rounded-full" />
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-4 relative z-10"
        >
            <div className="bg-[#242424]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">

                <div className="flex flex-col gap-6 text-center">
                    
                    {/* Icon - 3D Block Aesthetic */}
                    <div className="relative w-24 h-24 mx-auto">
                        {/* Dark Green Square (Shadow Depth) */}
                        <div className="absolute inset-0 bg-[#00885A] rounded-2xl translate-x-3 translate-y-3" />
                        
                        {/* Light Green Square (Top) */}
                        <div className="relative w-full h-full bg-[#00F866] rounded-2xl flex items-center justify-center shadow-xl z-10 border border-white/10">
                            <Lock className="w-10 h-10 text-[#1f1f1f]" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div>
                        <h1 className="font-righteous text-3xl md:text-4xl text-white mb-3 relative inline-block">
                             Forgot Password?
                             {vectorUnderline}
                        </h1>
                        <p className="font-poppins text-white/60 text-base max-w-[320px] mx-auto leading-relaxed">
                            Don't worry, it happens. Enter your email below to reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left relative z-10">
                        <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 hover:border-white/10">
                            <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                               <Mail size={12}/> Email Address
                            </label>
                            <input 
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-base font-poppins outline-none" 
                              placeholder="jane@company.com" 
                            />
                        </div>

                        <Button 
                            type="submit"
                            disabled={isLoading}
                            className="group h-14 w-full bg-white text-black hover:bg-white/90 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg relative"
                        >
                            <div className="absolute inset-0 bg-[#00F866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                            <span className="relative z-10 flex items-center justify-center gap-2 font-righteous text-lg group-hover:text-black transition-colors duration-300">
                                {isLoading ? "Sending..." : "Send Reset Link"}
                                {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </Button>
                    </form>

                    <div>
                        <Link href="/signup">
                           <motion.div 
                                whileHover={{ scale: 1.05, x: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-white hover:text-[#00F866] text-sm font-poppins flex items-center justify-center gap-2 transition-colors inline-flex cursor-pointer"
                           >
                              <ArrowLeft size={16} /> Back to Signup
                           </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>

      </main>

      <FooterSection />
    </div>
  );
};
