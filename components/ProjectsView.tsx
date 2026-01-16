
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  Link as LinkIcon, 
  Search, 
  AlertCircle,
  Download,
  ExternalLink,
  Plus,
  Activity,
  Layers,
  Flag,
  Home,
  LayoutGrid,
  ChevronRight,
  Folder,
  CheckCircle2,
  Sparkles,
  Layout
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

// --- Types ---

type ProjectStatus = 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
type ProjectPhase = 'Discovery' | 'Design' | 'Dev' | 'QA' | 'Live' | 'Maintenance' | 'Closed';

interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  completedAt?: string;
}

interface Deliverable {
  id: string;
  name: string;
  type: 'Design' | 'Doc' | 'Build' | 'Link';
  url: string;
  uploadedAt: string;
}

interface ChangeRequest {
  id: string;
  title: string;
  status: 'Submitted' | 'Approved' | 'In Progress' | 'Completed';
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  phase: ProjectPhase;
  progress: number;
  startDate: string;
  estEndDate: string;
  primaryContact: string;
  nextMilestone?: { name: string; date: string };
  lastUpdate: string;
  milestones: Milestone[];
  deliverables: Deliverable[];
  changeRequests: ChangeRequest[];
  keyLinks: { label: string; url: string }[];
}

// --- Mock Data ---

const PROJECTS: Project[] = [
  {
    id: "1",
    name: "FinCore Ledger Scale-up",
    description: "Enterprise ledger scaling with AI integration.",
    status: "On Track",
    phase: "Dev",
    progress: 68,
    startDate: "Sep 01, 2024",
    estEndDate: "Dec 15, 2024",
    primaryContact: "Alex Sterling",
    nextMilestone: { name: "User Acceptance Testing", date: "Oct 24" },
    lastUpdate: "2h ago",
    milestones: [
        { id: "m1", name: "Project Kickoff & Discovery", dueDate: "Sep 05", status: "Completed", completedAt: "Sep 04" },
        { id: "m2", name: "Architecture Diagram Approval", dueDate: "Sep 15", status: "Completed", completedAt: "Sep 14" },
        { id: "m3", name: "Core API Development", dueDate: "Oct 10", status: "In Progress" },
        { id: "m4", name: "User Acceptance Testing", dueDate: "Oct 24", status: "Pending" },
        { id: "m5", name: "Production Deployment", dueDate: "Dec 15", status: "Pending" },
    ],
    deliverables: [
        { id: "d1", name: "System Architecture V2.pdf", type: "Doc", url: "#", uploadedAt: "Sep 14" },
        { id: "d2", name: "Figma High-Fidelity Prototypes", type: "Design", url: "#", uploadedAt: "Sep 20" },
        { id: "d3", name: "Staging Environment Build 0.4", type: "Build", url: "#", uploadedAt: "Oct 05" },
    ],
    changeRequests: [
        { id: "cr1", title: "Add Dark Mode support", status: "Approved", createdAt: "Sep 25" },
        { id: "cr2", title: "Integrate Stripe Connect", status: "Submitted", createdAt: "Oct 12" },
    ],
    keyLinks: [
        { label: "Staging URL", url: "https://staging.fincore.qodet.com" },
        { label: "Figma Design", url: "#" },
        { label: "API Docs", url: "#" },
    ]
  },
  {
    id: "2",
    name: "HealthVantage iOS App",
    description: "Native iOS application for patient monitoring.",
    status: "At Risk",
    phase: "Design",
    progress: 35,
    startDate: "Oct 01, 2024",
    estEndDate: "Jan 30, 2025",
    primaryContact: "Sarah Chen",
    nextMilestone: { name: "Final Design Sign-off", date: "Oct 20" },
    lastUpdate: "1d ago",
    milestones: [
        { id: "m1", name: "Discovery Workshop", dueDate: "Oct 02", status: "Completed", completedAt: "Oct 02" },
        { id: "m2", name: "Wireframes", dueDate: "Oct 10", status: "Completed", completedAt: "Oct 12" },
        { id: "m3", name: "Final Design Sign-off", dueDate: "Oct 20", status: "In Progress" },
        { id: "m4", name: "MVP Development", dueDate: "Dec 15", status: "Pending" },
    ],
    deliverables: [
        { id: "d1", name: "UX Research Report", type: "Doc", url: "#", uploadedAt: "Oct 05" },
    ],
    changeRequests: [],
    keyLinks: [
        { label: "Figma Design", url: "#" },
    ]
  },
  {
    id: "3",
    name: "LogiStream Dashboard",
    description: "Web-based logistics management platform.",
    status: "On Track",
    phase: "QA",
    progress: 90,
    startDate: "Aug 15, 2024",
    estEndDate: "Oct 30, 2024",
    primaryContact: "David Kim",
    nextMilestone: { name: "Go Live", date: "Oct 30" },
    lastUpdate: "5h ago",
    milestones: [
        { id: "m1", name: "Frontend Dev", dueDate: "Sep 30", status: "Completed", completedAt: "Sep 28" },
        { id: "m2", name: "Backend Integration", dueDate: "Oct 10", status: "Completed", completedAt: "Oct 09" },
        { id: "m3", name: "QA & Bug Fixes", dueDate: "Oct 25", status: "In Progress" },
        { id: "m4", name: "Go Live", dueDate: "Oct 30", status: "Pending" },
    ],
    deliverables: [
        { id: "d1", name: "Beta Release 1.0", type: "Build", url: "#", uploadedAt: "Oct 15" },
    ],
    changeRequests: [],
    keyLinks: [
        { label: "Production URL", url: "#" },
        { label: "Jira Board", url: "#" },
    ]
  },
  {
    id: "4",
    name: "Legacy Migration 2023",
    description: "Migration of legacy databases to cloud infrastructure.",
    status: "Completed",
    phase: "Closed",
    progress: 100,
    startDate: "Jan 10, 2023",
    estEndDate: "Jun 30, 2023",
    primaryContact: "Alex Sterling",
    lastUpdate: "Jun 30, 2023",
    milestones: [
        { id: "m1", name: "Complete Migration", dueDate: "Jun 30", status: "Completed", completedAt: "Jun 28" },
    ],
    deliverables: [],
    changeRequests: [],
    keyLinks: []
  }
];

