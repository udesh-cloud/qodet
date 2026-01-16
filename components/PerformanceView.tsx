
"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Server, 
  Globe, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Search, 
  Link as LinkIcon,
  HelpCircle,
  Info
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// --- Types ---

type TimeRange = "7d" | "30d" | "90d";
type ProjectType = "Web" | "SEO" | "AI";

interface PerformanceProject {
  id: string;
  name: string;
  type: ProjectType;
  integrations: string[];
  lastSync: string;
  delivery: {
    progressHistory: number[];
    milestones: { planned: number; completed: number };
    variance: number;
  };
  web?: {
    lcp: number[];
    uptime: number[];
    errorRate: number[];
    activeUsers: number[];
  };
  seo?: {
    traffic: number[];
    clicks: number[];
    impressions: number[];
    avgPosition: number[];
  };
  ai?: {
    tasks: number[];
    successRate: number[];
    executionTime: number[];
  };
}

// --- Mock Data ---

const PROJECTS_DATA: PerformanceProject[] = [
  {
    id: "p1",
    name: "FinCore Ledger Scale-up",
    type: "Web",
    integrations: ["Vercel", "Sentry", "PostHog"],
    lastSync: "2 mins ago",
    delivery: {
      progressHistory: [20, 25, 30, 45, 48, 60, 68],
      milestones: { planned: 18, completed: 12 },
      variance: 2,
    },
    web: {
      lcp: [1.2, 1.1, 0.9, 0.85, 0.8, 0.8, 0.78],
      uptime: [99.9, 99.9, 99.95, 99.99, 99.99, 100, 100],
      errorRate: [0.5, 0.4, 0.2, 0.1, 0.05, 0.05, 0.02],
      activeUsers: [1200, 1350, 1400, 1600, 1800, 2100, 2400],
    },
  },
  {
    id: "p2",
    name: "HealthVantage Marketing",
    type: "SEO",
    integrations: ["Google Search Console", "Google Analytics"],
    lastSync: "1 hour ago",
    delivery: {
      progressHistory: [10, 15, 25, 30, 35, 40, 42],
      milestones: { planned: 10, completed: 4 },
      variance: 0,
    },
    seo: {
      traffic: [500, 550, 600, 750, 800, 950, 1100],
      clicks: [120, 140, 160, 200, 220, 280, 350],
      impressions: [5000, 5500, 6000, 7500, 8000, 9500, 12000],
      avgPosition: [12, 11.5, 11, 10.2, 9.5, 8.8, 8.2],
    },
  },
  {
    id: "p3",
    name: "AutoResponse Bot V2",
    type: "AI",
    integrations: ["LangChain", "OpenAI"], // Missing Datadog to simulate empty state
    lastSync: "Live",
    delivery: {
      progressHistory: [5, 15, 35, 50, 70, 85, 90],
      milestones: { planned: 8, completed: 7 },
      variance: -1,
    },
    ai: {
      tasks: [100, 250, 500, 1200, 1500, 2000, 2500],
      successRate: [80, 85, 88, 92, 95, 97, 98],
      executionTime: [2500, 2200, 1800, 1500, 1400, 1200, 1100],
    },
  },
];

// --- Custom Chart Components (Lightweight SVG) ---

