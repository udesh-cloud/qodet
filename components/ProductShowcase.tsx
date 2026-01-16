
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Wallet, 
  Users, 
  Zap, 
  ArrowRight
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

// --- Types ---
type Category = "All" | "Finance" | "Management" | "Sales" | "Marketing" | "Tech";

interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: React.ReactNode;
  tags: string[];
  images: string[];
}

// --- Data ---
const products: Product[] = [
  {
    id: "1",
    title: "FinCore Ledger",
    description: "Automated general ledger system with AI-driven anomaly detection and real-time reconciliation for enterprise fintech.",
    category: "Finance",
    icon: <Wallet className="w-12 h-12 text-[#00F866]" />,
    tags: ["Ledger", "AI Risk", "Compliance"],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", // Dashboard
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop", // Graph
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop"  // Crypto/Ledger
    ]
  },
  {
    id: "2",
    title: "TeamSync Pro",
    description: "Comprehensive project management suite focusing on resource allocation and agile sprint velocity tracking.",
    category: "Management",
    icon: <Users className="w-12 h-12 text-[#00F866]" />,
    tags: ["Agile", "Resource", "SaaS"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", // Analytics
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop", // Team
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"  // Planning
    ]
  },
  {
    id: "3",
    title: "SalesFlow AI",
    description: "Predictive lead scoring and automated outreach sequences designed to increase conversion rates by 40%.",
    category: "Sales",
    icon: <Zap className="w-12 h-12 text-[#00F866]" />,
    tags: ["CRM", "Automation", "Predictive"],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", // Data
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", // Metrics
      "https://images.unsplash.com/photo-1553877615-2a621575a8ef?q=80&w=800&auto=format&fit=crop"  // Tech
    ]
  }
];

const categories: Category[] = ["All", "Finance", "Management", "Sales", "Marketing", "Tech"];

