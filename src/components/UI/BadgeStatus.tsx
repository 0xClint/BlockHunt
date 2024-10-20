import React from "react";
import { cn } from "../../utils/clsx"; // Assuming you're using the tailwind-merge utility

interface BadgeStatusProps {
  status: "accepted" | "rejected" | "onprocess";
  className?: string;
  children?: React.ReactNode;
}

const statusClasses = {
  accepted: "bg-green-100 text-green-800 border-green-400 rounded-lg",
  rejected: "bg-red-100 text-red-800 border-red-400 rounded-lg",
  onprocess: "bg-yellow-100 text-yellow-800 border-yellow-400 rounded-lg",
};

export default function BadgeStatus({
  status,
  className,
  children,
}: BadgeStatusProps) {
  return (
    <span
      className={cn(
        "text-xs font-medium me-2 px-2.5 py-0.5 rounded border inline-flex items-center justify-center",
        statusClasses[status], // Dynamically applying the appropriate status classes
        className
      )}
    >
      {children ? children : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
