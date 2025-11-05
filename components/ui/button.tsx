import React from "react"
import { cn } from "@/utils/twMerge"

interface CommonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "hero"
    | "premium"
  size?: "default" | "sm" | "lg" | "xl" | "icon"
  className?: string
}

type ButtonProps = CommonProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  )

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "default", size = "default", href, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full cursor-pointer text-base font-medium transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 user-select-none"

    const variants: Record<string, string> = {
      default: "bg-tealgreen text-white hover:bg-secondary",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border-2 border-tealgreen text-tealgreen bg-transparent hover:bg-secondary hover:text-white",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-primary/10 hover:text-primary",
      link: "text-foreground",
      hero: "gradient-primary text-primary-foreground hover:shadow-xl shadow-glow font-medium",
      premium: "bg-primary text-primary-foreground hover:bg-primary-dark font-medium",
    }

    const sizes: Record<string, string> = {
      default: "h-11 px-8.5 py-2",
      sm: "h-9 rounded-md px-4 text-xs",
      lg: "h-12 rounded-lg px-8 text-base",
      xl: "h-14 rounded-xl px-10 text-lg",
      icon: "h-11 w-11",
    }

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      "transform transition-all duration-300 ease-out",
      className
    )

    if (href) {
      // Props for <a>
      const { ...anchorProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        />
      )
    }

    // Props for <button>
    const { disabled, ...buttonProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled}
        {...buttonProps}
      />
    )
  }
)

Button.displayName = "Button"
