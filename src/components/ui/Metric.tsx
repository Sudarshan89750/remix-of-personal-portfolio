import React from "react";
import { cn } from "@/lib/utils";

export function Metric({
  label,
  value,
  accent = false,
  className,
}: {
  label: string;
  value: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-t border-border pt-4 flex flex-col gap-1.5",
        className
      )}
    >
      <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
        {label}
      </span>
      <span
        className={cn(
          "text-2xl md:text-3xl font-bold font-display tracking-tight",
          accent ? "text-brand" : "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}
