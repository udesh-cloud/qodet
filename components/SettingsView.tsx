
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Users, 
  CreditCard, 
  Bell, 
  Shield, 
  Save, 
  Camera, 
  Plus, 
  MoreVertical, 
  LogOut,
  Smartphone,
  Globe,
  Mail,
  CheckCircle2,
  Trash2,
  ChevronRight,
  Home,
  AlertTriangle
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// --- Types ---
type SettingsTab = "profile" | "team" | "billing" | "notifications" | "security";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  avatar: string;
}

// --- Mock Data ---
const CURRENT_USER_ID = "1"; // Simulating logged-in user
const TEAM_MEMBERS: TeamMember[] = [
  { id: "1", name: "Alex Sterling", email: "alex@fincore.com", role: "Admin", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
  { id: "2", name: "Sarah Jenkins", email: "sarah@fincore.com", role: "Editor", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
  { id: "3", name: "David Kim", email: "david@fincore.com", role: "Viewer", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
];

const SESSIONS = [
  { id: "s1", device: "MacBook Pro 16\"", location: "San Francisco, USA", active: "Current Session", icon: <Globe size={16} /> },
  { id: "s2", device: "iPhone 14 Pro", location: "San Francisco, USA", active: "Active 2h ago", icon: <Smartphone size={16} /> },
];

// --- Sub-Components ---

const SettingSection = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.3 }}
    className="space-y-6 max-w-4xl"
  >
    <div className="border-b border-white/5 pb-4">
      <h2 className="text-2xl font-righteous text-white">{title}</h2>
      <p className="text-white/50 text-sm font-poppins mt-1">{description}</p>
    </div>
    {children}
  </motion.div>
);

