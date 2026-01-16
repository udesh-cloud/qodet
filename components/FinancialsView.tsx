
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Download, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Home, 
  ChevronRight,
  Wallet,
  X,
  Receipt,
  Building2,
  Landmark,
  ArrowLeft,
  Loader2,
  Check,
  Lock
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

// --- Types ---

interface InvoiceItem {
  description: string;
  amount: number;
}

interface Invoice {
  id: string;
  project: string;
  period: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  downloadUrl: string;
  items: InvoiceItem[];
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  invoiceId: string;
}

type PaymentMethod = 'card' | 'bank' | 'corporate';
type PaymentStep = 'idle' | 'selecting-method' | 'entering-details' | 'processing' | 'success';

// --- Mock Data ---

const INITIAL_SUMMARY = {
  engagementType: "Retainer",
  billingFreq: "Monthly",
  currency: "USD",
  totalInvoiced: 142000,
  paidToDate: 130000,
  outstanding: 12000,
};

const UPCOMING = {
  date: "Nov 01, 2024",
  amount: 12000,
  project: "FinCore Ledger Scale-up",
};

const INITIAL_INVOICES: Invoice[] = [
  { 
    id: "INV-2024-010", 
    project: "FinCore Ledger Scale-up",
    period: "Oct 01 - Oct 31, 2024", 
    issueDate: "Oct 01, 2024", 
    dueDate: "Oct 15, 2024", 
    amount: 12000, 
    status: "Due", 
    downloadUrl: "#",
    items: [
        { description: "Monthly Retainer - October 2024", amount: 10000 },
        { description: "Additional Cloud Infrastructure Costs", amount: 2000 }
    ]
  },
  { 
    id: "INV-2024-009", 
    project: "FinCore Ledger Scale-up",
    period: "Sep 01 - Sep 30, 2024", 
    issueDate: "Sep 01, 2024", 
    dueDate: "Sep 15, 2024", 
    amount: 12000, 
    status: "Paid", 
    downloadUrl: "#",
    items: [
        { description: "Monthly Retainer - September 2024", amount: 10000 },
        { description: "Q3 Performance Audit", amount: 2000 }
    ]
  },
  { 
    id: "INV-2024-008", 
    project: "HealthVantage MVP",
    period: "Milestone: Design Phase", 
    issueDate: "Aug 15, 2024", 
    dueDate: "Aug 29, 2024", 
    amount: 18500, 
    status: "Paid", 
    downloadUrl: "#",
    items: [
        { description: "UX Research & Discovery", amount: 5000 },
        { description: "UI Design System Handoff", amount: 8500 },
        { description: "Interactive Prototypes", amount: 5000 }
    ]
  },
  { 
    id: "INV-2024-007", 
    project: "FinCore Ledger Scale-up",
    period: "Aug 01 - Aug 31, 2024", 
    issueDate: "Aug 01, 2024", 
    dueDate: "Aug 15, 2024", 
    amount: 12000, 
    status: "Paid", 
    downloadUrl: "#",
    items: [
        { description: "Monthly Retainer - August 2024", amount: 10000 },
        { description: "Security Compliance Review", amount: 2000 }
    ]
  },
  { 
    id: "INV-2024-006", 
    project: "FinCore Ledger Scale-up",
    period: "Jul 01 - Jul 31, 2024", 
    issueDate: "Jul 01, 2024", 
    dueDate: "Jul 15, 2024", 
    amount: 12000, 
    status: "Paid", 
    downloadUrl: "#",
    items: [
        { description: "Monthly Retainer - July 2024", amount: 12000 }
    ]
  },
];

const INITIAL_PAYMENTS: Payment[] = [
  { id: "PAY-0921", date: "Sep 14, 2024", amount: 12000, method: "Wire Transfer", invoiceId: "INV-2024-009" },
  { id: "PAY-0828", date: "Aug 28, 2024", amount: 18500, method: "ACH", invoiceId: "INV-2024-008" },
  { id: "PAY-0814", date: "Aug 14, 2024", amount: 12000, method: "Wire Transfer", invoiceId: "INV-2024-007" },
  { id: "PAY-0715", date: "Jul 15, 2024", amount: 12000, method: "Wire Transfer", invoiceId: "INV-2024-006" },
];