// --- Helpers ---

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case 'On Track': return "text-[#00F866] bg-[#00F866]/10 border-[#00F866]/20";
    case 'At Risk': return "text-[#eab308] bg-[#eab308]/10 border-[#eab308]/20";
    case 'Delayed': return "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20";
    case 'Completed': return "text-white/60 bg-white/10 border-white/10";
    default: return "text-white bg-white/10";
  }
};

const getPhaseColor = (phase: ProjectPhase) => {
    return "text-white/70 bg-white/5 border-white/10";
};

// --- Aesthetic Sub-components ---

const BentoTile = ({ children, className = "", delay = 0 }: { children?: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`bg-[#242424] border border-white/5 rounded-3xl p-6 md:p-8 hover:border-[#00F866]/30 transition-all duration-300 shadow-xl relative overflow-hidden group hover:shadow-[0_0_20px_rgba(0,248,102,0.05)] ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-8 rounded-lg bg-[#00F866]/10 flex items-center justify-center text-[#00F866]">
      <Icon size={16} />
    </div>
    <h3 className="font-righteous text-xl text-white">{title}</h3>
  </div>
);

// --- Empty State Component ---
const EmptyState = ({ type }: { type: 'no-projects' | 'no-active' | 'no-results' }) => {
    const content = {
        'no-projects': {
            icon: Folder,
            title: "Start Your First Project",
            desc: "Your workspace is empty. Create a new project brief to kickstart development.",
            action: "Create Project"
        },
        'no-active': {
            icon: CheckCircle2,
            title: "All Caught Up!",
            desc: "You have no active projects at the moment. Everything is completed or archived.",
            action: "View History"
        },
        'no-results': {
            icon: Search,
            title: "No Projects Found",
            desc: "We couldn't find any projects matching your search criteria.",
            action: "Clear Search"
        }
    }[type];

    const Icon = content.icon;

    return (
        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-[#242424] rounded-full border border-white/5 flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-[#00F866]/5 rounded-full blur-xl" />
                <Icon size={32} className="text-[#00F866] relative z-10" strokeWidth={1.5} />
            </div>
            <h3 className="font-righteous text-2xl text-white mb-2">{content.title}</h3>
            <p className="text-white/40 text-sm font-poppins max-w-sm mb-8">{content.desc}</p>
            {type === 'no-projects' && (
                <Button className="bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous h-12 px-8 rounded-xl shadow-lg shadow-[#00F866]/10">
                    <Plus size={18} className="mr-2" /> {content.action}
                </Button>
            )}
        </div>
    );
};

// --- List View Component ---

const ProjectCard = React.forwardRef<HTMLDivElement, { project: Project; onClick: () => void }>(({ project, onClick }, ref) => (
  <motion.div
    ref={ref}
    layout
    whileHover={{ y: -6, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    className={`
        bg-[#242424] border border-white/5 rounded-3xl p-6 flex flex-col gap-6 cursor-pointer hover:shadow-2xl transition-all duration-300 group relative overflow-hidden
        ${project.status === 'Completed' ? 'opacity-80 hover:opacity-100 hover:border-white/20' : 'hover:border-[#00F866]/40 hover:shadow-[#00F866]/5'}
    `}
    onClick={onClick}
  >
    {/* Tech Accent Corner */}
    {project.status !== 'Completed' && (
        <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M0 0H60V60" stroke="#00F866" strokeWidth="1" fill="none" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"/>
                <path d="M15 15H45V45" stroke="#00F866" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                <rect x="40" y="40" width="5" height="5" fill="#00F866" className="animate-pulse" />
            </svg>
        </div>
    )}
    
    {/* Subtle Gradient Mesh Background */}
    <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] ${project.status === 'Completed' ? 'from-white/5' : 'from-[#00F866]/5'} via-transparent to-transparent opacity-50 pointer-events-none`} />

    <div className="flex justify-between items-start relative z-10">
      <div>
        <h3 className={`font-righteous text-2xl text-white transition-colors ${project.status !== 'Completed' ? 'group-hover:text-[#00F866]' : ''}`}>
            {project.name}
        </h3>
        <p className="text-white/40 text-xs mt-1 font-poppins font-medium">{project.description}</p>
      </div>
      <Badge className={`${getStatusColor(project.status)} border px-3 py-1 font-poppins`}>
        {project.status}
      </Badge>
    </div>

    <div className="space-y-5 relative z-10">
        <div className="flex justify-between items-center text-sm text-white/60 font-poppins">
            <span className="flex items-center gap-2"><Layers size={14} /> Phase</span>
            <Badge variant="outline" className={`${getPhaseColor(project.phase)} border px-3`}>{project.phase}</Badge>
        </div>
        
        <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/40 font-medium">
                <span>Progress</span>
                <span className={`${project.status === 'Completed' ? 'text-white' : 'text-[#00F866]'} font-mono`}>{project.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    className={`h-full rounded-full ${project.status === 'Completed' ? 'bg-white/40' : 'bg-[#00F866] shadow-[0_0_10px_#00F866]'}`}
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
            <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Start Date</p>
                <p className="text-sm text-white font-medium">{project.startDate}</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Est. End</p>
                <p className="text-sm text-white font-medium">{project.estEndDate}</p>
            </div>
        </div>
    </div>

    <div className="flex items-center justify-between mt-auto relative z-10">
        <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full p-[1px] ${project.status === 'Completed' ? 'bg-white/20' : 'bg-gradient-to-br from-[#00F866] to-[#00885A]'}`}>
               <div className="w-full h-full rounded-full bg-[#242424] flex items-center justify-center text-white text-[10px] font-bold">
                  {project.primaryContact.charAt(0)}
               </div>
            </div>
            <span className="text-xs text-white/50 font-medium">{project.primaryContact}</span>
        </div>
        <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 transition-all ${project.status !== 'Completed' ? 'group-hover:bg-[#00F866] group-hover:text-black' : 'group-hover:bg-white/20 group-hover:text-white'}`}>
            <ArrowLeft size={16} className="rotate-180" />
        </div>
    </div>
  </motion.div>
));
ProjectCard.displayName = "ProjectCard";

