"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  disabled?: boolean;
}>({});

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  children,
  disabled,
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, disabled }}
    >
      <div className="relative w-full" ref={ref}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen, disabled } = React.useContext(SelectContext);

  const isDisabled = props.disabled || disabled;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => !isDisabled && setOpen?.(!open)}
      disabled={isDisabled}
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:border-[#00f866]",
        className
      )}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }
>(({ className, placeholder, children, ...props }, ref) => {
  const { value } = React.useContext(SelectContext);

  return (
    <span
      ref={ref}
      className={cn("pointer-events-none truncate", className)}
      {...props}
    >
      {value || children || placeholder}
    </span>
  );
});
SelectValue.displayName = "SelectValue";

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SelectContext);
  if (!open) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-[100] min-w-[8rem] w-full overflow-hidden rounded-md border border-[#393939] bg-popover text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 mt-2",
        className
      )}
      {...props}
    >
      <div className="p-1 w-full max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {children}
      </div>
    </div>
  );
});
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  const { onValueChange, setOpen } = React.useContext(SelectContext);
  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onValueChange?.(value);
        setOpen?.(false);
      }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2.5 px-3 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";
