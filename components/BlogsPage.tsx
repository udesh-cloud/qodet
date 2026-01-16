
"use client";
import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Bookmark, 
  ArrowRight, 
  Sparkles,
  Search,
  TrendingUp,
  Flag,
  XCircle,
  Copy,
  Check,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavbar } from "../contexts/NavbarContext";

// --- Types ---
interface BlogPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  title: string;
  excerpt: string;
  category: "Case Study" | "Engineering" | "Design" | "Product";
  image: string;
  likes: number;
  comments: number;
  tags: string[];
}

// --- Mock Data ---
const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      role: "CTO @ FinCore"
    },
    date: "2 hours ago",
    title: "Revolutionizing Fintech: Scaling FinCore Ledger to 10M Transactions",
    excerpt: "How we replaced legacy infrastructure with AI-driven microservices to achieve sub-second reconciliation and reduced fraud by 85%.",
    category: "Case Study",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    likes: 124,
    comments: 42,
    tags: ["Fintech", "Scaling", "AI"]
  },
  {
    id: "2",
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      role: "Lead Engineer"
    },
    date: "5 hours ago",
    title: "The Death of the Monolith: A Practical Migration Guide",
    excerpt: "Breaking down a massive rails application into event-driven Go microservices. The pain points, the wins, and the code patterns we used.",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop",
    likes: 89,
    comments: 15,
    tags: ["Microservices", "Go", "Architecture"]
  },
  {
    id: "3",
    author: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      role: "UX Director"
    },
    date: "1 day ago",
    title: "Designing for Trust in AI Interfaces",
    excerpt: "User interfaces for AI shouldn't just be chat bubbles. Exploring how to visualize confidence scores and data provenance in enterprise dashboards.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop",
    likes: 256,
    comments: 64,
    tags: ["UX/UI", "AI", "Design System"]
  }
];

const CATEGORIES = ["All", "Case Study", "Engineering", "Design", "Product", "Culture"];

// --- Components ---

