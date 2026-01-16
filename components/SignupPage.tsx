
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  LayoutGrid,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SignupPage = (): React.JSX.Element => {
  // Removed useRouter to prevent crashes in non-Next.js environments (like App.tsx preview)
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    role: "",
    companySize: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, companySize: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      // Use window location for navigation to be safe in preview environment
      window.location.href = "/verify-email"; 
    }, 1500);
  };

  // Background decoration vector
  const vectorSignup = (
    <svg
      width="219"
      height="81"
      viewBox="0 0 219 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 top-0 w-[40%] h-auto pointer-events-none select-none opacity-20"
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

  const benefits = [
    "Access to enterprise-grade AI tools",
    "Real-time project estimation & tracking",
    "Dedicated support & consultation",
    "Secure, scalable infrastructure deployment"
  ];

  return (
    <div className="min-h-screen w-full bg-[#1f1f1f] text-white">
      <Navbar />

      <main className="pt-[100px] pb-20 relative min-h-[calc(100vh-100px)] flex items-center justify-center">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#00F866] opacity-[0.02] blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00885A] opacity-[0.03] blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-4 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start lg:items-center">
            
            {/* LEFT COLUMN: Value Prop (5 Cols) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-8 sticky top-32">
              <div>
                <h1 className="font-righteous font-normal text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
                  Join the <br />
                  <span className="relative inline-block text-[#00F866]">
                    <span className="relative z-10">Future</span>
                    {vectorSignup}
                  </span> of <br /> Enterprise Tech
                </h1>
                <p className="font-poppins text-[#d5d5d5] text-lg leading-relaxed opacity-90">
                  Create an account to access our full suite of digital transformation tools, manage projects, and scale your business with Qodet.
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00F866]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-[#00F866]" />
                    </div>
                    <span className="text-white/80 font-poppins text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[#242424] border border-white/5 rounded-2xl relative overflow-hidden group hover:border-[#00F866]/30 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#00F866] opacity-[0.05] rounded-bl-full group-hover:scale-110 transition-transform duration-500" />
                <p className="font-righteous text-white text-lg italic mb-4 relative z-10">
                  "Qodet transformed our legacy systems into a powerhouse of efficiency. The platform is intuitive and powerful."
                </p>
                <div className="flex items-center gap-3 relative z-10">
                   <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" 
                      alt="User" 
                      className="w-10 h-10 rounded-full border border-white/10"
                   />
                   <div>
                      <p className="text-white text-sm font-bold">Elena Rodriguez</p>
                      <p className="text-[#00F866] text-xs">CTO at FinCore</p>
                   </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Signup Form (7 Cols) */}
            <div className="col-span-1 lg:col-span-7 w-full max-w-2xl mx-auto lg:ml-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#242424]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-10 shadow-2xl relative overflow-hidden"
              >
                 {/* Top Accent Line */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F866] via-[#00885A] to-[#1f1f1f]" />
                 <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00F866] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

                 <div className="mb-8 text-center lg:text-left">
                    <h2 className="font-righteous text-3xl text-white mb-2">Create Account</h2>
                    <p className="text-white/50 text-sm font-poppins">Start your digital transformation journey today.</p>
                 </div>

                 {/* OAuth Buttons */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <Button 
                      variant="outline" 
                      className="h-12 bg-[#1f1f1f] border-white/10 hover:bg-white hover:text-black hover:border-transparent text-white transition-all duration-300 gap-3 font-poppins font-medium group rounded-xl"
                    >
                       <svg className="w-5 h-5 group-hover:text-black" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                       </svg>
                       Google
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-12 bg-[#1f1f1f] border-white/10 hover:bg-[#0078D4] hover:text-white hover:border-transparent text-white transition-all duration-300 gap-3 font-poppins font-medium rounded-xl group"
                    >
                       <LayoutGrid size={20} className="text-[#0078D4] group-hover:text-white transition-colors" />
                       Microsoft
                    </Button>
                 </div>

                 <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                       <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                       <span className="bg-[#242424] px-4 text-white/40">Or register with email</span>
                    </div>
                 </div>

                 <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3"
                      >
                         <AlertCircle size={18} className="text-red-500" />
                         <span className="text-red-400 text-sm font-medium">{error}</span>
                      </motion.div>
                    )}

                    {/* Name & Role Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 group hover:border-white/10">
                            <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                               <User size={12}/> Full Name
                            </label>
                            <input 
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-sm md:text-base font-poppins outline-none" 
                              placeholder="Jane Doe" 
                            />
                        </div>

                        <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 hover:border-white/10">
                            <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                               <Briefcase size={12}/> Job Title
                            </label>
                            <input 
                              type="text"
                              name="role"
                              value={formData.role}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-sm md:text-base font-poppins outline-none" 
                              placeholder="e.g. Product Manager" 
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 hover:border-white/10">
                        <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                           <Mail size={12}/> Work Email
                        </label>
                        <input 
                          type="email"
                          name="workEmail"
                          value={formData.workEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-sm md:text-base font-poppins outline-none" 
                          placeholder="jane@company.com" 
                        />
                    </div>

                    {/* Company Name & Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                         <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 hover:border-white/10">
                            <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                               <Building2 size={12}/> Company Name
                            </label>
                            <input 
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-sm md:text-base font-poppins outline-none" 
                              placeholder="Acme Inc." 
                            />
                        </div>

                        <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 hover:border-white/10">
                             <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                               <LayoutGrid size={12}/> Company Size
                            </label>
                            <Select onValueChange={handleSelectChange} value={formData.companySize}>
                              <SelectTrigger className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 h-auto focus:ring-0 ring-offset-0 focus:ring-offset-0">
                                <SelectValue placeholder="Select size" className="placeholder:text-white/20 text-sm md:text-base" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#2a2a2a] border-[#393939] text-white z-50">
                                <SelectItem value="1-10">1-10 Employees</SelectItem>
                                <SelectItem value="11-50">11-50 Employees</SelectItem>
                                <SelectItem value="51-200">51-200 Employees</SelectItem>
                                <SelectItem value="201-1000">201-1000 Employees</SelectItem>
                                <SelectItem value="1000+">1000+ Employees</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                    </div>

                     {/* Password & Confirm Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 hover:border-white/10 relative">
                          <label className="flex items-center gap-2 text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">
                            <Lock size={12}/> Password
                          </label>
                          <input 
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-sm md:text-base font-poppins outline-none" 
                            placeholder="Min 8 characters" 
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-[-10%] text-white/40 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
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
                            className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-sm md:text-base font-poppins outline-none" 
                            placeholder="Re-enter password" 
                          />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 my-2 pl-2">
                        <input type="checkbox" id="terms" required className="w-4 h-4 rounded border-white/20 bg-[#1f1f1f] text-[#00F866] focus:ring-[#00F866] accent-[#00F866] cursor-pointer" />
                        <label htmlFor="terms" className="text-white/60 text-xs md:text-sm font-poppins cursor-pointer select-none">
                            I agree to the <a href="#" className="text-white hover:text-[#00F866] underline decoration-1 underline-offset-2">Terms of Service</a> and <a href="#" className="text-white hover:text-[#00F866] underline decoration-1 underline-offset-2">Privacy Policy</a>.
                        </label>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="group relative h-14 w-full bg-white text-black hover:bg-white/90 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg shadow-white/5"
                    >
                       <div className="absolute inset-0 bg-[#00F866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                       <span className="relative z-10 flex items-center justify-center gap-2 font-righteous text-lg group-hover:text-black transition-colors duration-300">
                          {isLoading ? "Creating Account..." : "Create Account"}
                          {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                       </span>
                    </Button>

                 </form>

                 <div className="mt-8 text-center">
                    <p className="text-white/60 text-sm font-poppins">
                        Already have an account? <Link href="#" className="text-[#00F866] hover:text-white font-medium transition-colors">Log In</Link>
                    </p>
                 </div>

              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
