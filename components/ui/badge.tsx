import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-sm border border-sky-400/30 bg-sky-400/10 px-2 py-1 text-xs font-semibold text-sky-100", className)}
      {...props}
    />
  );
}
