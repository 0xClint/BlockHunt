import React from "react";
import { cn } from "../../utils/clsx"; // Assuming cn is the utility from tailwind-merge

interface BadgeLinkProps {
  children: React.ReactNode;
  className?: string;
}

export default function BadgeLink({ children, className }: BadgeLinkProps) {
  return (
    <span
      className={cn(
        " cursor-pointer bg-[#EDE9FE] text-[#4F46E5]  text-xs font-semibold me-2 px-2.5 py-0.5 rounded border border-[#4F46E5] inline-flex items-center justify-center rounded-lg",
        className
      )}
    >
      {children}
    </span>
  );
}
