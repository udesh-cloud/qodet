
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Plus, 
  Activity, 
  Clock, 
  FileText, 
  Settings, 
  LogOut,
  ChevronRight,
  Zap, 
  Server,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Bell,
  Search,
  Layers,
  Code2,
  DollarSign,
  Briefcase,
  CheckCircle2,
  ListTodo,
  MessageSquare,
  CreditCard,
  Menu,
  X,
  AlertTriangle,
  ArrowUpRight,
  Lock
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ProjectsView } from "./ProjectsView";
import { FinancialsView } from "./FinancialsView";
import { PerformanceView } from "./PerformanceView";
import { MessagesView } from "./MessagesView";
import { ActivityLogView } from "./ActivityLogView";
import { CreateProjectView } from "./CreateProjectView";
import { ReportsView } from "./ReportsView";
import { SettingsView } from "./SettingsView";
import { QodetLogo } from "./ui/QodetLogo";

// --- Types & Config ---

type PlanType = "Standard" | "Pro" | "Enterprise";

// Define which features are locked for which plans
// If a feature is NOT in this map for a plan, it is unlocked.
const FEATURE_LOCKS: Record<PlanType, string[]> = {
  Standard: ["financials", "performance"],
  Pro: [],
  Enterprise: []
};

// --- Aesthetic Components ---

const SquareIcon = ({ icon: Icon, size = "md", className = "" }: { icon: any, size?: "sm" | "md" | "lg", className?: string }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14"
  };
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className} flex-shrink-0`}>
      <div className="absolute inset-0 bg-[#00885A] rounded-lg translate-x-1 translate-y-1" />
      <div className="relative w-full h-full bg-[#00F866] rounded-lg flex items-center justify-center border border-white/10 z-10 text-black shadow-lg">
        <Icon size={iconSizes[size]} strokeWidth={2.5} />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active = false, locked = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
      active 
        ? "text-[#00F866] bg-[#00F866]/10" 
        : "text-white/60 hover:bg-white/5 hover:text-white"
    }`}
  >
    {active && <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#00F866] rounded-full" />}
    <Icon size={20} className={active ? "text-[#00F866]" : "text-white/40 group-hover:text-white transition-colors"} />
    <span className="font-medium text-sm tracking-wide flex-1 text-left">{label}</span>
    {locked && <Lock size={14} className="text-white/30" />}
  </button>
);

const LockedFeatureView = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#00F866] opacity-[0.03] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 bg-[#242424] border border-white/5 p-12 rounded-3xl shadow-2xl max-w-lg w-full flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#1f1f1f] border border-white/10 flex items-center justify-center mb-2">
              <Lock size={32} className="text-[#00F866]" />
          </div>
          
          <div>
              <h2 className="text-2xl font-righteous text-white mb-2">Feature Locked</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                  The <span className="text-white font-bold">{title}</span> module is only available for Retainer and Enterprise clients. Upgrade your engagement to unlock real-time financial tracking and performance analytics.
              </p>
          </div>

          <div className="flex flex-col w-full gap-3">
              <Button className="w-full h-12 bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous text-base rounded-xl">
                  Upgrade Plan
              </Button>
              <Button variant="ghost" className="text-white/40 hover:text-white text-sm">
                  Contact Support
              </Button>
          </div>
      </div>
  </div>
);

