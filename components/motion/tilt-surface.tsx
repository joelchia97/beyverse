"use client";

import type { HTMLAttributes, PointerEvent } from "react";
import { cn } from "@/lib/utils";

export function TiltSurface({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const style = event.currentTarget.style;

    style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    style.setProperty("--tilt-y", `${(x - 0.5) * 9}deg`);
    style.setProperty("--glow-x", `${x * 100}%`);
    style.setProperty("--glow-y", `${y * 100}%`);
  };

  const resetTilt = (event: PointerEvent<HTMLDivElement>) => {
    const style = event.currentTarget.style;
    style.setProperty("--tilt-x", "0deg");
    style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      className={cn("tilt-surface", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      {...props}
    >
      {children}
    </div>
  );
}