const SvgLineChart = ({ data, color = "#00F866", height = 60, fillArea = false, inverse = false, dashed = false }: { data: number[], color?: string, height?: number, fillArea?: boolean, inverse?: boolean, dashed?: boolean }) => {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal || 1;
  const padding = range * 0.1;
  const effectiveMax = maxVal + padding;
  const effectiveMin = Math.max(0, minVal - padding);
  const effectiveRange = effectiveMax - effectiveMin;

  const width = 100;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const normalizedVal = (val - effectiveMin) / effectiveRange;
    const y = inverse 
        ? normalizedVal * height 
        : height - (normalizedVal * height);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full overflow-hidden relative group" style={{ height: `${height}px` }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(p => (
            <line key={p} x1="0" y1={height * p} x2={width} y2={height * p} stroke="white" strokeOpacity="0.05" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        ))}

        {fillArea && (
          <path
            d={`M 0,${height} L ${points.split(' ')[0]} ${points} L ${width},${height} Z`}
            fill={color}
            fillOpacity="0.1"
            stroke="none"
          />
        )}
        
        <path
          d={`M ${points}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={dashed ? "4 2" : "none"}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_4px_rgba(0,248,102,0.3)]"
        />
        
        {/* End dot */}
        {data.length > 0 && (
            <circle 
                cx={width} 
                cy={inverse 
                    ? ((data[data.length-1] - effectiveMin) / effectiveRange) * height
                    : height - ((data[data.length-1] - effectiveMin) / effectiveRange) * height
                } 
                r="3" 
                fill={color} 
                vectorEffect="non-scaling-stroke" 
            />
        )}
      </svg>
      {dashed && (
          <div className="absolute top-0 right-0 bg-[#242424]/90 text-[10px] text-white/60 px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Partial Data
          </div>
      )}
    </div>
  );
};

const BarComparisonChart = ({ planned, completed }: { planned: number, completed: number }) => {
  const max = Math.max(planned, completed, 1);
  const plannedPct = (planned / max) * 100;
  const completedPct = (completed / max) * 100;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-4">
        <span className="text-xs text-white/40 w-16 text-right">Planned</span>
        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${plannedPct}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-white/20 rounded-full" 
          />
        </div>
        <span className="text-xs text-white font-mono w-6">{planned}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-white/40 w-16 text-right">Completed</span>
        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${completedPct}%` }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="h-full bg-[#00F866] rounded-full shadow-[0_0_8px_rgba(0,248,102,0.4)]" 
          />
        </div>
        <span className="text-xs text-[#00F866] font-mono w-6">{completed}</span>
      </div>
    </div>
  );
};

// --- Reusable Layout Components ---