const PostCard = React.forwardRef<HTMLDivElement, { post: BlogPost }>(({ post }, ref) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [localComments, setLocalComments] = useState(post.comments);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLocalLikes(prev => prev - 1);
    } else {
      setLocalLikes(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    // Mock sharing by copying title
    const shareUrl = `https://qodet.com/library/post/${post.id}`; 
    navigator.clipboard.writeText(shareUrl);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
    setIsMenuOpen(false);
  };

  const handleComment = () => {
    // Mock comment action
    setLocalComments(prev => prev + 1);
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-[#242424] border border-white/5 rounded-3xl overflow-visible hover:border-[#00F866]/30 transition-all duration-300 shadow-xl group relative"
    >
      {/* Header */}
      <div className="p-5 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="relative">
             <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00F866] rounded-full border-2 border-[#242424]" />
          </div>
          <div>
            <h4 className="text-white font-medium text-sm hover:text-[#00F866] cursor-pointer transition-colors">{post.author.name}</h4>
            <p className="text-white/40 text-xs flex items-center gap-2">
              {post.author.role} • <span>{post.date}</span>
            </p>
          </div>
        </div>
        
        {/* Three Dots Menu */}
        <div className="relative">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white/40 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
                <MoreHorizontal size={20} />
            </button>
            
            {/* Dropdown Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <div className="fixed inset-0 z-10 cursor-default" onClick={() => setIsMenuOpen(false)} />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 10, x: 0 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden flex flex-col py-1"
                        >
                            <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white text-left transition-colors w-full">
                                <Flag size={14} className="text-white/60" /> Report Post
                            </button>
                            <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white text-left transition-colors w-full">
                                <XCircle size={14} className="text-white/60" /> Not Interested
                            </button>
                            <div className="h-px bg-white/5 my-1" />
                            <button 
                                onClick={handleShare}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white text-left transition-colors w-full"
                            >
                                {showCopied ? <Check size={14} className="text-[#00F866]" /> : <Copy size={14} className="text-white/60" />} 
                                {showCopied ? "Copied Link" : "Copy Link"}
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-4 flex flex-col gap-3">
         <h3 className="font-righteous text-xl md:text-2xl text-white leading-tight cursor-pointer hover:text-[#00F866] transition-colors">
            {post.title}
         </h3>
         <p className="font-poppins text-[#d5d5d5] text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
         </p>
         <div className="flex flex-wrap gap-2 mt-1">
             <Badge variant="outline" className="border-[#00F866]/20 text-[#00F866] bg-[#00F866]/5 hover:bg-[#00F866]/10 text-xs">
                 {post.category}
             </Badge>
             {post.tags.map(tag => (
                 <span key={tag} className="text-xs text-white/40 hover:text-white cursor-pointer transition-colors">#{tag}</span>
             ))}
         </div>
      </div>

      {/* Media */}
      <div className="w-full aspect-[16/9] bg-[#1f1f1f] relative group/image cursor-pointer overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors" />
        
        {/* Hover Read Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
           <Button className="bg-[#00F866]/90 text-black hover:bg-[#00F866] backdrop-blur-sm font-righteous shadow-lg rounded-full px-6">
              Read Article
           </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-4 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-6">
             <button 
                onClick={handleLike}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${liked ? 'text-[#ef4444]' : 'text-white/60 hover:text-[#ef4444]'}`}
             >
                <Heart size={20} className={liked ? "fill-current" : ""} />
                <span>{localLikes}</span>
             </button>
             
             <button 
                onClick={handleComment}
                className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-[#00F866] transition-colors"
             >
                <MessageSquare size={20} />
                <span>{localComments}</span>
             </button>

             <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-[#00F866] transition-colors relative"
             >
                <Share2 size={20} />
                {showCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#00F866] text-black text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                        Copied!
                    </span>
                )}
             </button>
         </div>

         <button 
            onClick={() => setSaved(!saved)}
            className={`transition-colors ${saved ? 'text-[#00F866]' : 'text-white/60 hover:text-white'}`}
         >
            <Bookmark size={20} className={saved ? "fill-current" : ""} />
         </button>
      </div>
    </motion.div>
  )
});
PostCard.displayName = "PostCard";

const SidebarWidget: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#242424] border border-white/5 rounded-3xl p-6 shadow-xl mb-6">
     <h3 className="font-righteous text-white text-lg mb-4 flex items-center gap-2">
        {title}
     </h3>
     {children}
  </div>
)

export const BlogsPage = (): React.JSX.Element => {
  const { show } = useNavbar();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => setIsLoadingMore(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#1f1f1f]">
      <Navbar />
      
      <main className="pt-[75px] pb-20 px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* --- Left Feed Column (8 Cols) --- */}
            <div className="lg:col-span-8 flex flex-col relative">
                
                {/* Search & Filter Bar */}
                <motion.div 
                    className="sticky z-30 bg-[#1f1f1f]/95 backdrop-blur-md border-b border-white/5 -mx-4 px-4 md:mx-0 md:px-0 py-3 mb-6"
                    initial={false}
                    animate={{ top: show ? 75 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide no-scrollbar pb-1">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                                    relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#00F866]
                                    ${activeCategory === cat ? "text-black" : "text-white/60 hover:text-white hover:bg-white/5"}
                                `}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-[#00F866] rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Posts Feed */}
                <div className="flex flex-col gap-8 min-h-[500px]">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post) => (
                           <PostCard key={post.id} post={post} />
                        ))}
                    </AnimatePresence>
                    
                    {/* Load More Trigger */}
                    <div className="flex justify-center py-8">
                        <Button 
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            variant="outline" 
                            className="h-12 px-8 border-[#00F866]/30 text-[#00F866] hover:bg-[#00F866] hover:text-black hover:border-[#00F866] transition-all font-righteous text-base rounded-xl group min-w-[200px]"
                        >
                            {isLoadingMore ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
                            ) : (
                                <>Load More Articles</>
                            )}
                        </Button>
                    </div>
                </div>

            </div>

            {/* --- Right Sidebar Column (4 Cols) --- */}
            <aside className="lg:col-span-4 hidden lg:block">
               <div className="sticky top-[100px] flex flex-col gap-6">
                   
                   {/* Search Widget */}
                   <div className="bg-[#242424] border border-white/5 rounded-full p-1.5 flex items-center shadow-lg focus-within:border-[#00F866]/50 transition-colors">
                       <div className="w-10 h-10 flex items-center justify-center text-white/40">
                          <Search size={18} />
                       </div>
                       <input 
                         type="text" 
                         placeholder="Search topics..." 
                         className="bg-transparent border-none outline-none text-white text-sm w-full pr-4 placeholder:text-white/20"
                       />
                   </div>

                   {/* Trending Topics */}
                   <SidebarWidget title="Trending Now">
                       <ul className="flex flex-col gap-4">
                           {[
                               { topic: "Generative AI", posts: "2.4k posts" },
                               { topic: "Microservices", posts: "1.8k posts" },
                               { topic: "UX Trends 2024", posts: "950 posts" },
                               { topic: "Web3 Finance", posts: "850 posts" }
                           ].map((item, idx) => (
                               <li key={idx} className="flex justify-between items-start group cursor-pointer">
                                   <div className="flex flex-col">
                                       <span className="text-white font-medium text-sm group-hover:text-[#00F866] transition-colors">{item.topic}</span>
                                       <span className="text-white/30 text-xs">{item.posts}</span>
                                   </div>
                                   <TrendingUp size={14} className="text-white/20 group-hover:text-[#00F866] mt-1" />
                               </li>
                           ))}
                       </ul>
                   </SidebarWidget>

                   {/* Recommended People */}
                   <SidebarWidget title="Who to Follow">
                       <ul className="flex flex-col gap-4">
                           {BLOG_POSTS.slice(0, 2).map((post, idx) => (
                               <li key={idx} className="flex items-center justify-between">
                                   <div className="flex items-center gap-3">
                                       <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                                       <div className="flex flex-col">
                                           <span className="text-white text-sm font-medium">{post.author.name}</span>
                                           <span className="text-white/40 text-xs truncate max-w-[120px]">{post.author.role}</span>
                                       </div>
                                   </div>
                                   <Button variant="outline" size="sm" className="h-8 border-[#00F866]/30 text-[#00F866] hover:bg-[#00F866] hover:text-black text-xs">
                                      Follow
                                   </Button>
                               </li>
                           ))}
                       </ul>
                   </SidebarWidget>

                   {/* CTA Widget (Green Theme) */}
                   <div className="bg-[#00F866] p-6 rounded-3xl shadow-xl relative overflow-hidden group">
                       {/* Background Effects */}
                       <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white opacity-20 blur-2xl rounded-full pointer-events-none" />
                       <div className="absolute bottom-[-20%] left-[-10%] w-24 h-24 bg-black opacity-5 blur-xl rounded-full pointer-events-none" />
                       
                       <div className="relative z-10 flex flex-col gap-3">
                           <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center text-black shadow-sm mb-1 backdrop-blur-sm">
                               <Sparkles size={20} />
                           </div>
                           
                           <h3 className="font-righteous text-2xl text-black leading-tight">
                               Need results?
                           </h3>
                           
                           <p className="font-poppins text-black/70 text-xs leading-relaxed font-medium">
                               Let's build scalable solutions tailored to your needs.
                           </p>
                           
                           <Button className="w-full mt-1 h-10 bg-black text-white hover:bg-black/80 font-righteous text-sm rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-[1.02]">
                               Book a Call <ArrowRight size={14} className="ml-2" />
                           </Button>
                       </div>
                   </div>

                   {/* Footer Links */}
                   <div className="flex flex-wrap gap-x-4 gap-y-2 px-2">
                       {["Privacy", "Terms", "Advertising", "Cookies", "Qodet © 2024"].map((link, i) => (
                           <a key={i} href="#" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">
                               {link}
                           </a>
                       ))}
                   </div>

               </div>
            </aside>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