// Engineering Style Charts
const LineChart = ({ data, color = "#00F866" }: { data: number[], color?: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 40;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="h-10 w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <path
                d={`M ${points}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Area */}
            <path
                d={`M ${points} L ${width},${height} L 0,${height} Z`}
                fill={color}
                fillOpacity="0.1"
                stroke="none"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    </div>
  );
};

const KpiCard = ({ title, children, className = "" }: { title: string, children?: React.ReactNode, className?: string }) => (
  <div className={`bg-[#242424] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-[#00F866]/30 hover:bg-[#2a2a2a] transition-all duration-300 group ${className}`}>
    <h3 className="text-white/40 text-[10px] font-poppins uppercase tracking-wider font-semibold mb-2 group-hover:text-[#00F866]/80 transition-colors">{title}</h3>
    {children}
  </div>
);

// --- Component for Start Project CTA ---
const StartProjectCard = ({ mobile = false, onClick }: { mobile?: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className={`relative group cursor-pointer ${mobile ? '' : 'mt-auto'}`}>
    {/* Dark Green Underlay (Static Background that becomes visible) */}
    <div className="absolute inset-0 bg-[#00885A] rounded-3xl translate-x-0 translate-y-0" />
    
    {/* Main Card (Lifts off) */}
    <div className="relative z-10 bg-[#00F866] rounded-3xl p-6 flex flex-col h-full justify-between gap-6 transition-transform duration-300 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2 border border-white/20 shadow-xl">
        <div className="relative z-10 flex flex-col gap-4">
            <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center text-black">
                <Plus size={24} />
            </div>
            <div>
                <h3 className="font-righteous text-2xl text-black leading-tight">Start New<br/>Project</h3>
                <p className="font-poppins text-black/70 text-xs mt-1 font-medium">Create a new brief.</p>
            </div>
            <button className="bg-black/90 text-white w-full py-3 rounded-xl font-righteous text-sm flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg">
                Create Brief <ChevronRight size={14} />
            </button>
        </div>
        
        {/* Subtle texture for aesthetics */}
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />
    </div>
  </div>
);

// --- Main Component ---

export const DashboardPage = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Simulating user plan state. Toggle this to test locking behavior.
  const [userPlan, setUserPlan] = useState<PlanType>("Standard"); 

  const activityFeed = [
    { type: "deploy", text: "Production v2.4.0 deployed", time: "2h ago", icon: <Server size={14}/> },
    { type: "milestone", text: "Milestone: API Gateway Complete", time: "5h ago", icon: <CheckCircle2 size={14}/> },
    { type: "update", text: "Weekly sprint report uploaded", time: "1d ago", icon: <FileText size={14}/> },
    { type: "request", text: "New Feature Request: Dark Mode", time: "2d ago", icon: <Layers size={14}/> },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear tokens here if real auth existed
    // Redirect to landing page as requested
    window.location.href = "/";
  };

  const isLocked = (tabName: string) => {
    return FEATURE_LOCKS[userPlan].includes(tabName);
  };

  const SidebarContent = () => (
    <>
       <div className="px-4 pb-2 text-[10px] text-white/30 font-bold uppercase tracking-widest">Management</div>
       <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === "overview"} onClick={() => handleTabChange("overview")} />
       <SidebarItem icon={Briefcase} label="Projects" active={activeTab === "projects"} onClick={() => handleTabChange("projects")} />
       <SidebarItem 
          icon={CreditCard} 
          label="Financials" 
          active={activeTab === "financials"} 
          locked={isLocked("financials")}
          onClick={() => handleTabChange("financials")} 
       />
       <SidebarItem 
          icon={Activity} 
          label="Performance" 
          active={activeTab === "performance"} 
          locked={isLocked("performance")}
          onClick={() => handleTabChange("performance")} 
       />
       
       <div className="px-4 pt-8 pb-2 text-[10px] text-white/30 font-bold uppercase tracking-widest">Workspace</div>
       <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === "messages"} onClick={() => handleTabChange("messages")} />
       <SidebarItem icon={Clock} label="Activity Log" active={activeTab === "activity"} onClick={() => handleTabChange("activity")} />
       <SidebarItem icon={FileText} label="Reports" active={activeTab === "reports"} onClick={() => handleTabChange("reports")} />
       <SidebarItem icon={Settings} label="Settings" active={activeTab === "settings"} onClick={() => handleTabChange("settings")} />
    </>
  );

  const SidebarFooter = () => (
    <div className="p-4 border-t border-white/5 relative z-10 bg-[#0b1410]">
       <div 
         onClick={handleLogout}
         className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
       >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00F866] to-[#00885A] p-[1px]">
             <div className="w-full h-full rounded-full bg-[#0b1410] flex items-center justify-center text-xs font-bold text-[#00F866]">AS</div>
          </div>
          <div className="flex-1 overflow-hidden">
             <p className="text-sm font-medium text-white truncate">Alex Sterling</p>
             <p className="text-[10px] text-white/40 truncate">FinCore Ltd.</p>
          </div>
          <LogOut size={16} className="text-white/20 group-hover:text-red-400 transition-colors" />
       </div>
    </div>
  );

  // Render logic for content area
  const renderContent = () => {
    if (isLocked(activeTab)) {
        return <LockedFeatureView title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />;
    }

    switch (activeTab) {
        case 'projects': return <ProjectsView />;
        case 'financials': return <FinancialsView />;
        case 'performance': return <PerformanceView />;
        case 'messages': return <MessagesView />;
        case 'activity': return <ActivityLogView />;
        case 'reports': return <ReportsView />;
        case 'settings': return <SettingsView />;
        case 'create-project': return <CreateProjectView onBack={() => handleTabChange('overview')} onComplete={() => handleTabChange('projects')} />;
        case 'overview': return (
            <>
                {/* Mobile: Action & CTA First */}
                <div className="lg:hidden grid grid-cols-1 gap-6 order-first mb-6">
                    <StartProjectCard mobile={true} onClick={() => handleTabChange('create-project')} />
                </div>

                {/* SECTION 1: Executive Snapshot (3x2 Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Project Status */}
                    <KpiCard title="Project Status">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#00F866] shadow-[0_0_8px_#00F866]" />
                            <span className="text-lg font-medium text-white">Active</span>
                        </div>
                        <div className="mt-1 text-xs text-white/40">FinCore Ledger Scale-up</div>
                    </KpiCard>

                    {/* Overall Progress */}
                    <KpiCard title="Overall Progress">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-2xl font-righteous text-white">68%</span>
                            <span className="text-xs text-white/40">12/18</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#00F866] w-[68%]" />
                        </div>
                    </KpiCard>

                    {/* Current Phase */}
                    <KpiCard title="Current Phase">
                        <span className="text-lg font-medium text-white">Development</span>
                        <div className="text-xs text-white/40 mt-1">Sprint 4 of 6</div>
                    </KpiCard>

                    {/* Next Milestone */}
                    <KpiCard title="Next Milestone">
                        <div className="text-sm font-medium text-white truncate">User Acceptance Testing</div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-[#00F866]">
                            <Clock size={12} /> Due Oct 24
                        </div>
                    </KpiCard>

                    {/* Last Update */}
                    <KpiCard title="Last Update">
                        <div className="text-lg font-medium text-white">2h ago</div>
                        <div className="text-xs text-white/40 mt-1">Check-in by Sarah</div>
                    </KpiCard>

                    {/* New Card: Pending Items */}
                    <KpiCard title="Pending Items">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-medium text-white">5 Open</div>
                            <div className="flex items-center gap-1 text-[#eab308] text-xs bg-[#eab308]/10 px-2 py-1 rounded-md">
                                <AlertTriangle size={12} /> 2 High Priority
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-white/40 flex items-center gap-2">
                            <ListTodo size={12} /> Review pending
                        </div>
                    </KpiCard>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* LEFT (2 Cols): Delivery & Performance */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* SECTION 2: Delivery Momentum */}
                        <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-righteous text-lg text-white flex items-center gap-2">
                                    <Activity size={18} className="text-[#00F866]" /> Delivery Momentum
                                </h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-[#1f1f1f] rounded-xl p-4 border border-white/5 hover:border-[#00F866]/20 transition-all duration-300">
                                    <div className="text-xs text-white/40 mb-2">Progress Over Time</div>
                                    <div className="h-16 flex items-end">
                                        <LineChart data={[20, 25, 30, 45, 48, 60, 68]} />
                                    </div>
                                    <div className="mt-2 text-right text-xs text-[#00F866] font-mono">+8% this sprint</div>
                                </div>

                                <div className="bg-[#1f1f1f] rounded-xl p-4 border border-white/5 flex flex-col justify-between hover:border-[#00F866]/20 transition-all duration-300">
                                    <div>
                                        <div className="text-xs text-white/40 mb-1">Milestones Completed</div>
                                        <div className="text-2xl font-righteous text-white">12<span className="text-white/40 text-sm font-normal">/18</span></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] text-white/40">
                                            <span>Planned</span>
                                            <span>Actual</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                                            <div className="h-full bg-white/20 w-[70%]" /> 
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                                            <div className="h-full bg-[#00F866] w-[66%]" /> 
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#1f1f1f] rounded-xl p-4 border border-white/5 flex flex-col justify-between hover:border-[#00F866]/20 transition-all duration-300">
                                    <div className="text-xs text-white/40">Avg Response Time</div>
                                    <div className="flex items-end gap-2">
                                        <div className="text-2xl font-righteous text-white">1.2h</div>
                                        <div className="text-xs text-[#00F866] mb-1 flex items-center">
                                            <TrendingUp size={10} className="mr-1 rotate-180" /> -15%
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-white/30 mt-2">Communication SLA: 4h</div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: Performance */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <KpiCard title="Page Load (LCP)">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-2xl font-righteous text-white">0.8s</span>
                                    <Badge variant="outline" className="text-[#00F866] border-[#00F866]/30 text-[10px] px-1 py-0 h-5">Good</Badge>
                                </div>
                                <LineChart data={[1.2, 1.1, 0.9, 0.85, 0.8]} />
                            </KpiCard>

                            <KpiCard title="Uptime (30d)">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-2xl font-righteous text-white">99.99%</span>
                                </div>
                                <div className="flex gap-0.5 h-6 items-end">
                                    {Array.from({ length: 15 }).map((_, i) => (
                                        <div key={i} className="flex-1 bg-[#00F866] rounded-sm h-4 opacity-80" />
                                    ))}
                                </div>
                            </KpiCard>

                            <KpiCard title="Error Rate">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-2xl font-righteous text-white">0.05%</span>
                                </div>
                                <LineChart data={[0.2, 0.15, 0.1, 0.05, 0.05]} />
                            </KpiCard>
                        </div>

                        {/* SECTION 5: Activity Feed */}
                        <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-righteous text-lg text-white">Recent Activity</h3>
                                <button className="text-xs text-[#00F866] hover:text-white flex items-center gap-1 transition-colors">
                                    View All <ArrowUpRight size={12} />
                                </button>
                            </div>
                            <div className="space-y-6 relative">
                                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" />
                                {activityFeed.map((item, idx) => (
                                    <div key={idx} className="relative pl-12 group">
                                        <div className={`absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-[#242424] bg-[#1f1f1f] flex items-center justify-center z-10 transition-colors ${idx === 0 ? 'text-[#00F866]' : 'text-white/30 group-hover:text-white'}`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium group-hover:text-[#00F866] transition-colors cursor-pointer">{item.text}</p>
                                            <p className="text-xs text-white/40 font-mono mt-1">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT (1 Col): Financials & Action */}
                    <div className="space-y-6 flex flex-col h-full">
                        
                        {/* SECTION 4: Financial */}
                        {isLocked("financials") ? (
                            // Locked State Preview
                            <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col h-[280px] items-center justify-center text-center">
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />
                                <div className="relative z-20 flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#1f1f1f] border border-white/10 flex items-center justify-center">
                                        <Lock size={20} className="text-white/50" />
                                    </div>
                                    <h3 className="font-righteous text-lg text-white">Financials Locked</h3>
                                    <p className="text-xs text-white/40 max-w-[200px]">Upgrade to Retainer or Enterprise plan to view real-time billing.</p>
                                </div>
                                {/* Blurred Background Content */}
                                <div className="absolute inset-0 p-6 opacity-20 pointer-events-none">
                                    <div className="flex items-center gap-2 mb-6">
                                        <CreditCard size={18} />
                                        <h3 className="font-righteous text-lg">Financials</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-10 bg-[#1f1f1f] rounded-xl w-full" />
                                        <div className="h-10 bg-[#1f1f1f] rounded-xl w-full" />
                                        <div className="h-10 bg-[#1f1f1f] rounded-xl w-full" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-2 mb-6">
                                    <CreditCard size={18} className="text-[#00F866]" />
                                    <h3 className="font-righteous text-lg text-white">Financials</h3>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-[#1f1f1f] rounded-xl border border-white/5 hover:border-[#00F866]/30 transition-all">
                                        <span className="text-xs text-white/50">Engagement</span>
                                        <span className="text-sm font-medium text-white">Retainer</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1f1f1f] rounded-xl border border-white/5 hover:border-[#00F866]/30 transition-all">
                                        <span className="text-xs text-white/50">Total Invoiced</span>
                                        <span className="text-sm font-mono text-white">$142,000</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1f1f1f] rounded-xl border border-white/5 hover:border-[#00F866]/30 transition-all">
                                        <span className="text-xs text-white/50">Outstanding</span>
                                        <span className="text-sm font-mono text-[#00F866]">$12,000</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1f1f1f] rounded-xl border border-white/5 hover:border-[#00F866]/30 transition-all">
                                        <span className="text-xs text-white/50">Next Invoice</span>
                                        <span className="text-sm font-medium text-white">Nov 01, 2025</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION 6: Client Action */}
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#242424] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors group">
                                    <div className="text-2xl font-righteous text-white group-hover:text-[#00F866] transition-colors">2</div>
                                    <span className="text-xs text-white/40 text-center">Active Projects</span>
                                </div>
                                <div className="bg-[#242424] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#2a2a2a] cursor-pointer transition-colors group">
                                    <div className="text-2xl font-righteous text-[#00F866] group-hover:scale-110 transition-transform">1</div>
                                    <span className="text-xs text-white/40 text-center">Open Requests</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleTabChange('messages')}
                                className="bg-[#242424] border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:border-[#00F866]/30 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#1f1f1f] rounded-lg text-white/60 group-hover:text-white transition-colors">
                                        <MessageSquare size={18} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white group-hover:text-[#00F866] transition-colors">Messages</div>
                                        <div className="text-xs text-white/40">2 unread</div>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                            </button>

                            {/* Primary CTA - Desktop Only placement (shown on mobile above) */}
                            <div className="hidden lg:block mt-auto">
                                <StartProjectCard onClick={() => handleTabChange('create-project')} />
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
        default: return (
            <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-4">
                <SquareIcon icon={Code2} size="lg" className="opacity-50" />
                <p className="text-lg font-medium">This module is under development.</p>
                <p className="text-sm text-center max-w-md">The {activeTab} section is part of our future roadmap. Check back soon for updates.</p>
            </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#1f1f1f] text-white font-poppins overflow-hidden selection:bg-[#00F866]/30 lg:gap-4 lg:p-4">
      
      {/* --- Sidebar (Desktop - Floating) --- */}
      <aside className="w-72 hidden lg:flex flex-col z-20 flex-shrink-0 bg-[#0b1410] border border-[#00F866]/10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Subtle primary gradient at top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#00F866]/5 to-transparent pointer-events-none" />

        <div className="p-6 h-[80px] flex items-center relative z-10">
           <div className="font-righteous text-2xl text-white tracking-widest flex items-center gap-3">
              <QodetLogo className="h-10 w-auto" isHoverable={true} />
              QODET
           </div>
        </div>

        <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto relative z-10">
           <SidebarContent />
        </div>

        <SidebarFooter />
      </aside>

      {/* --- Mobile Sidebar (Drawer) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <motion.aside 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-[#0b1410] border-r border-[#00F866]/10 flex flex-col shadow-2xl"
          >
             <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#00F866]/5 to-transparent pointer-events-none" />
             
             <div className="p-6 h-[75px] flex items-center justify-between relative z-10">
               <div className="font-righteous text-2xl text-white tracking-widest flex items-center gap-2">
                  <QodetLogo className="h-8 w-auto" isHoverable={true} />
                  QODET
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                 <X size={24} />
               </button>
            </div>
            
            <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto relative z-10">
                <SidebarContent />
            </div>

            <SidebarFooter />
          </motion.aside>
        </div>
      )}

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#1f1f1f] lg:rounded-3xl lg:border lg:border-white/5">
        
        {/* Dashboard Header */}
        <header className="h-[75px] flex-shrink-0 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#1f1f1f]/80 backdrop-blur-md z-10 sticky top-0">
            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden text-white/60 hover:text-white"
                >
                  <Menu size={24} />
                </button>
                <h1 className="font-righteous text-xl md:text-2xl text-white capitalize">{activeTab.replace('-', ' ')}</h1>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-[#00F866] animate-pulse" />
                    <span className="text-xs text-white/60 font-medium">System Operational</span>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="relative hidden md:block">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                        type="text" 
                        placeholder="Search projects..." 
                        className="bg-[#242424] border border-white/5 rounded-full pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00F866]/50 w-64 placeholder:text-white/20"
                    />
                </div>
                
                {/* Fixed Notifications Button */}
                <Button size="icon" variant="ghost" className="text-white/60 hover:text-[#00F866] hover:bg-[#00F866]/10 transition-all duration-300">
                    <Bell size={20} />
                </Button>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-8 h-full">
                {renderContent()}
            </div>
        </div>
      </main>
    </div>
  );
};
