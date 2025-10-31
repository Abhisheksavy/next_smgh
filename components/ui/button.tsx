
import React from "react";
import { cn } from "@/utils/twMerge";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "hero"
    | "premium";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full cursor-pointer text-base font-medium transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

    const variants: Record<string, string> = {
      default:
        "bg-secondary text-white hover:bg-primary shadow-md",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border-2 border-secondary text-secondary bg-background hover:bg-primary hover:text-primary-foreground",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-primary/10 hover:text-primary",
      link: "text-foreground",
      hero: "gradient-primary text-primary-foreground hover:shadow-xl shadow-glow font-medium",
      premium:
        "bg-primary text-primary-foreground hover:bg-primary-dark font-medium shadow-md",
    };

    const sizes: Record<string, string> = {
      default: "h-11 px-8.5 py-2",
      sm: "h-9 rounded-md px-4 text-xs",
      lg: "h-12 rounded-lg px-8 text-base",
      xl: "h-14 rounded-xl px-10 text-lg",
      icon: "h-11 w-11",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          "transform transition-all duration-300 ease-out",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
