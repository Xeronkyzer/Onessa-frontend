"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    }
  }, [progress]);

  if (!isVisible) return null;

  // Default to dark theme until mounted to avoid hydration mismatch
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-800 ${
        progress === 100 ? "opacity-0" : "opacity-100"
      } ${isDark ? "bg-black" : "bg-white"}`}
    >
      {/* Subtle radial gradient background */}
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-gradient-radial-dark" : "bg-gradient-radial-light"
        }`}
      />

      <div className="relative flex flex-col items-center gap-16">
        {/* ONESSA text - Clean and simple */}
        <div className="relative">
          <h1
            className={`text-3xl md:text-4xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            ONESSA
          </h1>
        </div>

        {/* Progress bar */}
        <div className="w-64 space-y-3">
          {/* Percentage */}
          <div
            className={`flex items-center justify-between text-sm font-medium ${
              isDark ? "text-white/60" : "text-black/60"
            }`}
          >
            <span>Loading</span>
            <span>{progress}%</span>
          </div>

          {/* Bar */}
          <div
            className={`relative h-1 rounded-full overflow-hidden ${
              isDark ? "bg-white/10" : "bg-black/10"
            }`}
          >
            {/* Animated gradient bar */}
            <div
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${
                isDark
                  ? "bg-gradient-to-r from-white/60 via-white to-white/60"
                  : "bg-gradient-to-r from-black/60 via-black to-black/60"
              }`}
              style={{
                width: `${progress}%`,
                boxShadow: isDark
                  ? "0 0 20px rgba(255,255,255,0.5)"
                  : "0 0 20px rgba(0,0,0,0.3)",
              }}
            >
              {/* Shimmer effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent ${
                  isDark ? "via-white/40" : "via-black/40"
                }`}
                style={{
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`text-sm tracking-wider ${
            isDark ? "text-white/40" : "text-black/40"
          }`}
        >
          Crafting your experience
        </p>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .bg-gradient-radial-dark {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.03) 0%,
            transparent 70%
          );
        }
        .bg-gradient-radial-light {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(0, 0, 0, 0.02) 0%,
            transparent 70%
          );
        }
      `}</style>
    </div>
  );
}
