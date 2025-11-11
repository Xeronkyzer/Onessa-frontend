"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useGsap } from "@/lib/useGsap";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Modern online shopping experience with seamless checkout",
    number: "01",
  },
  {
    title: "Fitness Mobile App",
    category: "App Development",
    description: "Track workouts and nutrition with AI-powered insights",
    number: "02",
  },
  {
    title: "SaaS Dashboard",
    category: "Web Development",
    description: "Analytics platform for modern businesses",
    number: "03",
  },
  {
    title: "Real Estate Portal",
    category: "Web Development",
    description: "Property search and listing management system",
    number: "04",
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const { gsap, ScrollTrigger, contextRef } = useGsap();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-header", {
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".view-more-btn", {
        scrollTrigger: {
          trigger: ".view-more-btn",
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    contextRef.current = ctx;

    return () => ctx.revert();
  }, [gsap, ScrollTrigger, contextRef]);

  return (
    <section 
      ref={sectionRef} 
      id="work" 
      className="relative py-20 md:py-32 px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="work-header mb-16 md:mb-24">
          <p className="text-xs md:text-sm text-muted-foreground tracking-[0.2em] uppercase mb-3">
            Portfolio
          </p>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Selected Work
          </h3>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
            A showcase of our recent projects that blend creativity with technical excellence
          </p>
        </div>

        {/* Projects List */}
        <div className="work-grid space-y-0 border-t border-border">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative border-b border-border transition-colors duration-300 hover:border-foreground/20 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Mobile Layout */}
              <div className="block md:hidden py-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-muted-foreground font-mono">
                        {project.number}
                      </span>
                      <span className="text-xs tracking-widest uppercase text-muted-foreground">
                        {project.category}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold tracking-tight mb-3">
                      {project.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="w-12 h-12 flex-shrink-0">
                    <div className="w-full h-full rounded-full border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-foreground">
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block relative py-10 lg:py-12">
                <div className="grid grid-cols-12 gap-8 items-center">
                  {/* Number */}
                  <div className="col-span-1">
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-mono">
                      {project.number}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="col-span-3">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {project.category}
                    </p>
                  </div>

                  {/* Title + Description Container */}
                  <div className="col-span-6">
                    <h4 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      {project.title}
                    </h4>
                    {/* Description with controlled width */}
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.description}
                    </p>
                  </div>

                  {/* Arrow - No scale, just color and icon movement */}
                  <div className="col-span-2 flex justify-end">
                    <div className="w-16 h-16 flex-shrink-0">
                      <div className="w-full h-full rounded-full border border-border group-hover:border-foreground flex items-center justify-center transition-colors duration-300">
                        <ArrowUpRight className="w-6 h-6 text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Background Effect */}
              <div 
                className={`hidden md:block absolute inset-0 bg-secondary/30 -z-10 transition-all duration-700 ease-out ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  clipPath: hoveredIndex === index 
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    : 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)'
                }}
              />
            </div>
          ))}
        </div>

        {/* View All Button - NOW WITH LINK */}
        <div className="mt-16 md:mt-24 flex justify-center md:justify-start">
          <Link href="/work">
            <button className="view-more-btn magnetic relative px-8 md:px-10 py-4 md:py-5 bg-foreground text-background border-2 border-foreground rounded-full font-medium text-sm md:text-base overflow-hidden group transition-all duration-500 hover:text-foreground hover:scale-105">
              <span className="absolute inset-0 rounded-full bg-background transition-transform duration-700 ease-out scale-0 group-hover:scale-100" />
              <span className="relative z-10 flex items-center gap-2">
                View All Projects
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
