
"use client";
import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Quote,
  CheckCircle2,
  ArrowRight,
  Link as LinkIcon,
  Check,
  Sparkles
} from "lucide-react";

// --- Mock Data for Preview ---
const postData = {
  title: "Revolutionizing Fintech: Scaling FinCore Ledger to 10M Transactions",
  subtitle: "How we replaced legacy infrastructure with AI-driven microservices to achieve sub-second reconciliation.",
  category: "Case Study",
  date: "October 14, 2023",
  readTime: "8 min read",
  author: {
    name: "Alex Sterling",
    role: "CEO & Co-Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
  },
  coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
  tags: ["Fintech", "AI Integration", "Cloud Architecture", "Scaling"],
  content: [
    {
      type: "paragraph",
      text: "In the rapidly evolving world of financial technology, speed and security aren't just features—they are the very foundation of trust. When FinCore approached us with the challenge of scaling their ledger system, they were hitting a glass ceiling. Their existing infrastructure, built on legacy SQL architecture, was buckling under the pressure of 500k daily transactions."
    },
    {
      type: "heading",
      text: "The Challenge: Bottlenecks & False Positives"
    },
    {
      type: "paragraph",
      text: "The primary issue wasn't just volume; it was the reconciliation speed. FinCore's settlement times were drifting from near-real-time to T+1, unacceptable for their high-frequency trading clients. Furthermore, their fraud detection system was rule-based, generating false positives that required manual review, slowing down the pipeline even further."
    },
    {
      type: "quote",
      text: "We needed a partner who didn't just understand code, but understood the mathematics of high-velocity finance. Qodet was that partner.",
      author: "Sarah Jenkins, CTO at FinCore"
    },
    {
      type: "heading",
      text: "The Solution: AI-Driven Architecture"
    },
    {
      type: "paragraph",
      text: "We proposed a radical overhaul: moving from a monolithic architecture to an event-driven microservices ecosystem powered by Apache Kafka. But the real game-changer was the integration of our proprietary anomaly detection model."
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2670&auto=format&fit=crop",
      alt: "Data visualization of the new architecture"
    },
    {
      type: "paragraph",
      text: "By implementing a custom Transformer model trained on FinCore's historical data, we shifted fraud detection from static rules to dynamic behavioral analysis. The system could now flag anomalies in milliseconds with 99.9% accuracy, allowing legitimate high-volume transactions to flow unimpeded."
    },
    {
      type: "heading",
      text: "Key Results"
    },
    {
      type: "list",
      items: [
        "Transaction capacity increased by 20x to 10M daily.",
        "Settlement times reduced to <500ms.",
        "False positive fraud alerts dropped by 85%.",
        "Infrastructure costs reduced by 40% via optimized cloud usage."
      ]
    },
    {
        type: "paragraph",
        text: "The success of FinCore Ledger demonstrates that with the right architectural decisions and intelligent application of AI, legacy systems can be transformed into market-leading platforms. We are continuing to partner with FinCore as they expand into new markets."
    }
  ]
};

