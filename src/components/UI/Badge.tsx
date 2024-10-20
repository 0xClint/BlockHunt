import { cn } from "../../utils/clsx"; // Assuming cn is your tailwind-merge function
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string; // Optional for additional class names
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "cursor-pointer bg-[#EDE9FE] text-[#818CF8] rounded-full font-medium text-xs py-1 px-2.5 ",
        className
      )}
    >
      {children}
    </span>
  );
}