// --- Components ---

const BentoTile = ({ children, className = "", delay = 0 }: { children?: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`bg-[#242424] border border-white/5 rounded-3xl p-6 hover:border-[#00F866]/30 transition-all duration-300 shadow-xl relative overflow-hidden group ${className}`}
  >
    {children}
  </motion.div>
);

const StatusBadge = ({ status }: { status: Invoice['status'] }) => {
  const styles = {
    Paid: "bg-[#00F866]/10 text-[#00F866] border-[#00F866]/20",
    Due: "bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20",
    Overdue: "bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20",
  };

  return (
    <Badge variant="outline" className={`${styles[status]} border px-2.5 py-0.5`}>
      {status}
    </Badge>
  );
};

const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

export const FinancialsView = (): React.JSX.Element => {
  // Data State
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [summary, setSummary] = useState(INITIAL_SUMMARY);

  // UI State
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showAllInvoices, setShowAllInvoices] = useState(false);
  
  // Payment Flow State
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('idle');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  // Filter invoices based on view state
  const visibleInvoices = showAllInvoices ? invoices : invoices.slice(0, 3);

  const handleDownload = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,Invoice ${id}`;
    link.download = `${id}.txt`;
    link.click();
  };

  const initiatePayment = () => {
    setPaymentStep('selecting-method');
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentStep('entering-details');
  };

  const processPayment = () => {
    if (!selectedInvoice) return;

    setPaymentStep('processing');

    setTimeout(() => {
        // 1. Update Invoice Status
        const updatedInvoices = invoices.map(inv => 
            inv.id === selectedInvoice.id ? { ...inv, status: 'Paid' as const } : inv
        );
        setInvoices(updatedInvoices);

        // 2. Add New Payment Record
        const newPayment: Payment = {
            id: `PAY-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            amount: selectedInvoice.amount,
            method: selectedMethod === 'card' ? 'Credit Card' : selectedMethod === 'bank' ? 'Bank Transfer' : 'Corporate Account',
            invoiceId: selectedInvoice.id
        };
        setPayments([newPayment, ...payments]);

        // 3. Update Summary
        setSummary(prev => ({
            ...prev,
            paidToDate: prev.paidToDate + selectedInvoice.amount,
            outstanding: Math.max(0, prev.outstanding - selectedInvoice.amount)
        }));

        // 4. Update Selected Invoice locally to reflect change in modal if needed (or just show success)
        setSelectedInvoice({ ...selectedInvoice, status: 'Paid' });

        setPaymentStep('success');
    }, 2000);
  };

  const closePaymentFlow = () => {
    setSelectedInvoice(null);
    setPaymentStep('idle');
    setSelectedMethod(null);
  };

  return (
    <>
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-poppins text-white/40 mb-2 pl-1">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <Home size={14} />
                <span>Dashboard</span>
            </div>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-[#00F866] font-medium">Financials</span>
        </div>

        {/* 1. Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Engagement Info */}
            <BentoTile delay={0}>
                <div className="flex flex-col justify-between h-full gap-4">
                    <div className="flex items-center gap-2 text-white/50 text-sm font-medium uppercase tracking-wider">
                        <FileText size={16} /> Engagement
                    </div>
                    <div>
                        <div className="text-2xl font-righteous text-white">{summary.engagementType}</div>
                        <div className="text-sm text-white/40 mt-1">{summary.billingFreq} • {summary.currency}</div>
                    </div>
                </div>
                {/* Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CreditCard size={48} />
                </div>
            </BentoTile>

            {/* Total Invoiced */}
            <BentoTile delay={0.1}>
                <div className="flex flex-col justify-between h-full gap-4">
                    <div className="text-white/50 text-sm font-medium uppercase tracking-wider">Total Invoiced</div>
                    <div className="text-3xl font-righteous text-white">{formatCurrency(summary.totalInvoiced)}</div>
                </div>
            </BentoTile>

            {/* Paid */}
            <BentoTile delay={0.2}>
                <div className="flex flex-col justify-between h-full gap-4">
                    <div className="text-white/50 text-sm font-medium uppercase tracking-wider">Paid to Date</div>
                    <div className="text-3xl font-righteous text-white flex items-center gap-2">
                        {formatCurrency(summary.paidToDate)}
                        <CheckCircle2 size={20} className="text-[#00F866] opacity-50" />
                    </div>
                </div>
            </BentoTile>

            {/* Outstanding */}
            <BentoTile delay={0.3} className={summary.outstanding > 0 ? "border-[#eab308]/20 bg-[#eab308]/5" : ""}>
                <div className="flex flex-col justify-between h-full gap-4">
                    <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium uppercase tracking-wider ${summary.outstanding > 0 ? "text-[#eab308]" : "text-white/50"}`}>Outstanding</span>
                        {summary.outstanding > 0 && <AlertCircle size={16} className="text-[#eab308]" />}
                    </div>
                    <div className={`text-3xl font-righteous ${summary.outstanding > 0 ? "text-[#eab308]" : "text-white"}`}>
                        {formatCurrency(summary.outstanding)}
                    </div>
                </div>
            </BentoTile>
        </div>

        {/* 2. Upcoming Billing (Small banner) */}
        {summary.engagementType === "Retainer" && (
            <BentoTile className="flex flex-col md:flex-row items-center justify-between gap-6 py-5 px-6 bg-[#1f1f1f] border-dashed border-white/10" delay={0.4}>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#00F866]">
                        <Clock size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-medium text-sm">Next Invoice Scheduled</h4>
                        <p className="text-white/40 text-xs">For {UPCOMING.project}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-white font-righteous text-lg">{formatCurrency(UPCOMING.amount)}</p>
                        <p className="text-white/40 text-xs">{UPCOMING.date}</p>
                    </div>
                </div>
            </BentoTile>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 3. Invoices List (Main) */}
            <div className="lg:col-span-2">
                <BentoTile className="min-h-[500px] flex flex-col" delay={0.5}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#00F866]/10 flex items-center justify-center text-[#00F866]">
                                <FileText size={16} />
                            </div>
                            <h3 className="font-righteous text-xl text-white">Invoices</h3>
                        </div>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setShowAllInvoices(!showAllInvoices)}
                            className="text-white/40 hover:text-white h-8 text-xs transition-colors"
                        >
                            {showAllInvoices ? "Show Less" : "View All"}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-3">
                        <AnimatePresence initial={false} mode="popLayout">
                            {visibleInvoices.map((inv) => (
                                <motion.div 
                                    key={inv.id} 
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    onClick={() => setSelectedInvoice(inv)}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-[#00F866]/30 transition-all gap-4 cursor-pointer"
                                >
                                    <div className="flex flex-col gap-1 min-w-[140px]">
                                        <span className="text-white font-medium text-sm group-hover:text-[#00F866] transition-colors">{inv.id}</span>
                                        <span className="text-white/30 text-xs font-mono">{inv.issueDate}</span>
                                    </div>

                                    <div className="flex-1 min-w-[200px]">
                                        <div className="text-white/80 text-sm truncate">{inv.project}</div>
                                        <div className="text-white/30 text-xs truncate">{inv.period}</div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:min-w-[240px]">
                                        <span className="text-white font-mono text-sm">{formatCurrency(inv.amount)}</span>
                                        <StatusBadge status={inv.status} />
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            onClick={(e) => handleDownload(e, inv.id)}
                                            className="h-8 w-8 text-white/20 hover:text-white hover:bg-white/10"
                                        >
                                            <Download size={16} />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </BentoTile>
            </div>

            {/* 4. Payments History (Side) */}
            <div className="lg:col-span-1">
                <BentoTile className="h-full flex flex-col" delay={0.6}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-[#00F866]/10 flex items-center justify-center text-[#00F866]">
                            <Wallet size={16} />
                        </div>
                        <h3 className="font-righteous text-xl text-white">Payments</h3>
                    </div>

                    <div className="relative pl-4 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                        {payments.map((pay, i) => (
                            <div key={pay.id} className="relative pl-8 group">
                                <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-[#1f1f1f] border-2 border-[#00F866] z-10 group-hover:scale-125 transition-transform" />
                                
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-white font-medium text-sm">{formatCurrency(pay.amount)}</div>
                                        <div className="text-white/40 text-xs mt-0.5">{pay.date}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white/60 text-xs">{pay.method}</div>
                                        <div className="text-white/30 text-[10px] mt-0.5 font-mono">{pay.invoiceId}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-auto pt-6">
                        <p className="text-white/30 text-xs text-center italic">
                            Showing last {payments.length} transactions
                        </p>
                    </div>
                </BentoTile>
            </div>

        </div>
    </div>

    {/* Invoice & Payment Modal Overlay */}
    <AnimatePresence>
        {selectedInvoice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closePaymentFlow}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                
                {paymentStep === 'idle' ? (
                    // --- View Mode: Standard Invoice Details ---
                    <motion.div 
                        key="view-invoice"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-[#1f1f1f] border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#242424]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#00F866]/10 flex items-center justify-center text-[#00F866]">
                                    <Receipt size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-righteous text-lg">{selectedInvoice.id}</h3>
                                    <p className="text-white/40 text-xs font-mono">{selectedInvoice.issueDate}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={closePaymentFlow} className="rounded-full hover:bg-white/10 hover:text-white text-white/50">
                                <X size={20} />
                            </Button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Status</p>
                                    <StatusBadge status={selectedInvoice.status} />
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Due Date</p>
                                    <p className="text-white font-medium text-sm">{selectedInvoice.dueDate}</p>
                                </div>
                            </div>

                            <div className="bg-[#242424] rounded-xl p-4 border border-white/5">
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Line Items</p>
                                <div className="space-y-3">
                                    {selectedInvoice.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-start text-sm">
                                            <span className="text-white/80 pr-4">{item.description}</span>
                                            <span className="text-white font-mono whitespace-nowrap">{formatCurrency(item.amount)}</span>
                                        </div>
                                    ))}
                                    <div className="h-px bg-white/10 my-2" />
                                    <div className="flex justify-between items-center text-base">
                                        <span className="text-white font-medium">Total</span>
                                        <span className="text-[#00F866] font-righteous text-lg">{formatCurrency(selectedInvoice.amount)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/5 bg-[#242424] flex gap-3">
                            {selectedInvoice.status !== 'Paid' && (
                                <Button 
                                    onClick={initiatePayment}
                                    className="flex-1 bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous"
                                >
                                    Pay Now
                                </Button>
                            )}
                            <Button 
                                variant="outline" 
                                className={`flex-1 border-white/10 hover:bg-white/5 text-white ${selectedInvoice.status === 'Paid' ? 'w-full' : ''}`}
                                onClick={(e) => handleDownload(e, selectedInvoice.id)}
                            >
                                <Download size={16} className="mr-2" /> Download PDF
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    // --- Payment Flow Mode ---
                    <motion.div 
                        key="payment-flow"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative bg-[#1f1f1f] border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Flow Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#242424]">
                            <div className="flex items-center gap-3">
                                {paymentStep !== 'success' && paymentStep !== 'processing' && (
                                    <Button 
                                        variant="ghost" size="icon" 
                                        onClick={() => paymentStep === 'selecting-method' ? setPaymentStep('idle') : setPaymentStep('selecting-method')}
                                        className="h-8 w-8 -ml-2 hover:bg-white/10 text-white/50"
                                    >
                                        <ArrowLeft size={18} />
                                    </Button>
                                )}
                                <div>
                                    <h3 className="text-white font-righteous text-lg">
                                        {paymentStep === 'success' ? 'Payment Successful' : 'Secure Payment'}
                                    </h3>
                                    <p className="text-white/40 text-xs font-mono">
                                        Total: <span className="text-[#00F866]">{formatCurrency(selectedInvoice.amount)}</span>
                                    </p>
                                </div>
                            </div>
                            {paymentStep !== 'processing' && (
                                <Button variant="ghost" size="icon" onClick={closePaymentFlow} className="rounded-full hover:bg-white/10 hover:text-white text-white/50">
                                    <X size={20} />
                                </Button>
                            )}
                        </div>

                        {/* Flow Content */}
                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {paymentStep === 'selecting-method' && (
                                    <motion.div 
                                        key="select"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <p className="text-sm text-white/60 mb-2">Select payment method:</p>
                                        {[
                                            { id: 'card', label: 'Credit Card', icon: CreditCard, fee: 'Instant' },
                                            { id: 'bank', label: 'Bank Transfer', icon: Landmark, fee: '1-3 Days' },
                                            { id: 'corporate', label: 'Corporate Account', icon: Building2, fee: 'Net 30' }
                                        ].map((m) => (
                                            <div 
                                                key={m.id}
                                                onClick={() => handleMethodSelect(m.id as PaymentMethod)}
                                                className="flex items-center justify-between p-4 rounded-xl bg-[#242424] border border-white/5 hover:border-[#00F866] hover:bg-[#00F866]/5 cursor-pointer transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white group-hover:text-[#00F866] transition-colors">
                                                        <m.icon size={20} />
                                                    </div>
                                                    <span className="font-medium text-white">{m.label}</span>
                                                </div>
                                                <span className="text-xs text-white/30 group-hover:text-[#00F866] transition-colors">{m.fee}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {paymentStep === 'entering-details' && (
                                    <motion.div 
                                        key="details"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <div className="bg-[#242424] p-4 rounded-xl border border-white/5 mb-4 flex items-center justify-between">
                                            <span className="text-sm text-white/60">Paying with</span>
                                            <div className="flex items-center gap-2">
                                                {selectedMethod === 'card' && <CreditCard size={16} className="text-[#00F866]" />}
                                                {selectedMethod === 'bank' && <Landmark size={16} className="text-[#00F866]" />}
                                                {selectedMethod === 'corporate' && <Building2 size={16} className="text-[#00F866]" />}
                                                <span className="text-sm text-white font-medium capitalize">{selectedMethod === 'card' ? 'Credit Card' : selectedMethod?.replace('-', ' ')}</span>
                                            </div>
                                        </div>

                                        {/* Mock Inputs */}
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs text-white/40 mb-1 block">Cardholder Name</label>
                                                <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#00F866] outline-none transition-colors" placeholder="John Doe" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-white/40 mb-1 block">Card Number</label>
                                                <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#00F866] outline-none transition-colors" placeholder="0000 0000 0000 0000" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs text-white/40 mb-1 block">Expiry</label>
                                                    <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#00F866] outline-none transition-colors" placeholder="MM/YY" />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-white/40 mb-1 block">CVC</label>
                                                    <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#00F866] outline-none transition-colors" placeholder="123" />
                                                </div>
                                            </div>
                                        </div>

                                        <Button onClick={processPayment} className="w-full mt-4 bg-[#00F866] text-black hover:bg-[#00F866]/90 font-righteous h-12 text-lg">
                                            Pay {formatCurrency(selectedInvoice.amount)}
                                        </Button>
                                    </motion.div>
                                )}

                                {paymentStep === 'processing' && (
                                    <motion.div 
                                        key="processing"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-10 space-y-6"
                                    >
                                        <div className="relative">
                                            <div className="w-16 h-16 border-4 border-white/10 border-t-[#00F866] rounded-full animate-spin" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Lock size={20} className="text-white/20" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-white font-righteous text-xl mb-1">Processing Payment...</h4>
                                            <p className="text-white/40 text-sm">Please do not close this window.</p>
                                        </div>
                                    </motion.div>
                                )}

                                {paymentStep === 'success' && (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-6 space-y-6 text-center"
                                    >
                                        <div className="w-20 h-20 bg-[#00F866]/20 rounded-full flex items-center justify-center border border-[#00F866] shadow-[0_0_30px_rgba(0,248,102,0.2)]">
                                            <Check size={40} className="text-[#00F866]" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-righteous text-2xl mb-2">Payment Successful!</h4>
                                            <p className="text-white/60 text-sm max-w-[250px] mx-auto">
                                                Transaction ID: <span className="font-mono text-white">TX-{Math.floor(Math.random()*100000)}</span>
                                                <br/>
                                                A receipt has been sent to your email.
                                            </p>
                                        </div>
                                        <Button onClick={closePaymentFlow} variant="outline" className="border-white/10 hover:bg-white/10 text-white">
                                            Close Window
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </div>
        )}
    </AnimatePresence>
    </>
  );
};
