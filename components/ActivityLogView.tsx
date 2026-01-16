
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GitCommit, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  FileText,
  UploadCloud,
  Code2,
  Calendar
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// --- Types ---

type LogType = 'commit' | 'deploy' | 'alert' | 'comment' | 'design';

interface LogEntry {
  id: string;
  type: LogType;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target?: string;
  timestamp: string;
  meta?: {
    commitHash?: string;
    branch?: string;
    message?: string;
    alertLevel?: 'warning' | 'error' | 'info';
    image?: string;
  };
}

interface GroupedLogs {
  date: string;
  logs: LogEntry[];
}

// --- Mock Data ---

const ACTIVITY_DATA: GroupedLogs[] = [
  {
    date: "Today",
    logs: [
      {
        id: "l1",
        type: "deploy",
        user: { name: "System", avatar: "" },
        action: "Successfully deployed to production",
        target: "v2.4.0",
        timestamp: "10:42 AM",
      },
      {
        id: "l2",
        type: "commit",
        user: { name: "Alex Sterling", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
        action: "pushed code to",
        target: "feature/api-optimization",
        timestamp: "09:15 AM",
        meta: {
          commitHash: "8f3a2c1",
          message: "Refactor database queries for 50% faster load times",
          branch: "feature/api-optimization"
        }
      },
      {
        id: "l3",
        type: "alert",
        user: { name: "Monitoring Bot", avatar: "" },
        action: "High memory usage detected",
        target: "US-East-1 Server",
        timestamp: "08:30 AM",
        meta: { alertLevel: "warning" }
      }
    ]
  },
  {
    date: "Yesterday",
    logs: [
      {
        id: "l4",
        type: "comment",
        user: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
        action: "commented on",
        target: "User Flow Diagram",
        timestamp: "4:20 PM",
        meta: { message: "Can we simplify the onboarding steps here? Seems a bit complex for new users." }
      },
      {
        id: "l5",
        type: "design",
        user: { name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
        action: "uploaded new mockups",
        target: "Dashboard V3",
        timestamp: "2:00 PM",
        meta: { image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop" }
      }
    ]
  },
  {
    date: "October 22, 2024",
    logs: [
      {
        id: "l6",
        type: "commit",
        user: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
        action: "merged pull request",
        target: "#420",
        timestamp: "11:00 AM",
        meta: {
          commitHash: "merg-392",
          message: "Hotfix: Login validation error",
          branch: "main"
        }
      }
    ]
  }
];

// --- Helpers ---

const getIconForType = (type: LogType) => {
  switch (type) {
    case 'commit': return <GitCommit size={14} />;
    case 'deploy': return <UploadCloud size={14} />;
    case 'alert': return <AlertCircle size={14} />;
    case 'comment': return <MessageSquare size={14} />;
    case 'design': return <FileText size={14} />;
    default: return <CheckCircle2 size={14} />;
  }
};

const getColorForType = (type: LogType) => {
  switch (type) {
    case 'commit': return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case 'deploy': return "bg-[#00F866]/20 text-[#00F866] border-[#00F866]/30";
    case 'alert': return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case 'comment': return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case 'design': return "bg-pink-500/20 text-pink-400 border-pink-500/30";
    default: return "bg-white/10 text-white border-white/20";
  }
};

// --- Component ---

export const ActivityLogView = (): React.JSX.Element => {
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = ACTIVITY_DATA.map(group => ({
    ...group,
    logs: group.logs.filter(log => {
      const matchesType = filterType === "all" || log.type === filterType;
      const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            log.user.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
  })).filter(group => group.logs.length > 0);

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1f1f1f] sticky top-0 z-50 pb-4 border-b border-white/5 -mx-4 px-4 -mt-4 pt-6 md:-mx-8 md:px-8 md:-mt-8 md:pt-8 shadow-md shadow-[#1f1f1f]/50">
        <div>
            <h1 className="font-righteous text-3xl md:text-4xl text-white">System Activity</h1>
            <p className="text-white/50 text-sm font-poppins mt-1">Audit trail of all project events and updates.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input 
                    type="text" 
                    placeholder="Search logs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#242424] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00F866]/50 w-full sm:w-64 placeholder:text-white/20 transition-all"
                />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px] bg-[#242424] border-white/5 text-white h-[42px] rounded-xl">
                    <div className="flex items-center gap-2">
                        <Filter size={14} className="text-white/40" />
                        <SelectValue placeholder="Filter Type" />
                    </div>
                </SelectTrigger>
                <SelectContent className="bg-[#242424] border-white/10 text-white">
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="commit">Commits</SelectItem>
                    <SelectItem value="deploy">Deployments</SelectItem>
                    <SelectItem value="alert">Alerts</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl">
          {/* Vertical Line */}
          <div className="absolute left-[88px] top-4 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-10">
              {filteredData.map((group, groupIdx) => (
                  <div key={groupIdx} className="relative">
                      {/* Date Header */}
                      <div className="flex items-center gap-4 mb-6 md:ml-[50px]">
                          <div className="w-auto px-4 py-1.5 rounded-full bg-[#242424] border border-white/10 text-xs font-medium text-white/60 flex items-center gap-2">
                              <Calendar size={12} /> {group.date}
                          </div>
                          <div className="h-px bg-white/5 flex-grow" />
                      </div>

                      <div className="space-y-6">
                          {group.logs.map((log) => (
                              <motion.div 
                                key={log.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col md:flex-row gap-4 md:gap-8 relative group"
                              >
                                  {/* Time Column */}
                                  <div className="w-[80px] text-right pt-4 hidden md:block">
                                      <span className="text-xs font-mono text-white/40">{log.timestamp}</span>
                                  </div>

                                  {/* Timeline Node */}
                                  <div className="absolute left-[80px] top-4 w-[17px] h-[17px] hidden md:flex items-center justify-center bg-[#1f1f1f] z-10">
                                      <div className={`w-3 h-3 rounded-full border-2 ${log.type === 'deploy' ? 'bg-[#00F866] border-[#00F866] shadow-[0_0_8px_#00F866]' : 'bg-[#242424] border-white/20 group-hover:border-[#00F866]'} transition-colors`} />
                                  </div>

                                  {/* Content Card */}
                                  <div className="flex-1 bg-[#242424] border border-white/5 rounded-2xl p-5 hover:border-[#00F866]/30 transition-all duration-300 shadow-sm relative overflow-hidden">
                                      {/* Mobile Timestamp */}
                                      <span className="md:hidden text-[10px] text-white/30 font-mono absolute top-4 right-4">{log.timestamp}</span>

                                      <div className="flex items-start gap-4">
                                          {/* Icon Box */}
                                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getColorForType(log.type)} flex-shrink-0`}>
                                              {log.user.avatar ? (
                                                  <img src={log.user.avatar} alt="user" className="w-full h-full rounded-xl object-cover opacity-80" />
                                              ) : (
                                                  getIconForType(log.type)
                                              )}
                                          </div>

                                          <div className="flex-1 min-w-0">
                                              <div className="flex flex-wrap items-center gap-1.5 text-sm text-white mb-1">
                                                  <span className="font-bold">{log.user.name}</span>
                                                  <span className="text-white/50">{log.action}</span>
                                                  {log.target && <span className="font-medium text-[#00F866]">{log.target}</span>}
                                              </div>

                                              {/* Specialized Content based on type */}
                                              
                                              {/* 1. Commit Meta */}
                                              {log.type === 'commit' && log.meta && (
                                                  <div className="mt-3 bg-[#1f1f1f] rounded-lg p-3 border border-white/5 font-mono text-xs text-white/70 flex flex-col gap-1">
                                                      <div className="flex items-center gap-2 text-white/40">
                                                          <Code2 size={12} /> 
                                                          <span>{log.meta.commitHash}</span>
                                                      </div>
                                                      <p className="text-white">{log.meta.message}</p>
                                                  </div>
                                              )}

                                              {/* 2. Alert Meta */}
                                              {log.type === 'alert' && (
                                                  <div className="mt-2 flex items-center gap-2 text-[#eab308] text-xs bg-[#eab308]/10 px-3 py-1.5 rounded-lg w-fit border border-[#eab308]/20">
                                                      <AlertCircle size={12} /> Warning Level: High
                                                  </div>
                                              )}

                                              {/* 3. Comment Meta */}
                                              {log.type === 'comment' && log.meta && (
                                                  <div className="mt-2 text-sm text-white/80 italic pl-3 border-l-2 border-white/20">
                                                      "{log.meta.message}"
                                                  </div>
                                              )}

                                              {/* 4. Design Meta */}
                                              {log.type === 'design' && log.meta?.image && (
                                                  <div className="mt-3 relative w-full max-w-[200px] aspect-video rounded-lg overflow-hidden border border-white/10 group/img cursor-pointer">
                                                      <img src={log.meta.image} alt="preview" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                                                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                          <span className="text-xs text-white font-medium">View</span>
                                                      </div>
                                                  </div>
                                              )}

                                          </div>
                                      </div>
                                  </div>
                              </motion.div>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};
