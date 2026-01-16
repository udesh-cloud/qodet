
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { Button } from "./ui/button";
import { Lock, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ResetPasswordPage = (): React.JSX.Element => {
  const router = useRouter();
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
        // Redirect after success
        setTimeout(() => router.push("/signup"), 2000); 
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#1f1f1f]">
      <Navbar />

      <main className="pt-[100px] pb-20 relative min-h-[calc(100vh-100px)] flex items-center justify-center">
         {/* Background Decor */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[20%] right-[30%] w-[500px] h-[500px] bg-[#00885A] opacity-[0.03] blur-[150px] rounded-full" />
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-4 relative z-10"
        >
            <div className="bg-[#242424]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F866] via-[#00885A] to-[#1f1f1f]" />

                {success ? (
                   <div className="flex flex-col items-center text-center gap-6 py-8">
                       <div className="w-20 h-20 rounded-full bg-[#00F866]/10 flex items-center justify-center border border-[#00F866]/20">
                          <CheckCircle className="w-10 h-10 text-[#00F866]" />
                       </div>
                       <h1 className="font-righteous text-3xl text-white">Password Reset!</h1>
                       <p className="text-white/50 text-sm">Your password has been successfully reset. Redirecting to login...</p>
                   </div>
                ) : (
                    <>
                        <div className="mb-8 text-center">
                            <h1 className="font-righteous text-3xl text-white mb-2">Set new password</h1>
                            <p className="font-poppins text-white/50 text-sm">
                                Your new password must be different to previously used passwords.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {error && (
                                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center">
                                    {error}
                                </div>
                            )}

                            <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 hover:border-white/10">
                                <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                                    <Lock size={12}/> New Password
                                </label>
                                <input 
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-base font-poppins outline-none" 
                                    placeholder="Min 8 characters" 
                                />
                            </div>

                            <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 hover:border-white/10">
                                <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                                    <Lock size={12}/> Confirm Password
                                </label>
                                <input 
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-base font-poppins outline-none" 
                                    placeholder="Confirm new password" 
                                />
                            </div>

                            <Button 
                                type="submit"
                                disabled={isLoading}
                                className="group h-14 w-full bg-white text-black hover:bg-white/90 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg relative mt-2"
                            >
                                <div className="absolute inset-0 bg-[#00F866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                                <span className="relative z-10 flex items-center justify-center gap-2 font-righteous text-lg group-hover:text-black transition-colors duration-300">
                                    {isLoading ? "Resetting..." : "Reset Password"}
                                    {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                                </span>
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link href="/signup" className="text-white/40 hover:text-white text-sm font-poppins transition-colors">
                                Back to Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
};
