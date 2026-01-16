"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const AccordionContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

const AccordionItemContext = React.createContext<string>("");

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "single" | "multiple";
    value?: string;
    onValueChange?: (value: string) => void;
    collapsible?: boolean;
  }
>(
  (
    { className, value, onValueChange, type, collapsible, children, ...props },
    ref
  ) => (
    <AccordionContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
);
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
  <AccordionItemContext.Provider value={value}>
    <div ref={ref} className={cn("border-b", className)} {...props}>
      {children}
    </div>
  </AccordionItemContext.Provider>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange } =
    React.useContext(AccordionContext);
  const itemValue = React.useContext(AccordionItemContext);
  const isOpen = selectedValue === itemValue;

  return (
    <div className="flex">
      <button
        ref={ref}
        onClick={() => onValueChange?.(isOpen ? "" : itemValue)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>
    </div>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { value: selectedValue } = React.useContext(AccordionContext);
  const itemValue = React.useContext(AccordionItemContext);
  const isOpen = selectedValue === itemValue;

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div ref={ref} className={cn("pb-4 pt-0", className)} {...props}>
        {children}
      </div>
    </motion.div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
