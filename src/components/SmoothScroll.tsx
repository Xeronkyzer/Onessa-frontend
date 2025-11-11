"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Remove any existing scroll behavior
    document.documentElement.removeAttribute('data-scroll-behavior');
    
    // Add custom smooth scrolling
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
