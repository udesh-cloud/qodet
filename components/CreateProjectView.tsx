
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Rocket, 
  Briefcase, 
  Globe, 
  Smartphone, 
  Cpu, 
  Layers, 
  Calendar, 
  DollarSign 
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Step = 1 | 2 | 3 | 4;

export const CreateProjectView = ({ onBack, onComplete }: { onBack: () => void, onComplete: () => void }): React.JSX.Element => {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: "",
    platforms: [] as string[],
    startDate: "",
    budget: ""
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4) as Step);
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1) as Step);

  const togglePlatform = (id: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(id) 
        ? prev.platforms.filter(p => p !== id)
        : [...prev.platforms, id]
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(); // Navigate back to projects or show success
    }, 2000);
  };

  const platforms = [
    { id: "web", label: "Web App", icon: <Globe size={24} /> },
    { id: "mobile", label: "Mobile App", icon: <Smartphone size={24} /> },
    { id: "ai", label: "AI Model", icon: <Cpu size={24} /> },
    { id: "infra", label: "Infrastructure", icon: <Layers size={24} /> },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-4xl mx-auto w-full pt-4">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full text-white/50 hover:text-white">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="font-righteous text-3xl text-white">Start New Project</h1>
          <p className="text-white/50 text-sm font-poppins">Define your vision and we'll help build it.</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-10 relative">
        <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-[#00F866] rounded-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs font-medium text-white/40 uppercase tracking-wider">
          <span className={step >= 1 ? "text-[#00F866]" : ""}>01 Basics</span>
          <span className={step >= 2 ? "text-[#00F866]" : ""}>02 Scope</span>
          <span className={step >= 3 ? "text-[#00F866]" : ""}>03 Details</span>
          <span className={step >= 4 ? "text-[#00F866]" : ""}>04 Review</span>
        </div>
      </div>

      {/* Wizard Content */}
      <Card className="bg-[#242424] border border-white/5 p-8 rounded-3xl min-h-[400px] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F866] opacity-[0.02] rounded-bl-[100px] pointer-events-none" />

        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: BASICS */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-righteous text-2xl text-white mb-6">The Essentials</h2>
                
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs text-white/60 font-bold uppercase tracking-wider mb-2 block">Project Name</label>
                    <input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00F866] outline-none transition-colors"
                      placeholder="e.g. Neo-Bank Dashboard"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/60 font-bold uppercase tracking-wider mb-2 block">Industry</label>
                    <Select value={formData.industry} onValueChange={(val) => setFormData({...formData, industry: val})}>
                      <SelectTrigger className="w-full bg-[#1f1f1f] border-white/10 text-white h-12 rounded-xl">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#242424] border-white/10 text-white">
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs text-white/60 font-bold uppercase tracking-wider mb-2 block">Brief Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00F866] outline-none transition-colors min-h-[100px] resize-none"
                      placeholder="What are we building?"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: SCOPE */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-righteous text-2xl text-white mb-6">Target Platforms</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map(p => {
                    const isSelected = formData.platforms.includes(p.id);
                    return (
                      <div 
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        className={`
                          cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group
                          ${isSelected 
                            ? 'bg-[#00F866]/10 border-[#00F866]' 
                            : 'bg-[#1f1f1f] border-white/5 hover:border-white/20'}
                        `}
                      >
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                          ${isSelected ? 'bg-[#00F866] text-black' : 'bg-[#2a2a2a] text-white/40 group-hover:text-white'}
                        `}>
                          {p.icon}
                        </div>
                        <div>
                          <h3 className={`font-righteous text-lg ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{p.label}</h3>
                          <p className="text-xs text-white/40">Select to include</p>
                        </div>
                        {isSelected && <CheckCircle2 className="ml-auto text-[#00F866]" />}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: DETAILS */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-righteous text-2xl text-white mb-6">Parameters</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-6 text-white/80">
                      <Calendar className="text-[#00F866]" size={24} />
                      <h3 className="font-bold">Target Start Date</h3>
                    </div>
                    <input 
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00F866] outline-none"
                    />
                  </div>

                  <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-6 text-white/80">
                      <DollarSign className="text-[#00F866]" size={24} />
                      <h3 className="font-bold">Estimated Budget</h3>
                    </div>
                    <Select value={formData.budget} onValueChange={(val) => setFormData({...formData, budget: val})}>
                      <SelectTrigger className="w-full bg-[#2a2a2a] border-white/10 text-white h-12 rounded-xl">
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#242424] border-white/10 text-white">
                        <SelectItem value="10-25k">$10k - $25k</SelectItem>
                        <SelectItem value="25-50k">$25k - $50k</SelectItem>
                        <SelectItem value="50-100k">$50k - $100k</SelectItem>
                        <SelectItem value="100k+">$100k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW */}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00F866]/20 flex items-center justify-center text-[#00F866]">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <h2 className="font-righteous text-2xl text-white">Ready to Launch?</h2>
                    <p className="text-white/50 text-sm">Review your project brief before submission.</p>
                  </div>
                </div>

                <div className="bg-[#1f1f1f] rounded-2xl border border-white/10 p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold">Project Name</p>
                      <p className="text-lg text-white font-medium">{formData.name || "Untitled Project"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold">Industry</p>
                      <p className="text-white capitalize">{formData.industry || "Not selected"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-white/40 uppercase font-bold mb-2">Scope</p>
                    <div className="flex gap-2">
                      {formData.platforms.length > 0 ? (
                        formData.platforms.map(p => (
                          <Badge key={p} className="bg-[#00F866]/10 text-[#00F866] border-0 capitalize">{p}</Badge>
                        ))
                      ) : ( <span className="text-white/30 text-sm italic">No platforms selected</span> )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-white/40 uppercase font-bold mb-1">Description</p>
                    <p className="text-white/80 text-sm leading-relaxed">{formData.description || "No description provided."}</p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
          {step > 1 ? (
            <Button variant="ghost" onClick={handleBack} className="text-white/60 hover:text-white">
              Back
            </Button>
          ) : (
            <div /> 
          )}

          {step < 4 ? (
            <Button 
              onClick={handleNext} 
              disabled={step === 1 && !formData.name}
              className="bg-white text-black hover:bg-white/90 font-righteous px-8 rounded-xl h-12"
            >
              Continue <ArrowRight size={18} className="ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous px-8 rounded-xl h-12 min-w-[160px]"
            >
              {isSubmitting ? "Initiating..." : "Create Project"}
            </Button>
          )}
        </div>

      </Card>
    </div>
  );
};
