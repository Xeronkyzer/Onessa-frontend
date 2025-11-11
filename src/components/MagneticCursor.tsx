"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorBallRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursorBall = cursorBallRef.current;
    if (!cursorBall) return;

    // Make sure default cursor shows
    document.body.style.cursor = "auto";

    // Smooth cursor movement
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorBall, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .magnetic, input, textarea, [role="button"]'
    );

    interactiveElements.forEach((el) => {
      const element = el as HTMLElement;

      element.addEventListener("mouseenter", () => {
        setIsHovering(true);
        gsap.to(cursorBall, { 
          scale: 1.8, 
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener("mouseleave", () => {
        setIsHovering(false);
        gsap.to(cursorBall, { 
          scale: 1, 
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Magnetic pull
      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      });
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorBallRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div
        className={`w-3 h-3 rounded-full border border-white transition-all duration-200 ${
          isHovering ? "bg-white/20" : "bg-transparent"
        }`}
      />
    </div>
  );
}
