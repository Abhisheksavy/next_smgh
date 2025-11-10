"use client";

import * as React from "react";
// your clsx + tailwind-merge helper
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/twMerge";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select...",
  value: controlledValue,
  onChange,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | undefined
  >(undefined);

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : uncontrolledValue;

  const handleSelect = (val: string) => {
    if (!isControlled) setUncontrolledValue(val);
    onChange?.(val);
    setOpen(false);
  };

  const selectedLabel = options.find(
    (opt) => opt.value === selectedValue
  )?.label;

  return (
    <div className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between   border-0 bg-primary/4 rounded-xl    outline-none   px-3 py-4 text-sm text-gray-900   transition-all",
          "hover:bg-primary/10 focus:outline-none  ",
          open && " "
        )}
      >
        <span className={cn(!selectedLabel && "text-gray-400")}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Options */}
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all",
            "animate-in fade-in slide-in-from-top-1"
          )}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm transition-all hover:bg-gray-100",
                selectedValue === opt.value && "bg-gray-100 font-medium"
              )}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
