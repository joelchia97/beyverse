"use client";

import { useEffect, useRef } from "react";

export function AmbientPointer() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.25;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glowRef.current?.style.setProperty("transform", `translate3d(${currentX}px, ${currentY}px, 0)`);
      frame = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glowRef.current?.classList.add("is-visible");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={glowRef} className="ambient-pointer" aria-hidden="true" />;
}
