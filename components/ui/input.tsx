"use client";
import { cn } from "@/utils/twMerge";
import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  containerClass?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  iconClass?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, IProps> = (
  {
    className,
    type,
    error,
    containerClass,
    leftIcon,
    rightIcon,
    iconClass,
    autoComplete = "new-password",
    ...rest
  },
  ref
) => {
  const [show, setShow] = useState(false);

  return (
    <div className={containerClass}>
      <div className="relative h-full">
        {leftIcon && (
          <div
            className={cn(
              "absolute -translate-y-1/2 top-1/2 left-2.5",
              iconClass ? "" : ""
            )}
          >
            {leftIcon}
          </div>
        )}
        <input
          type={show ? "text" : type}
          ref={ref}
          autoComplete={autoComplete}
          className={cn(
            // "bg-white dark:bg-opacity-10 dark:text-dark-secondary-100 outline-none text-sm rounded-lg shadow-input dark:shadow-dark-input p-2.5 w-full",
            // "focus:outline-none",
            "bg-[#006980]/4 rounded-xl  py-4 outline-none text-sm",
            error ? "border border-red-500" : "",
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            className
          )}
          {...rest}
        />
        {rightIcon && (
          <div
            onClick={() => setShow(!show)}
            className={cn("absolute -translate-y-1/2 top-1/2 right-2.5", {
              "cursor-pointer": type === "password",
            })}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <span className="absolute truncate w-full block visible py-2 text-[0.625rem] leading-[0.625rem] text-danger m-0">
          {error}
        </span>
      )}
    </div>
  );
};

export default forwardRef(Input);