const ToggleRow = ({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-white/10 transition-colors">
    <div>
      <p className="text-white font-medium text-sm">{label}</p>
      <p className="text-white/40 text-xs mt-0.5">{desc}</p>
    </div>
    <div 
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? "bg-[#00F866]" : "bg-white/10"}`}
    >
      <motion.div 
        layout 
        className="w-4 h-4 bg-white rounded-full shadow-sm"
        animate={{ x: checked ? 24 : 0 }}
      />
    </div>
  </div>
);

export const SettingsView = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [loading, setLoading] = useState(false);
  
  // Form States (Mock)
  const [profile, setProfile] = useState({ name: "Alex Sterling", email: "alex@fincore.com", workspace: "FinCore Ltd." });
  const [team, setTeam] = useState(TEAM_MEMBERS);
  const [notifications, setNotifications] = useState({ email: true, push: false, marketing: true, security: true });
  const [security, setSecurity] = useState({ twoFactor: true });
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const handleRemoveMember = (id: string) => {
    setError(null);
    if (id === CURRENT_USER_ID) {
      setError("You cannot remove yourself from the workspace.");
      return;
    }
    
    const memberToRemove = team.find(m => m.id === id);
    const adminCount = team.filter(m => m.role === "Admin").length;

    if (memberToRemove?.role === "Admin" && adminCount <= 1) {
      setError("Cannot remove the last administrator.");
      return;
    }

    setTeam(prev => prev.filter(m => m.id !== id));
  };

  const menuItems = [
    { id: "profile", label: "Profile & Workspace", icon: User },
    { id: "team", label: "Team Members", icon: Users },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

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
        <span className="text-[#00F866] font-medium">Settings</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-[#242424] border border-white/5 rounded-3xl p-4 sticky top-0">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as SettingsTab)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${activeTab === item.id 
                      ? "bg-[#00F866] text-black shadow-lg shadow-[#00F866]/10" 
                      : "text-white/60 hover:text-white hover:bg-white/5"}
                  `}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#242424] border border-white/5 rounded-3xl p-6 md:p-10 min-h-[600px]">
          <AnimatePresence mode="wait">
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <SettingSection key="profile" title="Profile & Workspace" description="Manage your personal information and workspace details.">
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group cursor-pointer">
                    <img src={TEAM_MEMBERS[0].avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-[#1f1f1f] shadow-xl" />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-righteous text-xl">{profile.name}</h3>
                    <p className="text-white/40 text-sm">Administrator</p>
                    <Button variant="outline" size="sm" className="mt-3 border-white/10 text-white/70 hover:text-white hover:bg-white/5 h-8 text-xs bg-transparent">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 font-bold uppercase tracking-wider">Full Name</label>
                    <input 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F866]/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 font-bold uppercase tracking-wider">Email Address</label>
                    <input 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F866]/50 transition-colors"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-xs text-white/40 font-bold uppercase tracking-wider">Workspace Name</label>
                    <input 
                      value={profile.workspace}
                      onChange={(e) => setProfile({...profile, workspace: e.target.value})}
                      className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F866]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSave} className="bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous min-w-[120px]">
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </SettingSection>
            )}

            {/* TEAM TAB */}
            {activeTab === "team" && (
              <SettingSection key="team" title="Team Members" description="Manage access and roles for your workspace members.">
                
                {error && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-2 text-sm">
                    <AlertTriangle size={16} />
                    {error}
                  </div>
                )}

                <div className="flex justify-end mb-6">
                  <Button className="bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous rounded-xl">
                    <Plus size={18} className="mr-2" /> Invite Member
                  </Button>
                </div>

                <div className="space-y-3">
                  {team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-white/10 transition-colors group">
                      <div className="flex items-center gap-4">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-white font-medium text-sm">
                            {member.name}
                            {member.id === CURRENT_USER_ID && <span className="ml-2 text-xs text-[#00F866]">(You)</span>}
                          </p>
                          <p className="text-white/40 text-xs">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select 
                          value={member.role} 
                          onValueChange={(val) => setTeam(team.map(m => m.id === member.id ? { ...m, role: val as "Admin" | "Editor" | "Viewer" } : m))}
                          disabled={member.id === CURRENT_USER_ID}
                        >
                          <SelectTrigger className="w-[100px] h-9 bg-[#242424] border-white/10 text-xs text-white/80">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#242424] border-white/10 text-white">
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Editor">Editor</SelectItem>
                            <SelectItem value="Viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveMember(member.id)}
                          className={`text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-colors ${member.id === CURRENT_USER_ID ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </SettingSection>
            )}

            {/* BILLING TAB */}
            {activeTab === "billing" && (
              <SettingSection key="billing" title="Billing & Plans" description="Manage your subscription plan and payment methods.">
                
                {/* Current Plan */}
                <div className="bg-gradient-to-br from-[#1f1f1f] to-black border border-[#00F866]/30 rounded-2xl p-6 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F866] opacity-[0.05] rounded-bl-full pointer-events-none" />
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-[#00F866] text-black hover:bg-[#00F866]">Standard Plan</Badge>
                        <span className="text-white/40 text-xs">Billed Monthly</span>
                      </div>
                      <h3 className="text-3xl font-righteous text-white">$49<span className="text-lg text-white/40 font-poppins">/mo</span></h3>
                      <p className="text-white/60 text-sm mt-2">Next billing date: Nov 01, 2024</p>
                      <p className="text-xs text-[#00F866] mt-2 flex items-center gap-1"><AlertTriangle size={10}/> Performance & Financial modules locked</p>
                    </div>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 bg-transparent">
                      Upgrade Plan
                    </Button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium text-lg">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#1f1f1f] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                      </div>
                      <div>
                        <p className="text-white font-mono text-sm">•••• •••• •••• 4242</p>
                        <p className="text-white/40 text-xs">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">Edit</Button>
                  </div>
                  <Button variant="ghost" className="text-[#00F866] hover:text-[#00F866] hover:bg-[#00F866]/10 pl-0 gap-2">
                    <Plus size={16} /> Add Payment Method
                  </Button>
                </div>

                {/* Billing History Link */}
                <div className="mt-8 pt-6 border-t border-white/5">
                   <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Looking for past invoices?</span>
                      <Button variant="link" className="text-[#00F866] hover:text-white gap-2">
                         View Billing History <ChevronRight size={14} />
                      </Button>
                   </div>
                </div>
              </SettingSection>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <SettingSection key="notifications" title="Notifications" description="Choose how and when you want to be notified.">
                <div className="space-y-4">
                  <ToggleRow 
                    label="Email Notifications" 
                    desc="Receive daily digests and major updates via email." 
                    checked={notifications.email} 
                    onChange={() => setNotifications({...notifications, email: !notifications.email})} 
                  />
                  <ToggleRow 
                    label="Push Notifications" 
                    desc="Receive real-time alerts on your desktop or mobile device." 
                    checked={notifications.push} 
                    onChange={() => setNotifications({...notifications, push: !notifications.push})} 
                  />
                  <ToggleRow 
                    label="Product Updates & Marketing" 
                    desc="Stay updated with the latest features and news from Qodet." 
                    checked={notifications.marketing} 
                    onChange={() => setNotifications({...notifications, marketing: !notifications.marketing})} 
                  />
                  <ToggleRow 
                    label="Security Alerts" 
                    desc="Get notified about sign-ins and sensitive account actions." 
                    checked={notifications.security} 
                    onChange={() => setNotifications({...notifications, security: !notifications.security})} 
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSave} className="bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous min-w-[120px]">
                    {loading ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </SettingSection>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <SettingSection key="security" title="Security" description="Manage your account security and active sessions.">
                
                <div className="space-y-6">
                  {/* Password */}
                  <div className="bg-[#1f1f1f] p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-white font-medium text-sm">Password</h4>
                      <p className="text-white/40 text-xs mt-1">Last changed 3 months ago</p>
                    </div>
                    {/* Updated button style for dark mode compatibility */}
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 bg-[#1f1f1f]">Change Password</Button>
                  </div>

                  {/* 2FA */}
                  <ToggleRow 
                    label="Two-Factor Authentication" 
                    desc="Add an extra layer of security to your account." 
                    checked={security.twoFactor} 
                    onChange={() => setSecurity({...security, twoFactor: !security.twoFactor})} 
                  />

                  {/* Sessions */}
                  <div className="pt-4">
                    <h4 className="text-white font-medium text-sm mb-4">Active Sessions</h4>
                    <div className="space-y-3">
                      {SESSIONS.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 rounded-xl bg-[#1f1f1f] border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#242424] flex items-center justify-center text-white/50">
                              {session.icon}
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{session.device}</p>
                              <p className="text-white/40 text-xs flex items-center gap-2">
                                {session.location} • <span className={session.active.includes("Current") ? "text-[#00F866]" : ""}>{session.active}</span>
                              </p>
                            </div>
                          </div>
                          {!session.active.includes("Current") && (
                            // Updated button style
                            <Button variant="ghost" size="icon" className="text-white/20 hover:text-red-400 hover:bg-red-400/10">
                              <LogOut size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SettingSection>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
