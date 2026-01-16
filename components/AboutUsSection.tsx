
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Target, ShieldCheck, Rocket, Globe2, Clock, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const AboutUsSection = (): React.JSX.Element => {
  // Vector decoration for title
  const vectorAbout = (
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

  const stats = [
    { label: "Years Experience", value: "10+", icon: <Clock className="w-6 h-6 text-[#00F866]" /> },
    { label: "Global Projects", value: "250+", icon: <Globe2 className="w-6 h-6 text-[#00F866]" /> },
    { label: "Team Experts", value: "85", icon: <Users className="w-6 h-6 text-[#00F866]" /> },
    { label: "Client Retention", value: "98%", icon: <ShieldCheck className="w-6 h-6 text-[#00F866]" /> },
  ];

  const values = [
    {
      title: "Innovation First",
      desc: "We don't just follow trends; we set them. Our labs are constantly exploring AI, Blockchain, and IoT frontiers.",
      icon: <Rocket className="w-8 h-8 text-[#00F866]" />,
    },
    {
      title: "Client-Centric",
      desc: "Your success is our metric. We build partnerships, not just software, ensuring total alignment with your goals.",
      icon: <Target className="w-8 h-8 text-[#00F866]" />,
    },
    {
      title: "Transparent Process",
      desc: "No black boxes. From code to costs, you have complete visibility into our workflow and decision making.",
      icon: <ShieldCheck className="w-8 h-8 text-[#00F866]" />,
    },
  ];

  const founders = [
    {
      name: "Alex Sterling",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      bio: "Former systems architect at TechGiant. Alex believes in building sustainable code that scales with human ambition.",
      socials: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      bio: "AI researcher turned entrepreneur. Sarah leads our R&D division, constantly pushing the boundaries of what's possible.",
      socials: { linkedin: "#", twitter: "#" }
    }
  ];

  const team = [
    { name: "David Kim", role: "Lead Engineer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
    { name: "Elena Rodriguez", role: "Product Manager", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" },
    { name: "Marcus Johnson", role: "UX Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
    { name: "Priya Patel", role: "AI Specialist", image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?q=80&w=800&auto=format&fit=crop" },
  ];

  const timeline = [
    { year: "2018", title: "Inception", desc: "Qodet founded in a small garage with a vision to simplify enterprise software." },
    { year: "2019", title: "First Enterprise Win", desc: "Secured our first Fortune 500 client, delivering a complete logistics overhaul." },
    { year: "2021", title: "Global Expansion", desc: "Opened offices in London and Singapore to serve our growing international base." },
    { year: "2023", title: "AI Lab Launch", desc: "Established our dedicated AI research division to integrate LLMs into core products." },
    { year: "2024", title: "The Next Step", desc: "Launching our proprietary SaaS ecosystem for automated workflow management." },
  ];

  return (
    <section className="w-full bg-[#1f1f1f] min-h-screen relative overflow-hidden">
        
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00F866] opacity-[0.03] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00885A] opacity-[0.05] blur-[120px] rounded-full" />
          
           {/* Random squares for consistency */}
          <div className="absolute top-[15%] left-[10%] w-24 h-24 bg-[#00F866] opacity-[0.05] blur-[40px] rotate-12 rounded-xl" />
          <div className="absolute top-[40%] right-[15%] w-32 h-32 bg-[#00885A] opacity-[0.08] blur-[50px] -rotate-12 rounded-xl" />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 md:px-10 py-16 md:py-24 relative z-10 flex flex-col gap-32">
        
        {/* --- Header / Intro --- */}
        <div className="flex flex-col items-center text-center gap-8">
            <Badge variant="outline" className="border-[#00F866]/30 text-[#00F866] bg-[#00F866]/5 px-4 py-1 text-sm tracking-wider uppercase">
                Who We Are
            </Badge>
            <h1 className="font-righteous font-normal text-5xl md:text-7xl lg:text-[90px] text-white leading-[1.1]">
                Innovating for <br className="hidden md:block"/> the 
                <span className="relative inline-block text-[#00F866] ml-4">
                  <span className="relative z-10">Future</span>
                  {vectorAbout}
                </span>
            </h1>
            <p className="font-poppins text-[#d5d5d5] text-lg md:text-2xl max-w-3xl leading-relaxed">
                Qodet is a premier digital transformation agency. We bridge the gap between complex technology and tangible business success through AI-driven development.
            </p>
        </div>

        {/* --- Stats Strip --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
                <Card key={idx} className="bg-[#2a2a2a]/50 backdrop-blur-sm border-white/5 p-6 flex flex-col items-center justify-center gap-3 hover:border-[#00F866]/30 transition-all duration-300 group">
                    <div className="p-3 rounded-xl bg-[#1f1f1f] border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                    </div>
                    <div className="text-center">
                        <h3 className="font-righteous text-3xl md:text-4xl text-white mb-1">{stat.value}</h3>
                        <p className="font-poppins text-sm text-white/60 font-medium uppercase tracking-wide">{stat.label}</p>
                    </div>
                </Card>
            ))}
        </div>

        {/* --- Mission Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
                <div className="absolute inset-0 bg-[#00F866] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden border border-white/10">
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
                        alt="Team Collaboration" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <p className="font-righteous text-2xl text-white leading-tight">
                            "Great software is built by great people."
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <h2 className="font-righteous text-3xl md:text-5xl text-white">
                    Our Mission
                </h2>
                <div className="flex flex-col gap-6 text-[#d5d5d5] font-poppins text-lg leading-relaxed">
                    <p>
                        Founded in 2018, Qodet started with a simple belief: technology should be an enabler, not a barrier. We saw too many businesses struggling with legacy systems and disjointed tools.
                    </p>
                    <p>
                        Our mission is to democratize access to enterprise-grade AI and software solutions. We build platforms that are intuitive, scalable, and inherently secure, allowing our partners to focus on what they do best—growing their business.
                    </p>
                </div>
                <div className="pt-4">
                    <Button className="h-14 px-10 bg-[#00F866] text-black hover:bg-white font-righteous text-lg rounded-xl">
                        Join Our Journey
                    </Button>
                </div>
            </div>
        </div>

        {/* --- Values Grid --- */}
        <div className="flex flex-col gap-12">
            <div className="text-center">
                <h2 className="font-righteous text-3xl md:text-5xl text-white mb-4">Our Core Values</h2>
                <p className="font-poppins text-[#d5d5d5] max-w-2xl mx-auto">The principles that guide every line of code we write.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((item, idx) => (
                    <Card key={idx} className="bg-[#242424] border-white/5 p-8 flex flex-col gap-6 hover:bg-[#2a2a2a] transition-colors duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F866] opacity-[0.02] rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
                        
                        <div className="w-16 h-16 rounded-2xl bg-[#1f1f1f] border border-white/10 flex items-center justify-center group-hover:border-[#00F866]/50 transition-colors">
                            {item.icon}
                        </div>
                        
                        <div>
                            <h3 className="font-righteous text-2xl text-white mb-3 group-hover:text-[#00F866] transition-colors">{item.title}</h3>
                            <p className="font-poppins text-[#d5d5d5] leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        {/* --- Meet Our Founders --- */}
        <div className="flex flex-col gap-16">
           <div className="text-center">
                <h2 className="font-righteous text-3xl md:text-5xl text-white mb-4">Meet Our Founders</h2>
                <p className="font-poppins text-[#d5d5d5] max-w-2xl mx-auto">The visionaries leading the charge.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
               {founders.map((founder, idx) => (
                 <div key={idx} className="group relative">
                    <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#2a2a2a]">
                        <img 
                          src={founder.image} 
                          alt={founder.name}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-[#1f1f1f]/40 to-transparent opacity-90" />
                        
                        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-3">
                           <div>
                              <h3 className="font-righteous text-3xl text-white mb-1">{founder.name}</h3>
                              <p className="font-poppins text-[#00F866] font-medium tracking-wide">{founder.role}</p>
                           </div>
                           <p className="font-poppins text-white/80 text-sm md:text-base leading-relaxed max-w-md">
                              {founder.bio}
                           </p>
                           <div className="flex gap-4 mt-2">
                              <a href={founder.socials.linkedin} className="text-white/60 hover:text-white transition-colors"><Linkedin size={20}/></a>
                              <a href={founder.socials.twitter} className="text-white/60 hover:text-white transition-colors"><Twitter size={20}/></a>
                           </div>
                        </div>
                    </div>
                 </div>
               ))}
            </div>
        </div>

        {/* --- Our Team Grid --- */}
        <div className="flex flex-col gap-12">
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                   <h2 className="font-righteous text-3xl md:text-4xl text-white mb-2">The Core Team</h2>
                   <p className="font-poppins text-[#d5d5d5]">Experts in every stack.</p>
                </div>
                <Button variant="link" className="text-[#00F866] hover:text-white hidden md:flex gap-2">
                   View All Members <ArrowRight size={16}/>
                </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {team.map((member, idx) => (
                  <div key={idx} className="group cursor-pointer">
                      <div className="h-[320px] w-full rounded-xl overflow-hidden mb-4 relative bg-[#2a2a2a] border border-white/5">
                          <img 
                             src={member.image} 
                             alt={member.name} 
                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                          />
                          <div className="absolute inset-0 bg-[#00F866] opacity-0 group-hover:opacity-10 transition-opacity duration-300 mix-blend-overlay" />
                      </div>
                      <h3 className="font-righteous text-xl text-white group-hover:text-[#00F866] transition-colors">{member.name}</h3>
                      <p className="font-poppins text-sm text-white/50">{member.role}</p>
                  </div>
               ))}
            </div>
            
             <Button variant="link" className="text-[#00F866] hover:text-white md:hidden gap-2 self-start">
                   View All Members <ArrowRight size={16}/>
            </Button>
        </div>

        {/* --- Timeline / Journey --- */}
        <div className="flex flex-col gap-16 relative">
             <div className="text-center">
                <Badge variant="outline" className="mb-4 border-[#00F866]/30 text-[#00F866] bg-[#00F866]/5 px-3 py-0.5 text-xs tracking-wider uppercase">
                    History
                </Badge>
                <h2 className="font-righteous text-3xl md:text-5xl text-white mb-4">Our Journey</h2>
                <p className="font-poppins text-[#d5d5d5] max-w-2xl mx-auto">From a garage startup to a global agency.</p>
            </div>

            <div className="relative">
                {/* Center Line (Desktop) / Left Line (Mobile/Tablet) */}
                <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00F866]/30 to-transparent" />
                
                <div className="flex flex-col gap-12 lg:gap-24">
                    {timeline.map((item, idx) => (
                        <div key={idx} className={`flex flex-col lg:flex-row items-start ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''} gap-8 lg:gap-0 relative`}>
                            
                            {/* Dot on Line */}
                            <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1f1f1f] border-2 border-[#00F866] rounded-full z-10 mt-1.5 lg:mt-2 shadow-[0_0_10px_rgba(0,248,102,0.5)]" />

                            {/* Content Side */}
                            <div className={`w-full lg:w-1/2 pl-12 lg:pl-0 ${idx % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}>
                                <span className="font-righteous text-[#00F866] text-4xl lg:text-6xl opacity-20 absolute -top-4 lg:-top-8 select-none z-0">
                                   {item.year}
                                </span>
                                <div className="relative z-10">
                                    <div className="inline-block px-3 py-1 rounded bg-[#00F866]/10 text-[#00F866] text-sm font-bold mb-2 lg:hidden">
                                        {item.year}
                                    </div>
                                    <h3 className="font-righteous text-2xl text-white mb-2">{item.title}</h3>
                                    <p className="font-poppins text-[#d5d5d5] leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Empty Side for Desktop balance */}
                            <div className="hidden lg:block w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
