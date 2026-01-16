
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  MoreHorizontal,
  Plus,
  FileBarChart,
  ShieldCheck,
  TrendingUp,
  Clock,
  Home,
  ChevronRight,
  X,
  Share2,
  Trash2,
  CheckCircle2,
  Loader2,
  Eye
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// --- Types ---
interface Report {
  id: string;
  name: string;
  type: "Financial" | "Technical" | "Status" | "Audit";
  format: "PDF" | "CSV";
  date: string;
  size: string;
  project: string;
  generatedBy: string;
}

// --- Mock Data ---
const INITIAL_REPORTS: Report[] = [
  { id: "R-101", name: "Q3 Financial Summary", type: "Financial", format: "PDF", date: "Oct 01, 2024", size: "2.4 MB", project: "FinCore Ledger", generatedBy: "System" },
  { id: "R-102", name: "Security Audit Log", type: "Audit", format: "CSV", date: "Sep 28, 2024", size: "145 KB", project: "FinCore Ledger", generatedBy: "Alex Sterling" },
  { id: "R-103", name: "Weekly Sprint Velocity", type: "Status", format: "PDF", date: "Sep 25, 2024", size: "1.1 MB", project: "HealthVantage", generatedBy: "Sarah Chen" },
  { id: "R-104", name: "API Performance Metrics", type: "Technical", format: "CSV", date: "Sep 20, 2024", size: "8 MB", project: "LogiStream", generatedBy: "System" },
  { id: "R-105", name: "Monthly Retainer Invoice", type: "Financial", format: "PDF", date: "Sep 01, 2024", size: "500 KB", project: "General", generatedBy: "Admin" },
];

