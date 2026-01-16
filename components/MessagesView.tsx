
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MoreVertical, 
  Paperclip, 
  Send, 
  ArrowLeft, 
  Check, 
  CheckCheck,
  Phone,
  Video,
  Info,
  Archive,
  Trash2,
  Inbox,
  Plus,
  Users,
  Briefcase,
  Image as ImageIcon,
  FileText,
  X,
  Camera,
  File,
  Mic
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// --- Types ---

interface Attachment {
  type: 'image' | 'file';
  url: string;
  name: string;
  size?: string;
}

interface Message {
  id: string;
  text?: string;
  attachment?: Attachment;
  timestamp: string;
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

interface Thread {
  id: string;
  type: 'dm' | 'group';
  projectContext?: string; // e.g. "FinCore Ledger"
  groupName?: string; // Only for groups
  participants: Contact[]; // List of people in chat
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  isArchived?: boolean;
}

type FilterType = 'all' | 'unread' | 'archived';

// --- Mock Data ---

const MOCK_CONTACTS: Contact[] = [
  { id: "c1", name: "Sarah Jenkins", role: "CTO @ FinCore", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop", status: "online" },
  { id: "c2", name: "David Kim", role: "Product Manager", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop", status: "busy" },
  { id: "c3", name: "Marcus Johnson", role: "UX Director", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", status: "offline" },
  { id: "c4", name: "Elena Rodriguez", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop", status: "online" },
  { id: "c5", name: "Priya Patel", role: "AI Specialist", avatar: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?q=80&w=200&auto=format&fit=crop", status: "online" }
];

const INITIAL_THREADS: Thread[] = [
  {
    id: "t1",
    type: 'dm',
    participants: [MOCK_CONTACTS[0]],
    lastMessage: "The new API endpoints are working perfectly.",
    lastMessageTime: "10:42 AM",
    unreadCount: 2,
    messages: [
      { id: "m1", text: "Hi Alex, just checking in on the API migration.", timestamp: "Yesterday", isMe: false, status: 'read' },
      { id: "m2", text: "We're on track. Deployment is scheduled for tonight.", timestamp: "Yesterday", isMe: true, status: 'read' },
      { id: "m3", text: "Great to hear. Let me know when it's live.", timestamp: "Yesterday", isMe: false, status: 'read' },
      { id: "m4", text: "It's live now. You can check the staging environment.", timestamp: "10:30 AM", isMe: true, status: 'read' },
      { id: "m5", text: "The new API endpoints are working perfectly. Thanks for the quick turnaround!", timestamp: "10:42 AM", isMe: false, status: 'read' }
    ]
  },
  {
    id: "t2",
    type: 'dm',
    participants: [MOCK_CONTACTS[1]],
    lastMessage: "Can we reschedule the sprint review?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      { id: "m1", text: "Hey, do you have a minute?", timestamp: "Mon", isMe: false, status: 'read' },
      { id: "m2", text: "Sure, what's up?", timestamp: "Mon", isMe: true, status: 'read' },
      { id: "m3", text: "Can we reschedule the sprint review to Thursday?", timestamp: "Yesterday", isMe: false, status: 'read' }
    ]
  },
  {
    id: "t3",
    type: 'group',
    groupName: "Design Handoff",
    projectContext: "HealthVantage App",
    participants: [MOCK_CONTACTS[2], MOCK_CONTACTS[3]],
    lastMessage: "I've uploaded the new Figma designs.",
    lastMessageTime: "Oct 24",
    unreadCount: 0,
    messages: [
      { id: "m1", text: "I've uploaded the new Figma designs for the dashboard.", timestamp: "Oct 24", isMe: false, status: 'read' }
    ]
  }
];

// --- Sub-Components ---

const Avatar = ({ src, alt, status, size = "md", isGroup = false }: { src?: string, alt?: string, status?: Contact['status'], size?: "sm" | "md" | "lg" | "xl", isGroup?: boolean }) => {
  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12", xl: "w-20 h-20" };
  const statusColors = { online: "bg-[#00F866]", offline: "bg-gray-500", busy: "bg-red-500" };

  return (
    <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
      {isGroup ? (
        <div className="w-full h-full rounded-2xl bg-[#2a2a2a] border border-white/10 flex items-center justify-center text-white/50">
            <Users size={size === 'sm' ? 14 : 20} />
        </div>
      ) : (
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover border border-white/10" />
      )}
      
      {status && !isGroup && (
        <div className={`absolute bottom-0 right-0 w-[30%] h-[30%] rounded-full border-2 border-[#1f1f1f] ${statusColors[status]}`} />
      )}
    </div>
  );
};

// --- Modal Component ---

const CreateGroupModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean, onClose: () => void, onCreate: (data: any) => void }) => {
    const [groupName, setGroupName] = useState("");
    const [context, setContext] = useState("general");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    if (!isOpen) return null;

    const handleCreate = () => {
        if (!groupName.trim()) return;
        onCreate({ groupName, context, selectedMembers });
        // Reset
        setGroupName("");
        setContext("general");
        setSelectedMembers([]);
    };

    const toggleMember = (id: string) => {
        setSelectedMembers(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#242424] border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-righteous text-xl text-white">Create New Group</h3>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10">
                        <X size={20} />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-white/40 font-poppins uppercase font-bold mb-2 block">Group Name</label>
                        <input 
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F866]/50 placeholder:text-white/20"
                            placeholder="e.g. Q4 Sprint Planning"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-white/40 font-poppins uppercase font-bold mb-2 block">Project Context</label>
                        <Select value={context} onValueChange={setContext}>
                            <SelectTrigger className="w-full bg-[#1f1f1f] border-white/10 text-white h-12 rounded-xl">
                                <SelectValue placeholder="Select Project" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#242424] border-white/10 text-white">
                                <SelectItem value="general">General Team</SelectItem>
                                <SelectItem value="FinCore Ledger">FinCore Ledger</SelectItem>
                                <SelectItem value="HealthVantage">HealthVantage App</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-xs text-white/40 font-poppins uppercase font-bold mb-2 block">Add Members</label>
                        <div className="max-h-40 overflow-y-auto custom-scrollbar border border-white/5 rounded-xl bg-[#1f1f1f] p-2 space-y-1">
                            {MOCK_CONTACTS.map(contact => (
                                <div 
                                    key={contact.id}
                                    onClick={() => toggleMember(contact.id)}
                                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${selectedMembers.includes(contact.id) ? 'bg-[#00F866]/20' : 'hover:bg-white/5'}`}
                                >
                                    <Avatar src={contact.avatar} alt={contact.name} size="sm" />
                                    <span className={`text-sm ${selectedMembers.includes(contact.id) ? 'text-[#00F866]' : 'text-white'}`}>{contact.name}</span>
                                    {selectedMembers.includes(contact.id) && <Check size={14} className="ml-auto text-[#00F866]" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button 
                        onClick={handleCreate} 
                        className="w-full h-12 mt-2 bg-[#00F866] text-black font-righteous text-lg hover:bg-[#00F866]/90 rounded-xl"
                    >
                        Create Group
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Component ---

export const MessagesView = (): React.JSX.Element => {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [newMessageText, setNewMessageText] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  
  // Attachments
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedThread = threads.find(t => t.id === selectedThreadId);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (selectedThreadId) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedThreadId, selectedThread?.messages]);

  // Mark as read when opening
  useEffect(() => {
    if (selectedThreadId) {
      setThreads(prev => prev.map(t => 
        t.id === selectedThreadId ? { ...t, unreadCount: 0 } : t
      ));
    }
  }, [selectedThreadId]);

  // Click outside to close attach menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.attach-menu-container')) {
        setShowAttachMenu(false);
      }
    };
    if (showAttachMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showAttachMenu]);

  const filteredThreads = threads.filter(t => {
    const searchTarget = t.type === 'group' ? t.groupName : t.participants[0].name;
    const matchesSearch = searchTarget?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'unread') return t.unreadCount > 0 && !t.isArchived;
    if (activeFilter === 'archived') return t.isArchived;
    return !t.isArchived; 
  });

  const handleSendMessage = (e?: React.FormEvent, attachment?: Attachment) => {
    e?.preventDefault();
    if ((!newMessageText.trim() && !attachment) || !selectedThreadId) return;

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      text: newMessageText,
      attachment: attachment,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent'
    };

    setThreads(prev => prev.map(t => {
      if (t.id === selectedThreadId) {
        return {
          ...t,
          lastMessage: attachment ? (attachment.type === 'image' ? 'Sent an image' : 'Sent a file') : newMessageText,
          lastMessageTime: "Just now",
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));

    setNewMessageText("");
  };

  const handleArchiveThread = (id: string, archive: boolean) => {
      setThreads(prev => prev.map(t => 
          t.id === id ? { ...t, isArchived: archive } : t
      ));
      if (selectedThreadId === id) setSelectedThreadId(null);
  };

  const handleDeleteThread = (id: string) => {
      setThreads(prev => prev.filter(t => t.id !== id));
      if (selectedThreadId === id) {
          setSelectedThreadId(null);
          setShowInfo(false);
      }
  };

  const handleCreateGroup = (data: any) => {
      const newParticipants = MOCK_CONTACTS.filter(c => data.selectedMembers.includes(c.id));
      
      const newGroup: Thread = {
          id: `t-${Date.now()}`,
          type: 'group',
          groupName: data.groupName,
          projectContext: data.context !== 'general' ? data.context : undefined,
          participants: newParticipants,
          lastMessage: "Group created",
          lastMessageTime: "Just now",
          unreadCount: 0,
          messages: [],
          isArchived: false
      };

      setThreads(prev => [newGroup, ...prev]);
      setShowCreateModal(false);
      setSelectedThreadId(newGroup.id);
  };

  const triggerFileUpload = (type: string) => {
      if (fileInputRef.current) {
          if (type === 'image') fileInputRef.current.accept = "image/*";
          else fileInputRef.current.accept = "*/*";
          fileInputRef.current.click();
      }
      setShowAttachMenu(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      // Simulate upload delay
      setTimeout(() => {
          const type = file.type.startsWith('image/') ? 'image' : 'file';
          const attachment: Attachment = {
              type,
              url: type === 'image' ? URL.createObjectURL(file) : '#',
              name: file.name,
              size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
          };
          
          handleSendMessage(undefined, attachment);
          setIsUploading(false);
          // Clear input
          if (fileInputRef.current) fileInputRef.current.value = "";
      }, 1500);
  };

  // Helper to get display name/avatar
  const getThreadInfo = (t: Thread) => {
      if (t.type === 'group') {
          return {
              name: t.groupName || "Unnamed Group",
              avatar: "",
              role: t.projectContext || "Team Group",
              status: undefined,
              isGroup: true
          };
      }
      const p = t.participants[0];
      return {
          name: p.name,
          avatar: p.avatar,
          role: p.role,
          status: p.status,
          isGroup: false
      };
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
      
      <CreateGroupModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onCreate={handleCreateGroup} 
      />

      {/* --- Sidebar: Thread List --- */}
      <div className={`
        flex-col w-full lg:w-[380px] bg-[#242424] border border-white/5 rounded-3xl flex overflow-hidden flex-shrink-0 transition-all duration-300
        ${selectedThreadId ? 'hidden lg:flex' : 'flex'}
      `}>
        
        {/* Header: Search & Filter */}
        <div className="p-4 border-b border-white/5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                        type="text" 
                        placeholder="Search messages..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#1f1f1f] border border-white/5 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00F866]/50 placeholder:text-white/20 transition-all"
                    />
                </div>
                <Button 
                    onClick={() => setShowCreateModal(true)}
                    size="icon" 
                    className="h-11 w-11 rounded-xl bg-[#00F866] text-black hover:bg-[#00F866]/90 shadow-lg shadow-[#00F866]/10"
                >
                    <Plus size={20} />
                </Button>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {(['all', 'unread', 'archived'] as FilterType[]).map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`
                            px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all whitespace-nowrap
                            ${activeFilter === filter 
                                ? 'bg-[#00F866] text-black' 
                                : 'bg-[#1f1f1f] text-white/60 hover:text-white border border-white/5'}
                        `}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredThreads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/30 gap-2 p-8 text-center">
                    <Inbox size={32} strokeWidth={1.5} />
                    <p className="text-sm">No messages found</p>
                </div>
            ) : (
                <div className="flex flex-col">
                    {filteredThreads.map((thread) => {
                        const info = getThreadInfo(thread);
                        return (
                            <div 
                                key={thread.id}
                                onClick={() => setSelectedThreadId(thread.id)}
                                className={`
                                    flex gap-3 p-4 cursor-pointer transition-colors border-b border-white/5 last:border-0
                                    ${selectedThreadId === thread.id ? 'bg-[#00F866]/10' : 'hover:bg-white/5'}
                                `}
                            >
                                <Avatar src={info.avatar} alt={info.name} status={info.status as any} isGroup={info.isGroup} />
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h4 className={`text-sm font-medium truncate ${selectedThreadId === thread.id ? 'text-[#00F866]' : 'text-white'}`}>
                                            {info.name}
                                        </h4>
                                        <span className="text-[10px] text-white/40 whitespace-nowrap ml-2">{thread.lastMessageTime}</span>
                                    </div>
                                    <p className={`text-xs truncate ${thread.unreadCount > 0 ? 'text-white font-medium' : 'text-white/50'}`}>
                                        {thread.lastMessage}
                                    </p>
                                </div>

                                {thread.unreadCount > 0 && (
                                    <div className="flex flex-col justify-center items-end pl-2">
                                        <Badge className="bg-[#00F866] text-black h-5 min-w-[20px] px-1 flex items-center justify-center text-[10px]">
                                            {thread.unreadCount}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
      </div>

      {/* --- Main Chat Area --- */}
      <div className={`
        flex-1 bg-[#242424] border border-white/5 rounded-3xl flex flex-col overflow-hidden relative transition-all duration-300
        ${!selectedThreadId ? 'hidden lg:flex' : 'flex'}
      `}>
          {selectedThread ? (
              <>
                {/* Chat Header */}
                <div className="h-[72px] px-6 border-b border-white/5 flex items-center justify-between bg-[#242424] z-10">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="lg:hidden -ml-2 text-white/60" onClick={() => setSelectedThreadId(null)}>
                            <ArrowLeft size={20} />
                        </Button>
                        <Avatar 
                            src={getThreadInfo(selectedThread).avatar} 
                            alt={getThreadInfo(selectedThread).name} 
                            status={getThreadInfo(selectedThread).status as any}
                            isGroup={getThreadInfo(selectedThread).isGroup}
                            size="sm" 
                        />
                        <div>
                            <h3 className="text-white font-medium text-sm md:text-base leading-tight">
                                {getThreadInfo(selectedThread).name}
                            </h3>
                            <p className="text-[#00F866] text-xs leading-tight">
                                {getThreadInfo(selectedThread).role}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 md:gap-2">
                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-[#00F866] hover:bg-[#00F866]/10">
                            <Phone size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-[#00F866] hover:bg-[#00F866]/10">
                            <Video size={18} />
                        </Button>
                        <div className="h-6 w-px bg-white/10 mx-1" />
                        <Button 
                            variant="ghost" size="icon" 
                            className={`transition-colors ${showInfo ? 'text-white bg-white/10' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setShowInfo(!showInfo)}
                        >
                            <Info size={18} />
                        </Button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#1f1f1f]/50">
                    <div className="flex justify-center">
                        <span className="text-[10px] bg-white/5 text-white/30 px-3 py-1 rounded-full border border-white/5">
                            Today
                        </span>
                    </div>
                    
                    {selectedThread.messages.map((msg) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] md:max-w-[65%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                {msg.attachment && (
                                    <div className={`
                                        mb-1 rounded-2xl overflow-hidden border border-white/10
                                        ${msg.attachment.type === 'image' ? 'max-w-[250px]' : 'p-3 bg-[#2a2a2a] flex items-center gap-3 min-w-[200px]'}
                                    `}>
                                        {msg.attachment.type === 'image' ? (
                                            <img src={msg.attachment.url} alt="attachment" className="w-full h-auto" />
                                        ) : (
                                            <>
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#00F866]">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-sm text-white truncate">{msg.attachment.name}</p>
                                                    <p className="text-xs text-white/40">{msg.attachment.size}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                                
                                {msg.text && (
                                    <div className={`
                                        px-4 py-3 rounded-2xl text-sm leading-relaxed relative
                                        ${msg.isMe 
                                            ? 'bg-[#00F866] text-black rounded-tr-sm shadow-[0_0_15px_rgba(0,248,102,0.1)]' 
                                            : 'bg-[#2a2a2a] text-white rounded-tl-sm border border-white/5'}
                                    `}>
                                        {msg.text}
                                    </div>
                                )}
                                <div className="flex items-center gap-1 mt-1 text-[10px] text-white/30 px-1">
                                    <span>{msg.timestamp}</span>
                                    {msg.isMe && (
                                        msg.status === 'read' ? <CheckCheck size={12} className="text-[#00F866]" /> : <Check size={12} />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {isUploading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                            <div className="bg-[#2a2a2a] text-white/60 px-4 py-2 rounded-2xl text-xs flex items-center gap-2 border border-white/5">
                                <div className="w-3 h-3 border-2 border-white/20 border-t-[#00F866] rounded-full animate-spin" />
                                Uploading attachment...
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-[#242424] z-10 relative">
                    {/* Attachment Options Menu */}
                    <AnimatePresence>
                        {showAttachMenu && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-[calc(100%+8px)] left-4 bg-[#2a2a2a] border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-20 attach-menu-container min-w-[160px]"
                            >
                                <button 
                                    onClick={() => triggerFileUpload('doc')}
                                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-white/80 hover:text-white transition-colors text-sm font-medium text-left"
                                >
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <FileText size={16} />
                                    </div>
                                    Document
                                </button>
                                <button 
                                    onClick={() => triggerFileUpload('image')}
                                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-white/80 hover:text-white transition-colors text-sm font-medium text-left"
                                >
                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                                        <Camera size={16} />
                                    </div>
                                    Camera
                                </button>
                                <button 
                                    onClick={() => triggerFileUpload('image')}
                                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-white/80 hover:text-white transition-colors text-sm font-medium text-left"
                                >
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                        <ImageIcon size={16} />
                                    </div>
                                    Gallery
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSendMessage} className="flex items-end gap-3 bg-[#1f1f1f] border border-white/5 rounded-2xl p-2 focus-within:border-[#00F866]/50 focus-within:shadow-[0_0_20px_rgba(0,248,102,0.05)] transition-all relative z-10">
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                        
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAttachMenu(!showAttachMenu);
                            }}
                            className={`text-white/40 hover:text-white h-10 w-10 mb-0.5 rounded-xl hover:bg-white/5 transition-transform duration-300 attach-menu-container ${showAttachMenu ? 'rotate-45 text-white bg-white/10' : ''}`}
                        >
                            <Plus size={22} />
                        </Button>
                        
                        <textarea
                            value={newMessageText}
                            onChange={(e) => setNewMessageText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none outline-none text-white text-sm py-3 min-h-[44px] max-h-[120px] resize-none placeholder:text-white/20"
                            rows={1}
                        />

                        <Button 
                            type="submit" 
                            disabled={!newMessageText.trim()}
                            className="h-10 w-10 p-0 rounded-xl bg-[#00F866] text-black hover:bg-[#00F866]/90 disabled:bg-white/10 disabled:text-white/20 mb-0.5 transition-all"
                        >
                            {newMessageText.trim() ? <Send size={18} className="ml-0.5" /> : <Mic size={20} />}
                        </Button>
                    </form>
                </div>
              </>
          ) : (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center text-white/30 gap-6 p-8">
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                      <Send size={40} className="ml-2" />
                  </div>
                  <div className="text-center">
                      <h3 className="text-white text-xl font-righteous mb-2">Select a Conversation</h3>
                      <p className="max-w-xs text-sm">Choose a thread from the list to view details or start a new message.</p>
                  </div>
              </div>
          )}
      </div>

      {/* --- Right Info Panel (Collapsible) --- */}
      <AnimatePresence>
        {showInfo && selectedThread && (
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-[#242424] border border-white/5 rounded-3xl overflow-hidden flex-shrink-0 flex flex-col hidden xl:flex"
            >
                <div className="p-6 flex flex-col items-center border-b border-white/5">
                    <Avatar 
                        src={getThreadInfo(selectedThread).avatar} 
                        alt={getThreadInfo(selectedThread).name} 
                        size="xl" 
                        isGroup={getThreadInfo(selectedThread).isGroup}
                    />
                    <h3 className="mt-4 font-righteous text-xl text-white text-center">{getThreadInfo(selectedThread).name}</h3>
                    <p className="text-[#00F866] text-xs mt-1 text-center">{getThreadInfo(selectedThread).role}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Participants */}
                    {selectedThread.type === 'group' && (
                        <div>
                            <h4 className="text-xs text-white/40 uppercase font-bold mb-3 tracking-wider">Participants</h4>
                            <div className="space-y-2">
                                {selectedThread.participants.map(p => (
                                    <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                        <Avatar src={p.avatar} alt={p.name} size="sm" status={p.status as any} />
                                        <div className="overflow-hidden">
                                            <p className="text-sm text-white truncate">{p.name}</p>
                                            <p className="text-[10px] text-white/40 truncate">{p.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Shared Media Mockup */}
                    <div>
                        <h4 className="text-xs text-white/40 uppercase font-bold mb-3 tracking-wider">Shared Media</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/5 flex items-center justify-center text-white/20 hover:bg-white/10 cursor-pointer">
                                    <ImageIcon size={16} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div>
                        <h4 className="text-xs text-red-400/60 uppercase font-bold mb-3 tracking-wider">Danger Zone</h4>
                        <Button 
                            variant="outline" 
                            onClick={() => handleDeleteThread(selectedThread.id)}
                            className="w-full justify-start text-red-400 border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
                        >
                            <Trash2 size={16} className="mr-2" /> Delete Conversation
                        </Button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