// --- Detail View Component ---

const DetailView = ({ project, onBack }: { project: Project; onBack: () => void }) => {
    
    // Tech grid for hero
    const heroGrid = (
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#smallGrid)"/>
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    );

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm font-poppins text-white/40 mb-2 pl-1">
                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                    <Home size={14} />
                    <span>Dashboard</span>
                </div>
                <ChevronRight size={14} className="text-white/20" />
                <div 
                    onClick={onBack} 
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                >
                    <LayoutGrid size={14} />
                    <span>Projects</span>
                </div>
                <ChevronRight size={14} className="text-white/20" />
                <span className="text-[#00F866] font-medium truncate max-w-[200px]">{project.name}</span>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Project Summary (Hero Tile) - Full Width */}
                <BentoTile className="md:col-span-3 bg-[#242424] border-[#00F866]/20 relative overflow-hidden">
                    {/* Hero Background - Tech Grid */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-[#242424]" />
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#00F866]/10 to-transparent pointer-events-none" />
                    {heroGrid}
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                        <div className="flex flex-col justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={onBack} 
                                        className="h-8 w-8 rounded-full border border-white/10 hover:bg-white/10 hover:text-white text-white/60 mr-2 -ml-2"
                                    >
                                        <ArrowLeft size={16} />
                                    </Button>
                                    <Badge className={`${getStatusColor(project.status)} border`}>{project.status}</Badge>
                                    <Badge variant="outline" className={`${getPhaseColor(project.phase)} border`}>{project.phase}</Badge>
                                </div>
                                <h1 className="font-righteous text-4xl md:text-5xl text-white mb-2 leading-tight">
                                    {project.name}
                                </h1>
                                <p className="text-white/50 text-sm font-poppins max-w-xl">
                                    {project.description}
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-white/40 font-medium">
                                <span className="flex items-center gap-2 text-[#00F866]"><Activity size={16}/> Last update: {project.lastUpdate}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="flex items-center gap-2"><Clock size={16}/> End: {project.estEndDate}</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end gap-2 md:w-1/3">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-sm font-medium text-white/80">Overall Progress</span>
                                <span className="font-righteous text-4xl text-[#00F866]">{project.progress}%</span>
                            </div>
                            <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                                {/* Grid pattern inside bar */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${project.progress}%` }}
                                    transition={{ duration: 1, ease: "circOut" }}
                                    className={`h-full rounded-full ${project.status === 'Completed' ? 'bg-white/60' : 'bg-[#00F866] shadow-[0_0_15px_#00F866]'}`}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-white/40 font-mono mt-1">
                                {project.nextMilestone ? (
                                    <>
                                        <span>Next: {project.nextMilestone.name}</span>
                                        <span className="text-[#00F866]">Due {project.nextMilestone.date}</span>
                                    </>
                                ) : (
                                    <span>All milestones completed</span>
                                )}
                            </div>
                        </div>
                    </div>
                </BentoTile>

                {/* 2. Milestones (Timeline) - Spans 2 Columns */}
                <BentoTile className="md:col-span-2 min-h-[400px] flex flex-col" delay={0.1}>
                    <SectionHeader icon={Flag} title="Milestones" />
                    
                    <div className="relative pl-4 space-y-0 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                        {/* Vertical Line */}
                        <div className="absolute left-[27px] top-2 bottom-4 w-px bg-white/10" />
                        
                        {project.milestones.map((milestone, idx) => {
                            const isCompleted = milestone.status === 'Completed';
                            const isInProgress = milestone.status === 'In Progress';
                            const isLast = idx === project.milestones.length - 1;
                            
                            return (
                                <div key={milestone.id} className={`relative pl-12 group ${!isLast ? 'pb-8' : ''}`}>
                                    {/* Dot */}
                                    <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#242424] z-10 transition-all duration-300
                                        ${isCompleted ? 'border-[#00F866] text-[#00F866] shadow-[0_0_10px_rgba(0,248,102,0.2)]' : isInProgress ? 'border-white text-white animate-pulse' : 'border-white/20 text-transparent'}
                                    `}>
                                        <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-[#00F866]' : isInProgress ? 'bg-white' : ''}`} />
                                    </div>
                                    
                                    {/* Content Card */}
                                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-300
                                        ${isInProgress 
                                            ? 'bg-white/5 border-white/10 shadow-lg' 
                                            : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'}
                                    `}>
                                        <div>
                                            <h4 className={`font-medium text-base ${isCompleted ? 'text-white/60 line-through decoration-white/20' : 'text-white'}`}>
                                                {milestone.name}
                                            </h4>
                                            <p className="text-xs text-white/40 mt-1 font-mono">
                                                {isCompleted ? `Completed on ${milestone.completedAt}` : `Due ${milestone.dueDate}`}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className={`w-fit ${isCompleted ? 'border-[#00F866]/30 text-[#00F866]' : isInProgress ? 'border-white/40 text-white' : 'border-white/10 text-white/40'}`}>
                                            {milestone.status}
                                        </Badge>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </BentoTile>

                {/* 3. Right Column Stack - Spans 1 Column */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    
                    {/* Deliverables */}
                    <BentoTile className="flex-1" delay={0.2}>
                        <SectionHeader icon={FileText} title="Deliverables" />
                        <div className="space-y-3">
                            {project.deliverables.map(file => (
                                <div key={file.id} className="group flex items-center justify-between p-3 rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-[#00F866]/40 hover:bg-[#2a2a2a] transition-all cursor-pointer">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-lg bg-[#0b1410] border border-white/5 flex items-center justify-center text-white/50 group-hover:text-[#00F866] transition-colors">
                                            {file.type === 'Design' ? <Layers size={18}/> : <FileText size={18}/>}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm text-white font-medium truncate group-hover:text-[#00F866] transition-colors">{file.name}</p>
                                            <p className="text-[10px] text-white/30">{file.uploadedAt}</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[#00F866]/20 transition-all">
                                        <Download size={14} />
                                    </div>
                                </div>
                            ))}
                            {project.deliverables.length === 0 && <p className="text-white/30 text-sm italic">No files yet.</p>}
                        </div>
                    </BentoTile>

                    {/* Quick Links */}
                    <BentoTile delay={0.3}>
                        <SectionHeader icon={LinkIcon} title="Quick Links" />
                        <div className="flex flex-col gap-2">
                            {project.keyLinks.length > 0 ? project.keyLinks.map((link, i) => (
                                <a key={i} href={link.url} className="px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-[#00F866]/30 hover:bg-[#2a2a2a] text-sm text-white/70 hover:text-white transition-all flex items-center justify-between group">
                                    <span className="group-hover:text-[#00F866] transition-colors">{link.label}</span>
                                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00F866]" />
                                </a>
                            )) : <p className="text-white/30 text-sm italic">No links available.</p>}
                        </div>
                    </BentoTile>

                    {/* Changes */}
                    <BentoTile delay={0.4}>
                        <div className="flex items-center justify-between mb-4">
                            <SectionHeader icon={AlertCircle} title="Changes" />
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-[#00F866] hover:bg-[#00F866]/20 hover:text-[#00F866]">
                                <Plus size={16} />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {project.changeRequests.map(req => (
                                <div key={req.id} className="flex items-center justify-between p-3 rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-white/10 transition-colors">
                                    <div>
                                        <p className="text-sm text-white font-medium">{req.title}</p>
                                        <p className="text-[10px] text-white/30">{req.createdAt}</p>
                                    </div>
                                    <Badge variant="outline" className={`text-[10px] border px-2 py-0.5 ${req.status === 'Approved' ? 'border-[#00F866]/30 text-[#00F866]' : 'border-white/10 text-white/60'}`}>
                                        {req.status}
                                    </Badge>
                                </div>
                            ))}
                            {project.changeRequests.length === 0 && <p className="text-white/30 text-sm italic">No active requests.</p>}
                        </div>
                    </BentoTile>

                </div>
            </div>
        </div>
    );
};

// --- Main Projects View ---

export const ProjectsView = (): React.JSX.Element => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'Active' | 'Completed' | 'All'>('Active');

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setViewMode('detail');
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedProjectId(null);
  };

  // Filter Logic
  const filteredProjects = PROJECTS.filter(p => {
    // 1. Search Filter
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Status Filter
    const isActive = p.status !== 'Completed';
    const matchesStatus = 
        statusFilter === 'All' ? true : 
        statusFilter === 'Active' ? isActive : 
        !isActive; // Completed

    return matchesSearch && matchesStatus;
  });

  const totalProjects = PROJECTS.length;
  const activeCount = PROJECTS.filter(p => p.status !== 'Completed').length;
  const completedCount = PROJECTS.filter(p => p.status === 'Completed').length;

  if (viewMode === 'detail' && selectedProject) {
    return <DetailView project={selectedProject} onBack={handleBack} />;
  }

  // --- Rendering Empty States based on context ---
  const renderEmptyState = () => {
      // Case 1: Absolutely no projects in system (New User)
      if (totalProjects === 0) {
          return <EmptyState type="no-projects" />;
      }
      
      // Case 2: Filtered to "Active" but everything is completed
      if (statusFilter === 'Active' && activeCount === 0) {
          return <EmptyState type="no-active" />;
      }

      // Case 3: Filtered to "Completed" but nothing completed yet
      if (statusFilter === 'Completed' && completedCount === 0) {
          return (
              <div className="col-span-full py-20 text-center text-white/30 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                      <Layout size={32} strokeWidth={1.5} />
                  </div>
                  <p>No completed projects yet.</p>
              </div>
          );
      }

      // Case 4: Search returned no results
      if (searchQuery && filteredProjects.length === 0) {
          return <EmptyState type="no-results" />;
      }

      return null;
  };

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in duration-500">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
                <h1 className="font-righteous text-3xl md:text-4xl text-white">Your Projects</h1>
                <p className="text-white/50 text-sm font-poppins mt-1">Track progress, milestones, and deliverables.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                        type="text" 
                        placeholder="Search projects..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#242424] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00F866]/50 placeholder:text-white/20 transition-all hover:border-white/20"
                    />
                </div>

                {/* Status Filter Tabs */}
                {totalProjects > 0 && (
                    <div className="flex bg-[#242424] p-1 rounded-xl border border-white/5 self-start sm:self-auto">
                        {(['Active', 'Completed', 'All'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setStatusFilter(tab)}
                                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                                    statusFilter === tab 
                                    ? 'bg-[#00F866] text-black shadow-md' 
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tab}
                                {tab === 'Active' && activeCount > 0 && <span className="ml-1.5 opacity-60">({activeCount})</span>}
                                {tab === 'Completed' && completedCount > 0 && <span className="ml-1.5 opacity-60">({completedCount})</span>}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 min-h-[400px]">
            {filteredProjects.length > 0 ? (
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onClick={() => handleProjectClick(project.id)} 
                        />
                    ))}
                </AnimatePresence>
            ) : (
                renderEmptyState()
            )}
        </div>
    </div>
  );
};
