
"use client";
import React, { useState, useMemo } from "react";
import { 
  Smartphone, 
  Monitor, 
  Zap, 
  Globe, 
  CheckCircle2, 
  Download,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

// --- Types & Constants ---

type Platform = "web" | "ios" | "android" | "desktop";
type Complexity = "mvp" | "standard" | "polished" | "enterprise";

const HOURLY_RATE = 80; // Base hourly rate for calculation

const PLATFORMS = [
  { id: "web", label: "Web App", icon: <Globe className="w-6 h-6" />, baseHours: 120 },
  { id: "ios", label: "iOS App", icon: <Smartphone className="w-6 h-6" />, baseHours: 140 },
  { id: "android", label: "Android App", icon: <Smartphone className="w-6 h-6" />, baseHours: 140 },
  { id: "desktop", label: "Desktop/SaaS", icon: <Monitor className="w-6 h-6" />, baseHours: 160 },
];

const COMPLEXITY_LEVELS = [
  { id: "mvp", label: "MVP / Prototype", multiplier: 1.0, desc: "Essential features only. Fast to market." },
  { id: "standard", label: "Standard", multiplier: 1.5, desc: "Robust UI/UX, standard integrations." },
  { id: "polished", label: "High Polish", multiplier: 2.2, desc: "Advanced animations, custom interactions." },
  { id: "enterprise", label: "Enterprise", multiplier: 3.5, desc: "Bank-grade security, scalability, microservices." },
];

const FEATURES = [
  { id: "auth", label: "Auth & User Profiles", hours: 40, icon: <UsersIcon /> },
  { id: "payments", label: "Payment Processing", hours: 60, icon: <CreditCardIcon /> },
  { id: "cms", label: "Admin / CMS Panel", hours: 80, icon: <LayoutIcon /> },
  { id: "chat", label: "Real-time Chat", hours: 50, icon: <MessageIcon /> },
  { id: "ai", label: "AI / LLM Integration", hours: 100, icon: <BrainIcon /> },
  { id: "search", label: "Advanced Search", hours: 30, icon: <SearchIcon /> },
  { id: "analytics", label: "Analytics Dashboard", hours: 45, icon: <ChartIcon /> },
  { id: "api", label: "3rd Party API Integration", hours: 35, icon: <PlugIcon /> },
  { id: "multi-lang", label: "Multi-language Support", hours: 25, icon: <GlobeIcon /> },
  { id: "offline", label: "Offline Mode", hours: 60, icon: <WifiOffIcon /> },
];

// Simple Icons for the features array to keep code clean
function UsersIcon() { return <UsersPath /> }
function CreditCardIcon() { return <CardPath /> }
function LayoutIcon() { return <LayoutPath /> }
function MessageIcon() { return <MessagePath /> }
function BrainIcon() { return <BrainPath /> }
function SearchIcon() { return <SearchPath /> }
function ChartIcon() { return <ChartPath /> }
function PlugIcon() { return <PlugPath /> }
function GlobeIcon() { return <GlobePath /> }
function WifiOffIcon() { return <WifiOffPath /> }

// SVG Paths helpers
const UsersPath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CardPath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const LayoutPath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>;
const MessagePath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const BrainPath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16a4 4 0 0 1-4-4c0-2 1-3 3-4"/><path d="M12 16a4 4 0 0 0 4-4c0-2-1-3-3-4"/><path d="M12 8a4 4 0 0 1-4-4"/><path d="M12 8a4 4 0 0 0 4-4"/><path d="M9.5 16A6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3c2 0 3.5 1 5 2.5"/><path d="M14.5 16a6.5 6.5 0 0 0 6.5-6.5A6.5 6.5 0 0 0 14.5 3c-2 0-3.5 1-5 2.5"/></svg>;
const SearchPath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const ChartPath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
const PlugPath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>;
const GlobePath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const WifiOffPath = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M8.5 8.5A6 6 0 0 1 12 8c.8 0 1.6.2 2.3.5"/><path d="M5 5.5A10 10 0 0 1 12 4c2 0 3.9.6 5.6 1.7"/><path d="M12 16a2 2 0 0 1-1.3-.5"/><path d="M1.4 1.4"/></svg>;

export const DetailedCalculator = (): React.JSX.Element => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["web"]);
  const [complexity, setComplexity] = useState<Complexity>("standard");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [screenCount, setScreenCount] = useState<number>(5);
  const [rushDelivery, setRushDelivery] = useState(false);

  // --- Calculations ---

  const calculatedValues = useMemo(() => {
    // 1. Platform Base Cost
    let totalHours = 0;
    selectedPlatforms.forEach(pId => {
      const p = PLATFORMS.find(item => item.id === pId);
      if (p) totalHours += p.baseHours;
    });

    // 2. Feature Cost
    selectedFeatures.forEach(fId => {
      const f = FEATURES.find(item => item.id === fId);
      if (f) totalHours += f.hours;
    });

    // 3. Screen Complexity (Assume 8 hours per screen design + dev)
    totalHours += (screenCount * 8);

    // 4. Complexity Multiplier
    const complexityMultiplier = COMPLEXITY_LEVELS.find(c => c.id === complexity)?.multiplier || 1;
    let finalHours = totalHours * complexityMultiplier;

    // 5. Rush Delivery (+25%)
    if (rushDelivery) {
      finalHours = finalHours * 1.25;
    }

    const estimatedCost = Math.round(finalHours * HOURLY_RATE);
    
    // Estimated Duration (Assume 2 devs working 30h/week effective = 60h/week velocity)
    const weeks = Math.max(2, Math.ceil(finalHours / 60));

    return { totalHours: Math.round(finalHours), estimatedCost, weeks };
  }, [selectedPlatforms, complexity, selectedFeatures, screenCount, rushDelivery]);

  // --- Handlers ---

  const togglePlatform = (id: Platform) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(prev => prev.filter(p => p !== id));
      }
    } else {
      setSelectedPlatforms(prev => [...prev, id]);
    }
  };

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(prev => prev.filter(f => f !== id));
    } else {
      setSelectedFeatures(prev => [...prev, id]);
    }
  };

  const vectorCalc = (
    <svg
      width="391"
      height="103"
      viewBox="0 0 391 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto pointer-events-none select-none z-0"
    >
      <path
        opacity="0.5"
        d="M12.2285 70.7687L304.052 12.317C306.476 11.8315 307.452 15.3116 305.129 16.1573L111.629 86.6134C109.341 87.4466 110.247 90.8715 112.648 90.4645L378.229 45.4478"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <section className="w-full bg-[#1f1f1f] min-h-screen relative overflow-hidden py-12 md:py-16 px-4 md:px-10">
      
       {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#00F866] opacity-[0.04] blur-[150px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#00885A] opacity-[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
            <h1 className="font-righteous font-normal text-4xl md:text-6xl lg:text-[72px] text-white leading-[1.1]">
                Project Cost <br className="hidden md:block"/>
                <span className="relative inline-block text-[#00F866]">
                  <span className="relative z-10">Estimator</span>
                  {vectorCalc}
                </span>
            </h1>
            <p className="font-poppins text-[#d5d5d5] text-lg max-w-2xl leading-relaxed">
                Configure your project requirements below to receive a detailed breakdown of estimated time and costs.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Inputs (8 Cols) - Structured as Bento Grid */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* 1. Platforms (Full Width Tile) */}
                <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Badge className="bg-[#00F866]/10 text-[#00F866] hover:bg-[#00F866]/20 border-0">Step 1</Badge>
                        <h2 className="font-righteous text-2xl text-white">Target Platforms</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {PLATFORMS.map((platform) => {
                            const isSelected = selectedPlatforms.includes(platform.id as Platform);
                            return (
                                <div 
                                    key={platform.id}
                                    onClick={() => togglePlatform(platform.id as Platform)}
                                    className={`
                                        relative cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 flex flex-col items-center gap-3 text-center group h-full justify-center
                                        ${isSelected 
                                            ? "bg-[#00F866]/10 border-[#00F866]" 
                                            : "bg-[#1f1f1f] border-white/5 hover:border-white/20"}
                                    `}
                                >
                                    <div className={`
                                        p-3 rounded-xl transition-colors
                                        ${isSelected ? "bg-[#00F866] text-black" : "bg-[#2a2a2a] text-white/50 group-hover:text-white"}
                                    `}>
                                        {platform.icon}
                                    </div>
                                    <span className={`font-righteous text-sm ${isSelected ? "text-white" : "text-white/60"}`}>
                                        {platform.label}
                                    </span>
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 text-[#00F866]">
                                            <CheckCircle2 size={16} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 2. Middle Row: Complexity & Size (Equal Height Tiles) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Design Maturity */}
                    <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col h-full">
                         <div className="flex items-center gap-3 mb-6">
                            <Badge className="bg-[#00F866]/10 text-[#00F866] hover:bg-[#00F866]/20 border-0">Step 2</Badge>
                            <h2 className="font-righteous text-2xl text-white">Design Polish</h2>
                        </div>
                        
                        <div className="flex flex-col gap-3 flex-grow">
                            {COMPLEXITY_LEVELS.map((lvl) => (
                                <div 
                                    key={lvl.id}
                                    onClick={() => setComplexity(lvl.id as Complexity)}
                                    className={`
                                        flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all duration-200
                                        ${complexity === lvl.id 
                                            ? "bg-[#00F866]/5 border-[#00F866]/50" 
                                            : "bg-[#1f1f1f] border-white/5 hover:border-white/20"}
                                    `}
                                >
                                    <div>
                                        <p className={`font-righteous text-base ${complexity === lvl.id ? "text-[#00F866]" : "text-white"}`}>{lvl.label}</p>
                                        <p className="font-poppins text-xs text-white/50">{lvl.desc}</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${complexity === lvl.id ? "border-[#00F866]" : "border-white/20"}`}>
                                        {complexity === lvl.id && <div className="w-2.5 h-2.5 rounded-full bg-[#00F866]" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scale Slider */}
                    <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <Badge className="bg-[#00F866]/10 text-[#00F866] hover:bg-[#00F866]/20 border-0">Step 3</Badge>
                            <h2 className="font-righteous text-2xl text-white">Scale</h2>
                        </div>

                        <div className="flex-grow flex flex-col justify-center gap-8">
                             <div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-poppins text-white/80">Number of Main Screens</span>
                                    <span className="font-righteous text-[#00F866] text-2xl">{screenCount}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="50" 
                                    step="1"
                                    value={screenCount}
                                    onChange={(e) => setScreenCount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer accent-[#00F866]"
                                />
                                <div className="flex justify-between mt-2 text-xs text-white/30 font-poppins">
                                    <span>1 Screen</span>
                                    <span>50+ Screens</span>
                                </div>
                             </div>

                             <div 
                                onClick={() => setRushDelivery(!rushDelivery)}
                                className={`
                                   mt-auto p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all duration-300
                                   ${rushDelivery ? "bg-[#eab308]/10 border-[#eab308]" : "bg-[#1f1f1f] border-white/5 hover:border-white/20"}
                                `}
                             >
                                 <div className={`p-2 rounded-lg flex-shrink-0 ${rushDelivery ? "bg-[#eab308] text-black" : "bg-[#2a2a2a] text-white/50"}`}>
                                     <Zap size={20} />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                     <h4 className={`font-righteous truncate ${rushDelivery ? "text-[#eab308]" : "text-white"}`}>Rush Delivery</h4>
                                     <p className="text-xs text-white/50 truncate">Prioritize timeline (adds 25% cost)</p>
                                 </div>
                                 <div className={`w-10 h-6 rounded-full relative transition-colors flex-shrink-0 ${rushDelivery ? "bg-[#eab308]" : "bg-[#2a2a2a]"}`}>
                                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${rushDelivery ? "left-5" : "left-1"}`} />
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 3. Features (Full Width Tile) */}
                <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F866] opacity-[0.03] rounded-bl-full pointer-events-none" />
                     
                     <div className="flex items-center gap-3 mb-8 relative z-10">
                        <Badge className="bg-[#00F866]/10 text-[#00F866] hover:bg-[#00F866]/20 border-0">Step 4</Badge>
                        <h2 className="font-righteous text-2xl text-white">Core Features</h2>
                        <span className="text-white/40 text-sm font-poppins ml-auto hidden sm:inline-block">Select all that apply</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                        {FEATURES.map((feature) => {
                            const isSelected = selectedFeatures.includes(feature.id);
                            return (
                                <div
                                    key={feature.id}
                                    onClick={() => toggleFeature(feature.id)}
                                    className={`
                                        flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition-all duration-200 select-none
                                        ${isSelected 
                                            ? "bg-[#00F866]/10 border-[#00F866]" 
                                            : "bg-[#1f1f1f] border-white/5 hover:border-white/20"}
                                    `}
                                >
                                    <div className={`p-2 rounded-lg transition-colors flex-shrink-0 ${isSelected ? "text-[#00F866]" : "text-white/40"}`}>
                                        {feature.icon}
                                    </div>
                                    <span className={`font-poppins font-medium text-sm ${isSelected ? "text-white" : "text-white/70"}`}>
                                        {feature.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Sticky Receipt (4 Cols) */}
            <div className="lg:col-span-4 relative h-full">
                <div className="sticky top-24 space-y-6">
                    
                    {/* Receipt Card */}
                    <Card className="bg-[#242424] border-white/5 shadow-2xl overflow-hidden rounded-3xl flex flex-col">
                        {/* Receipt Header */}
                        <div className="bg-[#1f1f1f] p-6 border-b border-white/5">
                            <h3 className="font-righteous text-xl text-white mb-1 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#00F866]" />
                                Estimated Quote
                            </h3>
                            <p className="font-poppins text-white/40 text-xs">Based on selected parameters</p>
                        </div>

                        {/* Line Items */}
                        <div className="p-6 flex flex-col gap-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#393939]">
                            {/* Platforms Line Item */}
                            <div className="flex justify-between items-start pb-4 border-b border-white/5">
                                <div>
                                    <p className="font-poppins text-white font-medium text-sm">Platforms</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedPlatforms.map(p => (
                                            <span key={p} className="text-[10px] uppercase bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
                                                {PLATFORMS.find(i => i.id === p)?.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Complexity Line Item */}
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="font-poppins text-white/70 text-sm">Design Level</span>
                                <Badge variant="outline" className="text-[#00F866] border-[#00F866]/30 capitalize">
                                    {COMPLEXITY_LEVELS.find(c => c.id === complexity)?.label}
                                </Badge>
                            </div>

                             {/* Scale Line Item */}
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="font-poppins text-white/70 text-sm">Screen Count</span>
                                <span className="font-mono text-white text-sm">{screenCount}x</span>
                            </div>

                            {/* Features Summary */}
                            {selectedFeatures.length > 0 && (
                                <div className="pb-4 border-b border-white/5">
                                    <p className="font-poppins text-white/70 text-sm mb-2">Features ({selectedFeatures.length})</p>
                                    <div className="flex flex-col gap-1">
                                        {selectedFeatures.map(fId => (
                                            <div key={fId} className="flex justify-between text-xs text-white/50">
                                                <span>{FEATURES.find(f => f.id === fId)?.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                             {/* Rush Fee */}
                             {rushDelivery && (
                                <div className="flex justify-between items-center pb-4 border-b border-white/5 text-[#eab308]">
                                    <span className="font-poppins font-medium text-sm flex items-center gap-2"><Zap size={14}/> Rush Fee</span>
                                    <span className="font-mono text-sm">+25%</span>
                                </div>
                             )}

                        </div>

                        {/* Total Footer */}
                        <div className="bg-[#00F866] p-6 text-black mt-auto">
                            <div className="flex justify-between items-end mb-1">
                                <span className="font-righteous text-lg opacity-80">Total Est.</span>
                                <span className="font-righteous text-3xl">
                                    ${calculatedValues.estimatedCost.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-black/60 text-sm font-poppins font-medium">
                                <span>Timeline</span>
                                <span>~{calculatedValues.weeks} Weeks</span>
                            </div>
                        </div>
                    </Card>

                    {/* CTAs */}
                    <div className="flex flex-col gap-3">
                         <Button className="h-14 bg-white text-black hover:bg-[#e6e6e6] font-righteous text-lg w-full rounded-xl transition-colors shadow-lg shadow-white/5">
                            Book Consultation <ArrowRight className="ml-2 w-5 h-5"/>
                         </Button>
                         
                         {/* Improved Download Quote Button */}
                         <Button 
                             variant="outline"
                             className="group relative h-14 w-full overflow-hidden rounded-xl bg-[#1f1f1f] border border-[#00F866]/30 text-[#00F866] font-righteous text-lg hover:border-[#00F866] transition-all duration-300 shadow-[0_0_20px_rgba(0,248,102,0.05)] hover:shadow-[0_0_30px_rgba(0,248,102,0.2)]"
                         >
                             <div className="absolute inset-0 bg-[#00F866] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                             <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
                                 <Download className="w-5 h-5 group-hover:animate-bounce" />
                                 <span>Download Quote</span>
                             </div>
                         </Button>
                    </div>
                    
                    <p className="text-center text-white/30 text-xs px-4">
                        *This is an automated estimation. Final pricing may vary based on specific requirements and discovery phase.
                    </p>

                </div>
            </div>

        </div>

      </div>
    </section>
  );
};
