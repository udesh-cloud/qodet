
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Instagram, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const ContactUsSection = (): React.JSX.Element => {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // alert("Message Sent!"); // In real app, show toast or success message
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const vectorContact = (
    <svg
      width="219"
      height="81"
      viewBox="0 0 219 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto pointer-events-none select-none z-0"
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

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-white" />,
      title: "Email",
      value: "info@qodet.com",
      link: "mailto:info@qodet.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-white" />,
      title: "Phone",
      value: "+91 9972480689",
      link: "tel:+919972480689",
    },
    {
      icon: <MapPin className="w-5 h-5 text-white" />,
      title: "Office",
      value: "43, WeWork Galaxy, Residency Road, Ashok Nagar, Bangalore - 560025",
      link: "https://www.google.com/maps/search/?api=1&query=43%2C+WeWork+Galaxy%2C+Residency+Road%2C+Ashok+Nagar%2C+Bangalore+560025",
    },
  ];

  return (
    <section id="contact" className="w-full bg-[#1f1f1f] min-h-screen relative overflow-hidden py-16 md:py-24">
      
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#00F866] opacity-[0.03] blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#00885A] opacity-[0.05] blur-[100px] rounded-full" />
          <div className="absolute top-[40%] left-[20%] w-32 h-32 bg-[#00F866] opacity-[0.04] blur-[40px] rotate-45" />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-12 md:mb-20">
             <Badge 
                variant="outline" 
                className="px-5 py-2 rounded-full border border-[#00F866]/20 bg-[#00F866]/5 hover:bg-[#00F866]/10 hover:border-[#00F866]/40 transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md group/badge"
            >
                <Sparkles className="w-4 h-4 text-[#00F866] group-hover/badge:rotate-12 transition-transform duration-300" />
                <span className="font-righteous text-[#00F866] text-sm tracking-widest uppercase">
                    Contact Us
                </span>
            </Badge>
            <h1 className="font-righteous font-normal text-[36px] sm:text-4xl md:text-6xl lg:text-[80px] text-white leading-[1.1]">
                Let’s Build <br className="hidden md:block"/> Something 
                <span className="relative inline-block text-[#00F866] ml-4 whitespace-nowrap">
                  <span className="relative z-10">Great</span>
                  {vectorContact}
                </span>
            </h1>
            <p className="font-poppins text-[#d5d5d5] text-lg max-w-2xl leading-relaxed">
                Ready to transform your business? Drop us a line and let's start the conversation.
            </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Column (5 Cols) - Contact Details & Map */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 h-full">
                
                {/* 1. Contact Info Tile */}
                <div className="bg-[#242424] border border-white/5 rounded-3xl p-8 flex flex-col gap-6 shadow-xl relative overflow-hidden group">
                     {/* Decorative corner */}
                     <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F866] opacity-[0.03] rounded-bl-full transition-transform group-hover:scale-125 duration-500" />
                     
                     <div>
                        <h3 className="font-righteous text-2xl text-white mb-1">Get in Touch</h3>
                        <p className="font-poppins text-white/50 text-sm">Reach out directly via these channels.</p>
                     </div>

                     <div className="flex flex-col gap-3">
                        {contactInfo.map((item, idx) => (
                            <a 
                                key={idx} 
                                href={item.link}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-[#1f1f1f] border border-white/5 hover:border-[#00F866]/30 transition-all duration-300 group/item"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-white/70 group-hover/item:text-[#00F866] group-hover/item:bg-[#00F866]/10 transition-colors flex-shrink-0">
                                    <div className="w-5 h-5 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">{item.title}</p>
                                    <p className="text-white font-poppins text-sm md:text-base">{item.value}</p>
                                </div>
                                <ArrowRight className="ml-auto w-4 h-4 text-white/20 group-hover/item:text-[#00F866] -translate-x-2 group-hover/item:translate-x-0 transition-all opacity-0 group-hover/item:opacity-100" />
                            </a>
                        ))}
                     </div>

                     {/* Socials Row */}
                     <div className="pt-2 flex gap-3">
                        {[
                          { Icon: Linkedin, url: "https://www.linkedin.com/company/qodet/", label: "LinkedIn" },
                          { Icon: Twitter, url: "https://x.com/qodetx", label: "Twitter" },
                          { Icon: Instagram, url: "https://www.instagram.com/qodet/", label: "Instagram" }
                        ].map((item, idx) => (
                             <a
                                key={idx}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.label}
                                className="flex-1 h-12 rounded-xl bg-[#1f1f1f] border border-white/5 flex items-center justify-center text-white/40 hover:text-[#00F866] hover:bg-[#00F866]/5 hover:border-[#00F866]/20 cursor-pointer transition-all duration-300"
                             >
                                 <item.Icon size={20} />
                             </a>
                        ))}
                     </div>
                </div>

                {/* 2. Map Tile (Fills remaining height) */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=43%2C+WeWork+Galaxy%2C+Residency+Road%2C+Ashok+Nagar%2C+Bangalore+560025"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Qodet office location on Google Maps"
                  className="bg-[#242424] border border-white/5 rounded-3xl p-2 shadow-xl flex-grow min-h-[250px] relative group overflow-hidden block hover:border-[#00F866]/30 transition-all duration-300 cursor-pointer"
                >
                     <div className="absolute inset-2 rounded-2xl overflow-hidden">
                        {/* Map Image - World map showing India/Bangalore region */}
                        <img 
                          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop" 
                          alt="Qodet Office Location - 43, WeWork Galaxy, Residency Road, Ashok Nagar, Bangalore - 560025"
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                          style={{
                            objectPosition: 'center 45%' // Adjust to show India/Bangalore region more prominently
                          }}
                        />
                        <div className="absolute inset-0 bg-[#00885A]/10 mix-blend-overlay" />
                        
                        {/* Map Marker - Positioned for Bangalore, India location */}
                        {/* Bangalore coordinates: ~12.9716°N, 77.5946°E - positioned in southern India */}
                        <div className="absolute top-[60%] md:top-[66%] left-[69%] md:left-[68%] -translate-x-1/2 -translate-y-1/2 z-20">
                             <div className="relative">
                                <div className="w-4 h-4 bg-[#00F866] rounded-full animate-ping absolute inset-0" />
                                <div className="w-4 h-4 bg-[#00F866] rounded-full border-2 border-black relative z-10" />
                             </div>
                        </div>

                        <div className="absolute bottom-4 left-4 bg-[#1f1f1f]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg">
                            <MapPin size={14} className="text-[#00F866]" />
                            <span className="text-white text-xs font-poppins font-medium">Headquarters</span>
                        </div>
                     </div>
                </a>
            </div>

            {/* Right Column (7 Cols) - Form Tile */}
            <div className="lg:col-span-7 bg-[#242424] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F866] opacity-[0.03] rounded-bl-full pointer-events-none" />
                
                <div className="mb-8 relative z-10">
                    <h2 className="font-righteous text-3xl md:text-4xl text-white mb-2">Send a Message</h2>
                    <p className="font-poppins text-white/50">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow relative z-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name - Styled as bento slot */}
                      <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300">
                          <label className="block text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">Your Name</label>
                          <input 
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-base md:text-lg font-poppins outline-none" 
                            placeholder="John Doe" 
                          />
                      </div>
                      
                      {/* Email */}
                       <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300">
                          <label className="block text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">Email Address</label>
                          <input 
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-base md:text-lg font-poppins outline-none" 
                            placeholder="john@example.com" 
                          />
                      </div>
                   </div>

                   {/* Subject */}
                   <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300">
                       <label className="block text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">Subject</label>
                       <input 
                         type="text"
                         name="subject"
                         value={formState.subject}
                         onChange={handleInputChange}
                         className="w-full bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-base md:text-lg font-poppins outline-none" 
                         placeholder="Project Inquiry" 
                       />
                   </div>

                   {/* Message */}
                   <div className="bg-[#1f1f1f] rounded-2xl p-1 border border-white/5 focus-within:border-[#00F866]/50 focus-within:bg-[#1a1a1a] transition-all duration-300 flex-grow flex flex-col min-h-[200px]">
                       <label className="block text-[10px] md:text-xs font-poppins text-[#00F866] px-5 pt-3 uppercase tracking-wider font-bold">Message</label>
                       <textarea 
                         name="message"
                         value={formState.message}
                         onChange={handleInputChange}
                         required
                         className="w-full flex-grow bg-transparent border-none text-white px-5 pb-4 pt-1 focus:ring-0 placeholder:text-white/20 text-base md:text-lg font-poppins outline-none resize-none" 
                         placeholder="Tell us about your project..." 
                       />
                   </div>

                   <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="mt-2 h-16 w-full bg-[#00F866] text-black hover:bg-white font-righteous text-xl rounded-2xl transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-[#00F866]/20"
                    >
                       <span className={`flex items-center gap-2 transition-transform duration-300 ${isSubmitting ? 'translate-y-[-150%]' : 'translate-y-0'}`}>
                          Send Message <Send size={22} />
                       </span>
                       <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isSubmitting ? 'translate-y-0' : 'translate-y-[150%]'}`}>
                          Sending...
                       </span>
                    </Button>
                </form>
            </div>

        </div>

      </div>
    </section>
  );
};