export const BlogPage = (): React.JSX.Element => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Vector Graphic for decoration
  const vectorBlog = (
    <svg
      width="391"
      height="103"
      viewBox="0 0 391 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 top-0 w-[60%] h-auto pointer-events-none select-none opacity-20"
    >
      <path
        d="M12.2285 70.7687L304.052 12.317C306.476 11.8315 307.452 15.3116 305.129 16.1573L111.629 86.6134C109.341 87.4466 110.247 90.8715 112.648 90.4645L378.229 45.4478"
        stroke="#00F866"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-[#1f1f1f]">
      <Navbar />
      
      <main className="pt-[100px] pb-20 relative">
        {/* Background Gradients */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
           <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#00F866] opacity-[0.03] blur-[150px] rounded-full" />
           <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-[#00885A] opacity-[0.04] blur-[150px] rounded-full" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-10 relative z-10">
          
          {/* Back Button */}
          <div className="mb-8">
            <Button 
                variant="ghost" 
                className="text-white/60 hover:text-[#00F866] hover:bg-transparent pl-0 gap-2 transition-colors"
                onClick={() => window.history.back()}
            >
                <ArrowLeft size={20} /> Back to Success Stories
            </Button>
          </div>

          {/* Header Section */}
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex flex-wrap items-center gap-3">
               <Badge className="bg-[#00F866] text-black hover:bg-[#00F866] border-0 px-3 py-1 font-semibold">
                  {postData.category}
               </Badge>
               <span className="text-white/40 flex items-center gap-2 text-sm font-poppins">
                  <Calendar size={14} /> {postData.date}
               </span>
               <span className="text-white/40 flex items-center gap-2 text-sm font-poppins border-l border-white/10 pl-3">
                  <Clock size={14} /> {postData.readTime}
               </span>
            </div>

            <h1 className="font-righteous text-4xl md:text-5xl lg:text-[64px] text-white leading-[1.1] max-w-4xl">
               {postData.title}
            </h1>
            
            <p className="font-poppins text-xl text-[#d5d5d5] max-w-3xl leading-relaxed">
               {postData.subtitle}
            </p>

            {/* Author Block */}
            <div className="flex items-center gap-4 mt-2">
                <img 
                    src={postData.author.image} 
                    alt={postData.author.name} 
                    className="w-12 h-12 rounded-full border border-white/20 object-cover"
                />
                <div>
                    <p className="text-white font-righteous text-lg leading-none">{postData.author.name}</p>
                    <p className="text-[#00F866] text-sm font-poppins">{postData.author.role}</p>
                </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-16 group">
             <img 
                src={postData.coverImage} 
                alt="Case Study Cover" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-transparent opacity-60" />
             {vectorBlog}
          </div>

          {/* Layout: Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content (8 Cols) */}
            <div className="lg:col-span-8">
               <div className="flex flex-col gap-8 font-poppins text-[#d5d5d5] leading-8 text-lg">
                  {postData.content.map((block, idx) => {
                      if (block.type === 'paragraph') {
                          return <p key={idx}>{block.text}</p>;
                      }
                      if (block.type === 'heading') {
                          return <h2 key={idx} className="font-righteous text-3xl text-white mt-4">{block.text}</h2>;
                      }
                      if (block.type === 'quote') {
                          return (
                              <blockquote key={idx} className="relative p-8 rounded-2xl bg-[#242424] border-l-4 border-[#00F866] my-6">
                                  <Quote className="absolute top-4 left-4 text-[#00F866]/20 w-10 h-10" />
                                  <p className="relative z-10 font-righteous text-xl md:text-2xl text-white italic leading-relaxed">
                                    "{block.text}"
                                  </p>
                                  {block.author && (
                                      <footer className="mt-4 text-[#00F866] font-medium text-sm">— {block.author}</footer>
                                  )}
                              </blockquote>
                          );
                      }
                      if (block.type === 'list') {
                          return (
                              <ul key={idx} className="flex flex-col gap-3 my-2">
                                  {block.items?.map((item, i) => (
                                      <li key={i} className="flex items-start gap-3">
                                          <CheckCircle2 className="w-6 h-6 text-[#00F866] flex-shrink-0 mt-1" />
                                          <span>{item}</span>
                                      </li>
                                  ))}
                              </ul>
                          );
                      }
                      if (block.type === 'image') {
                          return (
                              <div key={idx} className="my-6 rounded-2xl overflow-hidden border border-white/10">
                                  <img src={block.src} alt={block.alt} className="w-full h-auto" />
                                  {block.alt && <p className="text-sm text-center text-white/40 mt-2 italic">{block.alt}</p>}
                              </div>
                          );
                      }
                      return null;
                  })}
               </div>

               {/* Post-content Tags */}
               <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-2">
                   {postData.tags.map(tag => (
                       <Badge key={tag} variant="outline" className="border-white/10 text-white/60 hover:text-[#00F866] hover:border-[#00F866] px-3 py-1.5 cursor-pointer">
                           #{tag}
                       </Badge>
                   ))}
               </div>
            </div>

            {/* Sidebar (4 Cols) - Sticky */}
            <aside className="lg:col-span-4 relative">
               <div className="sticky top-28 flex flex-col gap-6">
                   
                   {/* Share Widget */}
                   <div className="bg-[#242424] border border-white/5 p-6 rounded-3xl shadow-xl">
                       <h3 className="font-righteous text-white text-lg mb-4 flex items-center gap-2">
                           Share Article <Share2 size={16} className="text-[#00F866]"/>
                       </h3>
                       <div className="grid grid-cols-4 gap-2">
                           {/* Copy Link */}
                           <Button 
                              onClick={copyToClipboard}
                              className={`h-12 border border-white/10 bg-[#1f1f1f] hover:bg-[#00F866] hover:text-black hover:border-[#00F866] transition-all group ${isCopied ? 'bg-[#00F866]/20 border-[#00F866] text-[#00F866]' : 'text-white/60'}`}
                              title="Copy Link"
                           >
                               {isCopied ? <Check size={18} /> : <LinkIcon size={18} />}
                           </Button>
                           
                           {/* LinkedIn */}
                           <Button className="h-12 border border-white/10 bg-[#1f1f1f] hover:bg-[#0077b5] text-white/60 hover:text-white hover:border-transparent transition-all">
                               <Linkedin size={18} />
                           </Button>
                           
                           {/* Twitter */}
                           <Button className="h-12 border border-white/10 bg-[#1f1f1f] hover:bg-black text-white/60 hover:text-white hover:border-white/20 transition-all">
                               <Twitter size={18} />
                           </Button>
                           
                           {/* Facebook */}
                           <Button className="h-12 border border-white/10 bg-[#1f1f1f] hover:bg-[#1877F2] text-white/60 hover:text-white hover:border-transparent transition-all">
                               <Facebook size={18} />
                           </Button>
                       </div>
                       {isCopied && <p className="text-[#00F866] text-xs mt-3 text-center font-poppins animate-in fade-in slide-in-from-top-1">Link copied to clipboard!</p>}
                   </div>

                   {/* CTA Widget (Green Theme) */}
                   <div className="bg-[#00F866] p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                       {/* Background Effects */}
                       <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white opacity-20 blur-3xl rounded-full pointer-events-none" />
                       <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-black opacity-5 blur-2xl rounded-full pointer-events-none" />
                       
                       <div className="relative z-10 flex flex-col gap-4">
                           <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center text-black shadow-sm mb-2 backdrop-blur-sm">
                               <Sparkles size={24} />
                           </div>
                           
                           <h3 className="font-righteous text-3xl text-black leading-tight tracking-tight">
                               Need results <br/> like this?
                           </h3>
                           
                           <p className="font-poppins text-black/70 text-sm leading-relaxed font-medium">
                               Let's build scalable, AI-powered solutions tailored to your specific needs.
                           </p>
                           
                           <Button className="w-full mt-2 h-14 bg-black text-white hover:bg-black/80 font-righteous text-lg rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-[1.02]">
                               Book a Call <ArrowRight size={18} className="ml-2" />
                           </Button>
                       </div>
                   </div>

                   {/* Newsletter / Related */}
                    <div className="bg-[#242424] border border-white/5 p-6 rounded-2xl shadow-xl">
                       <h3 className="font-righteous text-white text-lg mb-4">Related Topics</h3>
                       <ul className="flex flex-col gap-3">
                           {["The Future of AI in Banking", "Microservices vs Monolith", "AWS Cloud Optimization Strategies"].map((topic, i) => (
                               <li key={i}>
                                   <a href="#" className="text-white/60 hover:text-[#00F866] text-sm font-poppins transition-colors flex items-center justify-between group">
                                       {topic}
                                       <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                   </a>
                               </li>
                           ))}
                       </ul>
                   </div>

               </div>
            </aside>
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
};