const MetricCard = ({ title, value, subtext, trend, children, className = "", infoTooltip }: any) => (
  <div className={`bg-[#242424] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-[#00F866]/30 transition-all duration-300 relative group/card h-full ${className}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
            <h4 className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">{title}</h4>
            {infoTooltip && (
                <div className="relative group/tooltip">
                    <Info size={12} className="text-white/20 hover:text-white/60 cursor-help" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-black/90 text-white text-[10px] p-2 rounded-lg border border-white/10 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                        {infoTooltip}
                    </div>
                </div>
            )}
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-righteous text-white">{value}</span>
          {trend && (
            <span className={`text-xs mb-1 font-mono ${trend > 0 ? 'text-[#00F866]' : 'text-[#ef4444]'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
      {subtext && <Badge variant="outline" className="border-white/10 text-white/40 text-[10px] bg-white/5">{subtext}</Badge>}
    </div>
    <div className="mt-auto relative">
      {children}
    </div>
  </div>
);

const ChartSectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-3 mb-4 pl-1">
    <div className="w-8 h-8 rounded-lg bg-[#00F866]/10 flex items-center justify-center text-[#00F866]">
        <Icon size={16} />
    </div>
    <h3 className="font-righteous text-xl text-white">{title}</h3>
  </div>
);

const EmptyIntegrationCard = ({ source, metric }: { source: string, metric: string }) => (
  <div className="bg-[#242424] border border-white/10 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[180px] hover:border-[#00F866]/50 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4 group-hover:text-[#00F866] group-hover:scale-110 group-hover:bg-[#00F866]/10 transition-all">
      <LinkIcon size={20} />
    </div>
    <p className="text-white font-medium text-sm mb-1">{metric}</p>
    <p className="text-white/40 text-xs mb-4 max-w-[200px]">
        Connect <span className="text-white/70 font-semibold">{source}</span> to unlock this metric.
    </p>
    <Button variant="outline" size="sm" className="h-9 border-white/10 text-white hover:bg-[#00F866] hover:text-black hover:border-[#00F866] text-xs font-medium transition-colors">
      Connect Source
    </Button>
  </div>
);

export const PerformanceView = (): React.JSX.Element => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  const project = useMemo(() => 
    PROJECTS_DATA.find(p => p.id === selectedProjectId) || PROJECTS_DATA[0], 
  [selectedProjectId]);

  // Simulate data adjustment based on time range
  const getChartData = (data: number[] | undefined) => {
    if (!data) return [];
    if (timeRange === "7d") return data.slice(-4);
    // Simulate extra data for 90d
    if (timeRange === "90d") return [...data.map(d => d * 0.9), ...data]; 
    return data;
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* 1. Header Controls (Sticky) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#1f1f1f] sticky top-0 z-50 pb-4 border-b border-white/10 shadow-2xl shadow-[#1f1f1f]/80
        -mx-4 px-4 -mt-4 pt-6
        md:-mx-8 md:px-8 md:-mt-8 md:pt-10">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
            <SelectTrigger className="w-full sm:w-[280px] bg-[#242424] border-white/10 text-white font-righteous text-lg h-12 rounded-xl focus:ring-[#00F866] focus:border-[#00F866]/50 transition-all hover:bg-[#2a2a2a]">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent className="bg-[#242424] border-white/10 text-white shadow-2xl">
              {PROJECTS_DATA.map(p => (
                <SelectItem key={p.id} value={p.id} className="focus:bg-[#00F866] focus:text-black cursor-pointer font-poppins py-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${p.type === 'Web' ? 'bg-blue-400' : p.type === 'SEO' ? 'bg-purple-400' : 'bg-orange-400'}`} />
                    <span className="font-medium">{p.name}</span>
                    <Badge variant="outline" className="ml-auto text-[10px] border-white/10 text-white/40">{p.type}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-1 bg-[#242424] rounded-lg p-1 border border-white/5">
            {(["7d", "30d", "90d"] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${timeRange === range ? "bg-[#00F866] text-black shadow-sm" : "text-white/40 hover:text-white"}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 w-full lg:w-auto justify-end">
          <div className="flex items-center gap-2 bg-[#242424] px-3 py-1.5 rounded-full border border-white/5">
            <RefreshCw size={12} className="animate-spin-slow text-[#00F866]" />
            <span className="font-mono">Synced {project.lastSync}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
            {project.integrations.map(source => (
              <Badge key={source} variant="outline" className="border-white/10 text-white/60 text-[10px] px-2 py-0.5 bg-[#242424]">
                {source}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Delivery Performance (Always Visible) */}
      <section>
        <ChartSectionHeader title="Delivery Performance" icon={Activity} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Progress Chart */}
          <MetricCard 
            title="Progress Trend" 
            value={`${project.delivery.progressHistory[project.delivery.progressHistory.length - 1]}%`}
            infoTooltip="Completion percentage over selected timeframe based on milestone weights."
          >
            <div className="h-24 flex items-end">
              <SvgLineChart data={getChartData(project.delivery.progressHistory)} fillArea />
            </div>
          </MetricCard>

          {/* Milestones Comparison */}
          <MetricCard 
            title="Milestones Status" 
            value={`${project.delivery.milestones.completed}/${project.delivery.milestones.planned}`}
            subtext="Planned vs Completed"
            infoTooltip="Total milestones scheduled for this sprint vs actually delivered."
          >
            <div className="h-24 flex items-center">
              <BarComparisonChart planned={project.delivery.milestones.planned} completed={project.delivery.milestones.completed} />
            </div>
          </MetricCard>

          {/* Variance */}
          <MetricCard 
            title="Delivery Variance" 
            value={Math.abs(project.delivery.variance).toString() + " Days"}
            className={project.delivery.variance > 0 ? "border-[#eab308]/30 bg-[#eab308]/5" : "border-[#00F866]/30 bg-[#00F866]/5"}
            infoTooltip="Deviation from original deadline. Negative is early, positive is late."
          >
            <div className="flex flex-col justify-end h-24">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${project.delivery.variance > 0 ? "bg-[#eab308]/20 text-[#eab308]" : "bg-[#00F866]/20 text-[#00F866]"}`}>
                    {project.delivery.variance > 0 ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                </div>
                <div>
                  <p className={`font-righteous text-xl ${project.delivery.variance > 0 ? "text-[#eab308]" : "text-[#00F866]"}`}>
                    {project.delivery.variance === 0 ? "On Schedule" : project.delivery.variance > 0 ? "Behind Schedule" : "Ahead of Schedule"}
                  </p>
                  <p className="text-white/40 text-xs mt-1">Based on milestone due dates</p>
                </div>
              </div>
            </div>
          </MetricCard>
        </div>
      </section>

      {/* 3. System / Product Performance (Conditional) */}
      <AnimatePresence mode="wait">
        
        {/* WEB PROJECT METRICS */}
        {project.type === "Web" && project.web && (
          <motion.section 
            key="web"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChartSectionHeader title="System Health & Usage" icon={Server} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <MetricCard title="Page Load (LCP)" value={`${project.web.lcp[project.web.lcp.length - 1]}s`} trend={-5} infoTooltip="Largest Contentful Paint. Lower is better.">
                <SvgLineChart data={getChartData(project.web.lcp)} height={40} color="#00F866" />
              </MetricCard>

              <MetricCard title="Uptime (30d)" value={`${project.web.uptime[project.web.uptime.length - 1]}%`}>
                <SvgLineChart data={getChartData(project.web.uptime)} height={40} color="#00F866" />
              </MetricCard>

              <MetricCard title="Error Rate" value={`${project.web.errorRate[project.web.errorRate.length - 1]}%`} trend={-10} className="border-white/5 hover:border-[#eab308]/30">
                <SvgLineChart data={getChartData(project.web.errorRate)} height={40} color="#eab308" />
              </MetricCard>

              <MetricCard title="Active Users" value={project.web.activeUsers[project.web.activeUsers.length - 1].toLocaleString()} trend={12}>
                <SvgLineChart data={getChartData(project.web.activeUsers)} height={40} fillArea color="#00F866" />
              </MetricCard>

            </div>
          </motion.section>
        )}

        {/* SEO PROJECT METRICS */}
        {project.type === "SEO" && project.seo && (
          <motion.section 
            key="seo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChartSectionHeader title="Search Performance" icon={Globe} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <MetricCard title="Organic Traffic" value={project.seo.traffic[project.seo.traffic.length - 1].toLocaleString()} trend={15}>
                <SvgLineChart data={getChartData(project.seo.traffic)} height={40} fillArea />
              </MetricCard>

              <MetricCard title="Total Clicks" value={project.seo.clicks[project.seo.clicks.length - 1].toLocaleString()} trend={8}>
                <SvgLineChart data={getChartData(project.seo.clicks)} height={40} />
              </MetricCard>

              <MetricCard title="Impressions" value={project.seo.impressions[project.seo.impressions.length - 1].toLocaleString()} trend={20}>
                <SvgLineChart data={getChartData(project.seo.impressions)} height={40} />
              </MetricCard>

              <MetricCard title="Avg Position" value={project.seo.avgPosition[project.seo.avgPosition.length - 1].toFixed(1)} trend={5} infoTooltip="Average search ranking position. Lower is better.">
                {/* Inverse chart for position (lower is better) */}
                <SvgLineChart data={getChartData(project.seo.avgPosition)} height={40} inverse />
              </MetricCard>

            </div>
          </motion.section>
        )}

        {/* AI PROJECT METRICS */}
        {project.type === "AI" && project.ai && (
          <motion.section 
            key="ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChartSectionHeader title="Model Performance" icon={Zap} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <MetricCard title="Tasks Executed" value={project.ai.tasks[project.ai.tasks.length - 1].toLocaleString()} trend={25}>
                <SvgLineChart data={getChartData(project.ai.tasks)} height={50} fillArea />
              </MetricCard>

              <MetricCard title="Success Rate" value={`${project.ai.successRate[project.ai.successRate.length - 1]}%`}>
                <div className="h-12 w-full bg-white/5 rounded-xl mt-2 relative overflow-hidden flex items-center px-1">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.ai.successRate[project.ai.successRate.length - 1]}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-[#00F866] shadow-[0_0_10px_#00F866]" 
                        />
                    </div>
                </div>
              </MetricCard>

              <MetricCard title="Avg Execution Time" value={`${project.ai.executionTime[project.ai.executionTime.length - 1]}ms`} trend={-15}>
                <SvgLineChart data={getChartData(project.ai.executionTime)} height={50} color="#eab308" />
              </MetricCard>

            </div>
          </motion.section>
        )}

        {/* Empty State / Partial Data Demo */}
        {/* We'll simulate a missing integration for the AI project to show the empty state */}
        {project.type === "AI" && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
             >
                 <ChartSectionHeader title="Infrastructure Monitoring" icon={HelpCircle} />
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <EmptyIntegrationCard source="Datadog" metric="Server Latency" />
                    {/* Simulated Partial Data */}
                    <MetricCard title="Memory Usage" value="45%" subtext="Partial Data">
                        <SvgLineChart data={[30, 35, 40, 42]} height={40} color="#white" dashed />
                    </MetricCard>
                 </div>
             </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