// --- Individual Card Component ---
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-cycle images on hover
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered && product.images.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 2500); // Slightly slower for slide effect
    } else {
      setCurrentImageIndex(0); // Reset when not hovered
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-[#434343]/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-6 hover:border-[#00F866]/50 transition-colors duration-300 shadow-lg hover:shadow-[#00f866]/10">
        
        {/* Media Showcase Area */}
        <div className="relative w-full h-52 bg-[#2a2a2a] rounded-xl overflow-hidden border border-[#393939] group-hover:border-[#00F866]/30 transition-colors">
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.div
                key="carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Image Slide Container */}
                <div className="relative w-full h-full overflow-hidden">
                    <AnimatePresence initial={false} mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={product.images[currentImageIndex]}
                        alt={`${product.title} preview`}
                        initial={{ x: "100%", opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0.5 }}
                        transition={{ 
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    </AnimatePresence>
                </div>
                
                {/* Overlay gradient for text readability if we put text over it, 
                    but here it adds depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f]/80 to-transparent opacity-60 pointer-events-none" />
                
                {/* Carousel Indicator Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {product.images.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-[#00F866]' : 'w-1.5 bg-white/50'}`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat"
              >
                <div className="absolute inset-0 bg-[#00F866]/5" />
                <div className="relative z-10 p-6 rounded-2xl bg-[#1f1f1f] border border-[#393939] shadow-2xl group-hover:scale-110 transition-transform duration-500">
                   {product.icon}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 flex-grow px-2">
          <div className="flex justify-between items-start">
             <h3 className="font-righteous text-2xl md:text-3xl text-white group-hover:text-[#00F866] transition-colors">
              {product.title}
            </h3>
            <Badge variant="outline" className="border-white/10 text-white/60 bg-transparent px-3 py-1 text-sm shrink-0">
              {product.category}
            </Badge>
          </div>
         
          <p className="font-poppins text-base text-[#d5d5d5] leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {product.tags.map(tag => (
              <span key={tag} className="text-xs uppercase tracking-wider font-semibold text-[#00F866]/80 bg-[#00F866]/10 px-3 py-1.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto px-2">
          <span className="text-base font-medium text-white/50 group-hover:text-white transition-colors">
            View Details
          </span>
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 shadow-lg">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Showcase Component ---
export const ProductShowcase = (): React.JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const vectorProduct = (
    <svg
      width="219"
      height="81"
      viewBox="0 0 219 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto pointer-events-none select-none z-0"
    >
      <path
        opacity="0.5"
        d="M12.2281 38.95L172.719 12.2869C175.05 11.8997 176.008 15.1643 173.837 16.0974L60.76 64.6996C58.6454 65.6085 59.4874 68.7831 61.7745 68.5244L206.433 52.1619"
        stroke="#00885A"
        strokeWidth="24.4528"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <section id="product-showcase" className="w-full bg-[#1f1f1f] py-16 px-4 md:px-10 min-h-screen relative overflow-hidden">
      
      {/* Background Decor: Randomly Blurred Squares */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          {/* Top Right - Large Green */}
          <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-[#00F866] opacity-[0.08] blur-[100px] rotate-12 rounded-3xl" />
          
          {/* Bottom Left - Darker Green */}
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#00885A] opacity-[0.1] blur-[120px] -rotate-12 rounded-3xl" />
          
          {/* Middle Left - Small Accent */}
          <div className="absolute top-[30%] left-[5%] w-48 h-48 bg-[#00F866] opacity-[0.05] blur-[60px] rotate-45 rounded-xl" />
          
          {/* Middle Right - Small Accent */}
          <div className="absolute top-[60%] right-[10%] w-64 h-64 bg-[#00885A] opacity-[0.08] blur-[80px] rotate-12 rounded-2xl" />
          
          {/* Center Top */}
          <div className="absolute top-[10%] left-[40%] w-72 h-72 bg-[#00F866] opacity-[0.04] blur-[90px] -rotate-45 rounded-3xl" />
      </div>

      <div className="max-w-[1360px] mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 text-center mb-4">
             <h1 className="font-righteous font-normal text-4xl md:text-6xl text-white">
                Our <span className="relative inline-block text-[#00F866]">
                  <span className="relative z-10">Product</span>
                  {vectorProduct}
                </span> Ecosystem
             </h1>
             <p className="font-poppins text-[#d5d5d5] max-w-2xl mx-auto text-lg">
                Explore our suite of enterprise-grade solutions designed to scale with your business.
             </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="font-righteous text-2xl md:text-3xl text-white">
            Filter by <span className="text-[#00F866]">Industry</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 bg-[#2a2a2a] p-2 rounded-xl border border-[#393939]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  relative px-4 py-2 rounded-lg text-sm md:text-base font-poppins font-medium transition-colors duration-200
                  ${activeCategory === cat ? "text-black" : "text-white/70 hover:text-white"}
                `}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-[#00F866] rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
            <Button variant="outline" className="h-12 px-8 border-[#00F866]/30 text-[#00F866] hover:bg-[#00F866] hover:text-black hover:border-[#00F866] transition-all font-righteous text-base rounded-xl group">
                View All Products <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>

        {/* Custom Solution Callout */}
        <div className="mt-8 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#1c6339] to-[#00885A] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-[#00F866]/20 shadow-2xl">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <div className="relative z-10 flex flex-col gap-3 text-center md:text-left">
              <h3 className="font-righteous text-2xl md:text-4xl text-white">
                Don't see what you need?
              </h3>
              <p className="font-poppins text-white/90 text-lg max-w-xl">
                We build custom products tailored to your exact industry requirements. From concept to code.
              </p>
            </div>

            <Button 
              className="relative z-10 h-14 px-10 bg-white text-[#00885A] hover:bg-[#1f1f1f] hover:text-[#00F866] font-righteous text-xl border-2 border-transparent hover:border-[#00F866] transition-all rounded-xl"
            >
              Start Custom Build
            </Button>
        </div>

      </div>

    </section>
  );
};
