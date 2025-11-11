"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6 md:px-12 pt-20 pb-12">
      <div className="max-w-[1400px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-5">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              We build digital products that drive real growth
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              From concept to launch, we create custom web & mobile applications
              that solve real business challenges. No fluff, just results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/login">
                <button className="group px-6 py-3 bg-foreground text-background rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all w-full sm:w-auto">
                  Start Your Project
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </button>
              </Link>

              <Link href="#work">
                <button className="px-6 py-3 border-2 border-border rounded-full font-semibold text-sm hover:bg-muted transition-all w-full sm:w-auto">
                  View Our Work
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-5 border-t border-border">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">50+</h3>
                <p className="text-xs text-muted-foreground">
                  Projects Delivered
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">100%</h3>
                <p className="text-xs text-muted-foreground">
                  Client Satisfaction
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">5+</h3>
                <p className="text-xs text-muted-foreground">
                  Years Experience
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Visual Element */}
          <div className="relative h-[300px] md:h-[380px] lg:h-[450px]">
            {/* Main Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10 rounded-3xl border border-border overflow-hidden">
              
              {/* Animated Grid Background */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
              </div>

              {/* Gradient Orbs */}
              <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-500/20 rounded-full blur-3xl" />
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative text-center p-6">
                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mx-auto flex items-center justify-center shadow-2xl shadow-orange-500/20 animate-float">
                      <svg
                        className="w-12 h-12 md:w-14 md:h-14 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    {/* Decorative Rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border-2 border-orange-500/20 animate-ping-slow" />
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-xs md:text-sm font-medium">
                    Your visual content here
                  </p>
                </div>
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