export const ReportsView = (): React.JSX.Element => {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal States
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  // Generation Form State
  const [isGenerating, setIsGenerating] = useState(false);
  const [genForm, setGenForm] = useState({
    type: "Status",
    project: "FinCore Ledger",
    format: "PDF"
  });

  const filteredReports = reports.filter(r => {
    const matchesType = filterType === "All" || r.type === filterType;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch(type) {
      case 'Financial': return <TrendingUp size={18} />;
      case 'Technical': return <FileBarChart size={18} />;
      case 'Audit': return <ShieldCheck size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const getColor = (type: string) => {
    switch(type) {
      case 'Financial': return "text-emerald-400 bg-emerald-400/10";
      case 'Technical': return "text-blue-400 bg-blue-400/10";
      case 'Audit': return "text-orange-400 bg-orange-400/10";
      default: return "text-white/60 bg-white/5";
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
        const newReport: Report = {
            id: `R-${Math.floor(Math.random() * 1000)}`,
            name: `${genForm.type} Report - ${genForm.project}`,
            type: genForm.type as any,
            format: genForm.format as any,
            date: "Just now",
            size: "1.2 MB",
            project: genForm.project,
            generatedBy: "You"
        };
        setReports([newReport, ...reports]);
        setIsGenerating(false);
        setIsGenerateOpen(false);
    }, 2000);
  };

  const handleDownload = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      // Mock download
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,Report Content for ${id}`;
      link.download = `report_${id}.txt`;
      link.click();
  };

  const handleDelete = (id: string) => {
      setReports(prev => prev.filter(r => r.id !== id));
      setSelectedReport(null);
  };

  return (
    <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-poppins text-white/40 mb-2 pl-1">
        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <Home size={14} />
            <span>Dashboard</span>
        </div>
        <ChevronRight size={14} className="text-white/20" />
        <span className="hover:text-white transition-colors cursor-default">Workspace</span>
        <ChevronRight size={14} className="text-white/20" />
        <span className="text-[#00F866] font-medium">Reports</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-righteous text-3xl md:text-4xl text-white">Reports Center</h1>
          <p className="text-white/50 text-sm font-poppins mt-1">Access all your project documentation and analytics.</p>
        </div>
        <Button 
            onClick={() => setIsGenerateOpen(true)}
            className="bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous rounded-xl h-12 px-6 shadow-[0_0_20px_rgba(0,248,102,0.1)] transition-transform hover:scale-105"
        >
          <Plus size={18} className="mr-2" /> Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#00F866]/10 flex items-center justify-center text-[#00F866]">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-2xl font-righteous text-white">{reports.length}</p>
            <p className="text-white/40 text-xs font-poppins uppercase tracking-wider">Total Reports</p>
          </div>
        </div>
        <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-2xl font-righteous text-white">5</p>
            <p className="text-white/40 text-xs font-poppins uppercase tracking-wider">Generated this Month</p>
          </div>
        </div>
        <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Download size={24} />
          </div>
          <div>
            <p className="text-2xl font-righteous text-white">128 MB</p>
            <p className="text-white/40 text-xs font-poppins uppercase tracking-wider">Storage Used</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-[#242424] p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Search by name or project..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1f1f1f] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00F866]/50 placeholder:text-white/20"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[#1f1f1f] border-white/5 text-white h-[42px] rounded-xl">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-white/40" />
              <SelectValue placeholder="Type" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-[#2a2a2a] border-white/10 text-white">
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Financial">Financial</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
            <SelectItem value="Status">Status</SelectItem>
            <SelectItem value="Audit">Audit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports List */}
      <div className="flex flex-col gap-3">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <motion.div 
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              layoutId={report.id}
              onClick={() => setSelectedReport(report)}
              className="bg-[#242424] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4 hover:border-[#00F866]/30 transition-all group cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${getColor(report.type)}`}>
                {getIcon(report.type)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate group-hover:text-[#00F866] transition-colors">{report.name}</h3>
                <p className="text-white/40 text-xs mt-0.5 flex items-center gap-2">
                    {report.project} 
                    <span className="w-1 h-1 rounded-full bg-white/20" /> 
                    {report.date}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <Badge variant="outline" className="border-white/10 text-white/50 text-[10px]">
                  {report.format}
                </Badge>
                <span className="text-white/30 text-xs w-16 text-right font-mono">{report.size}</span>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={(e) => handleDownload(e, report.id)}
                    className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5 rounded-lg z-10"
                  >
                    <Download size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5 rounded-lg">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center text-white/30 flex flex-col items-center gap-4 bg-[#242424] rounded-3xl border border-white/5 border-dashed">
            <Search size={32} strokeWidth={1.5} />
            <p>No reports found matching your filters.</p>
          </div>
        )}
      </div>

      {/* --- GENERATE REPORT MODAL --- */}
      <AnimatePresence>
        {isGenerateOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => !isGenerating && setIsGenerateOpen(false)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-[#242424] border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden z-10"
                >
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="font-righteous text-xl text-white">Generate New Report</h3>
                        <Button variant="ghost" size="icon" onClick={() => setIsGenerateOpen(false)} disabled={isGenerating} className="rounded-full hover:bg-white/10">
                            <X size={20} className="text-white/50" />
                        </Button>
                    </div>
                    
                    <div className="p-6 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs text-white/40 font-bold uppercase tracking-wider">Project Scope</label>
                            <Select 
                                value={genForm.project} 
                                onValueChange={(val) => setGenForm({...genForm, project: val})}
                                disabled={isGenerating}
                            >
                                <SelectTrigger className="w-full bg-[#1f1f1f] border-white/10 text-white h-12 rounded-xl">
                                    <SelectValue placeholder="Select Project" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1f1f1f] border-white/10 text-white">
                                    <SelectItem value="FinCore Ledger">FinCore Ledger</SelectItem>
                                    <SelectItem value="HealthVantage">HealthVantage</SelectItem>
                                    <SelectItem value="LogiStream">LogiStream</SelectItem>
                                    <SelectItem value="General">General / All</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-white/40 font-bold uppercase tracking-wider">Report Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                {["Status", "Financial", "Technical", "Audit"].map((type) => (
                                    <div 
                                        key={type}
                                        onClick={() => !isGenerating && setGenForm({...genForm, type})}
                                        className={`
                                            cursor-pointer p-3 rounded-xl border flex items-center gap-3 transition-all
                                            ${genForm.type === type 
                                                ? "bg-[#00F866]/10 border-[#00F866] text-white" 
                                                : "bg-[#1f1f1f] border-white/5 text-white/60 hover:bg-white/5"}
                                        `}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${genForm.type === type ? "border-[#00F866]" : "border-white/30"}`}>
                                            {genForm.type === type && <div className="w-2 h-2 rounded-full bg-[#00F866]" />}
                                        </div>
                                        <span className="text-sm font-medium">{type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-white/40 font-bold uppercase tracking-wider">Format</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-white cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="format" 
                                        checked={genForm.format === "PDF"} 
                                        onChange={() => setGenForm({...genForm, format: "PDF"})}
                                        disabled={isGenerating}
                                        className="accent-[#00F866]"
                                    />
                                    <span className="text-sm">PDF Document</span>
                                </label>
                                <label className="flex items-center gap-2 text-white cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="format" 
                                        checked={genForm.format === "CSV"} 
                                        onChange={() => setGenForm({...genForm, format: "CSV"})}
                                        disabled={isGenerating}
                                        className="accent-[#00F866]"
                                    />
                                    <span className="text-sm">CSV Data Export</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 pt-2">
                        <Button 
                            onClick={handleGenerate} 
                            disabled={isGenerating}
                            className="w-full h-12 bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous rounded-xl text-lg relative overflow-hidden"
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={20} /> Generating...
                                </span>
                            ) : (
                                "Generate Report"
                            )}
                        </Button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* --- REPORT DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedReport && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedReport(null)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                    layoutId={selectedReport.id}
                    className="bg-[#242424] border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden z-10 flex flex-col max-h-[90vh]"
                >
                    {/* Modal Header */}
                    <div className="p-6 border-b border-white/5 flex items-start justify-between bg-[#1f1f1f]">
                        <div className="flex gap-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getColor(selectedReport.type)}`}>
                                {getIcon(selectedReport.type)}
                            </div>
                            <div>
                                <h2 className="font-righteous text-2xl text-white leading-tight">{selectedReport.name}</h2>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <Badge variant="outline" className="border-white/10 text-white/50 text-[10px] bg-[#2a2a2a] px-2">
                                        {selectedReport.id}
                                    </Badge>
                                    <span className="text-white/40 text-xs flex items-center gap-1">
                                        <Calendar size={12} /> {selectedReport.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedReport(null)} className="rounded-full hover:bg-white/10 -mt-2 -mr-2">
                            <X size={20} className="text-white/50" />
                        </Button>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 overflow-y-auto p-6 bg-[#1a1a1a]">
                        <div className="w-full aspect-[4/3] bg-white rounded-xl shadow-lg relative overflow-hidden group flex flex-col">
                            {/* Mock Document Header */}
                            <div className="h-4 bg-gray-200 w-full border-b border-gray-300" />
                            <div className="p-8 flex-1">
                                <div className="w-1/3 h-4 bg-gray-200 rounded mb-6" />
                                <div className="space-y-3">
                                    <div className="w-full h-2 bg-gray-100 rounded" />
                                    <div className="w-full h-2 bg-gray-100 rounded" />
                                    <div className="w-3/4 h-2 bg-gray-100 rounded" />
                                    <div className="w-full h-2 bg-gray-100 rounded" />
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="h-20 bg-gray-50 rounded border border-gray-100" />
                                    <div className="h-20 bg-gray-50 rounded border border-gray-100" />
                                </div>
                            </div>
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <Button 
                                    onClick={(e) => handleDownload(e, selectedReport.id)}
                                    className="bg-white text-black hover:bg-white/90 font-medium"
                                >
                                    <Eye size={18} className="mr-2" /> Preview Full Document
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Details & Actions */}
                    <div className="p-6 bg-[#242424] border-t border-white/5">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Project Context</p>
                                <p className="text-white text-sm font-medium">{selectedReport.project}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Generated By</p>
                                <p className="text-white text-sm font-medium">{selectedReport.generatedBy}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">File Specs</p>
                                <p className="text-white text-sm font-medium">{selectedReport.format} • {selectedReport.size}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button 
                                onClick={(e) => handleDownload(e, selectedReport.id)}
                                className="flex-1 bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous h-12 rounded-xl"
                            >
                                <Download size={18} className="mr-2" /> Download Report
                            </Button>
                            <Button variant="outline" className="h-12 w-12 border-white/10 hover:bg-white/5 text-white rounded-xl p-0 flex items-center justify-center">
                                <Share2 size={18} />
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => handleDelete(selectedReport.id)}
                                className="h-12 w-12 border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400 rounded-xl p-0 flex items-center justify-center"
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};
