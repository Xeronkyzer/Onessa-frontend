"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useGsap } from "@/lib/useGsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { gsap, ScrollTrigger, contextRef } = useGsap();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Media fade in from left
      gsap.from(".about-media", {
        scrollTrigger: {
          trigger: ".about-media",
          start: "top 80%",
        },
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    contextRef.current = ctx;
    return () => ctx.revert();
  }, [gsap, ScrollTrigger, contextRef]);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="pt-32 pb-20 px-6 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Media Area - Placeholder for photo/video/animation */}
          <div className="about-media hidden lg:flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full h-[500px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              {/* Placeholder - Replace with your image/video/animation */}
              <div className="text-center space-y-4 p-8">
                <div className="w-20 h-20 rounded-full bg-white/10 mx-auto flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-white/60" />
                </div>
                <p className="text-sm text-white/60">
                  Add your photo, video, or animation here
                </p>
                <p className="text-xs text-white/40">
                  This is a placeholder for your media content
                </p>
              </div>
              
              {/* Optional: Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Content */}
          <div className="about-content space-y-6 order-1 lg:order-2">
            <div>
              <h2 className="text-sm text-white/60 tracking-widest uppercase mb-4">
                About Us
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Who We Are
              </h3>
            </div>
            
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              We're a creative studio passionate about crafting digital experiences that make a difference. 
              With years of expertise in web and mobile development, we help businesses transform their ideas into reality.
            </p>
            
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Our approach combines cutting-edge technology with thoughtful design, 
              ensuring every project not only looks great but performs exceptionally.
            </p>

            {/* Optional: Add key points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🎯</span>
                </div>
                <h4 className="text-white font-semibold">Mission Driven</h4>
                <p className="text-sm text-white/60">
                  Focused on delivering real value to our clients
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <h4 className="text-white font-semibold">Innovation First</h4>
                <p className="text-sm text-white/60">
                  Always exploring new technologies and approaches
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
