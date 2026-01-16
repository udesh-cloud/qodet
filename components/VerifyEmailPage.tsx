
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { Button } from "./ui/button";
import { Mail, CheckCircle2 } from "lucide-react";

export const VerifyEmailPage = (): React.JSX.Element => {
  // Use window.location for preview compatibility instead of useRouter
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
        // Handle paste scenario if needed, taking first char
        value = value[0];
    }
    
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Handle paste event for the entire code
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newCode = [...code];
    pastedData.forEach((char, index) => {
        if (index < 6 && /^\d$/.test(char)) {
            newCode[index] = char;
        }
    });
    setCode(newCode);
    
    // Focus the next empty input or the last one
    const nextIndex = newCode.findIndex(c => c === "");
    if (nextIndex !== -1) {
        inputsRef.current[nextIndex]?.focus();
    } else {
        inputsRef.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      // Navigate using window location for preview safety
      window.location.href = "/";
    }, 1500);
  };

  const handleResend = () => {
    setTimer(30);
    // Logic to resend email would go here
  };

  // Modern underline vector
  const vectorUnderline = (
    <svg
      width="200"
      height="20"
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-4 right-0 w-full h-auto pointer-events-none select-none z-0"
    >
      <path
        d="M5 12C40 12 70 5 110 5C150 5 180 15 195 15"
        stroke="#00885A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-[#1f1f1f] text-white">
      <Navbar />

      <main className="pt-[100px] pb-20 relative min-h-[calc(100vh-100px)] flex items-center justify-center">
        {/* Background Decor */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#00F866] opacity-[0.03] blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-[#00885A] opacity-[0.05] blur-[100px] rounded-full" />
        </div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg mx-4 relative z-10"
        >
            <div className="bg-[#242424]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col items-center text-center gap-8">
                    
                    {/* Icon - 3D Block Aesthetic */}
                    <div className="relative w-24 h-24 mx-auto">
                        {/* Dark Green Square (Shadow Depth) */}
                        <div className="absolute inset-0 bg-[#00885A] rounded-2xl translate-x-3 translate-y-3" />
                        
                        {/* Light Green Square (Top) */}
                        <div className="relative w-full h-full bg-[#00F866] rounded-2xl flex items-center justify-center shadow-xl z-10 border border-white/10">
                            <Mail className="w-10 h-10 text-[#1f1f1f]" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Header */}
                    <div>
                        <h1 className="font-righteous text-3xl md:text-4xl text-white mb-3">
                             Check your{" "}
                             <span className="text-[#00F866] relative inline-block">
                                email
                                {vectorUnderline}
                             </span>
                        </h1>
                        <p className="font-poppins text-white/60 text-base max-w-[320px] mx-auto leading-relaxed">
                            We've sent a 6-digit verification code to <br/>
                            <span className="text-white font-semibold">jane@company.com</span>
                        </p>
                    </div>

                    {/* OTP Inputs */}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                        <div className="flex justify-between gap-2 md:gap-3" onPaste={handlePaste}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => { inputsRef.current[index] = el; }}
                                    id={`otp-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-16 md:w-14 md:h-20 rounded-2xl bg-[#1f1f1f] border border-white/10 text-center text-white text-2xl md:text-3xl font-righteous focus:border-[#00F866] focus:bg-[#1a1a1a] focus:shadow-[0_0_15px_rgba(0,248,102,0.1)] outline-none transition-all duration-300 placeholder:text-white/10"
                                    placeholder="0"
                                />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit"
                            disabled={isLoading || code.join("").length !== 6}
                            className="group h-14 w-full bg-white text-black hover:bg-white/90 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg relative disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-[#00F866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                            <span className="relative z-10 flex items-center justify-center gap-2 font-righteous text-lg group-hover:text-black transition-colors duration-300">
                                {isLoading ? (
                                    "Verifying..."
                                ) : (
                                    <>Verify Code <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" /></>
                                )}
                            </span>
                        </Button>
                    </form>

                    {/* Resend Link */}
                    <div className="text-sm font-poppins text-white/40">
                        Didn't receive the code?{" "}
                        {timer > 0 ? (
                            <span className="text-[#00F866] font-medium ml-1 inline-flex items-center gap-1 tabular-nums">
                                 Resend in 00:{timer < 10 ? `0${timer}` : timer}
                            </span>
                        ) : (
                            <motion.button 
                                onClick={handleResend}
                                whileHover={{ scale: 1.05, x: 2 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-white hover:text-[#00F866] font-medium transition-colors ml-1 underline decoration-1 underline-offset-4 hover:decoration-[#00F866] inline-block"
                            >
                                Click to resend
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>

      </main>

      <FooterSection />
    </div>
  );
};
