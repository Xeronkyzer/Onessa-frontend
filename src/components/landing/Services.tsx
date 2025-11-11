"use client";

import { useEffect, useRef } from "react";
import { Code2, Smartphone, Settings } from "lucide-react";
import { useGsap } from "@/lib/useGsap";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Custom websites built with cutting-edge technologies for optimal performance and user experience.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
    features: ["iOS & Android", "Cross-Platform", "Cloud Integration"],
  },
  {
    icon: Settings,
    title: "Maintenance & Support",
    description:
      "Ongoing support and maintenance to keep your digital products running smoothly and securely.",
    features: ["24/7 Monitoring", "Security Updates", "Performance Optimization"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { gsap, ScrollTrigger, contextRef } = useGsap();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".service-card", { opacity: 1, y: 0 });
      
      const heading = document.querySelector('.services-heading');
      if (heading && heading.textContent) {
        const text = heading.textContent;
        heading.innerHTML = text.split('').map(char => 
          `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
      }

      gsap.to('.services-heading span', {
        scrollTrigger: {
          trigger: '.services-heading',
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 80,
        rotation: 5,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      document.querySelectorAll('.service-icon').forEach((icon) => {
        gsap.to(icon, {
          scrollTrigger: {
            trigger: icon,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -30,
        });
      });
    }, sectionRef);

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = cardElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gsap.to(cardElement, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });
      });
      
      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });

    contextRef.current = ctx;

    return () => ctx.revert();
  }, [gsap, ScrollTrigger, contextRef]);

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="relative bg-[#1a1a1a] rounded-t-[80px] pt-32 pb-32 px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="services-header text-center mb-20">
          <h2 className="text-sm text-white/60 tracking-widest uppercase mb-4">
            Our Services
          </h2>
          <h3 className="services-heading text-4xl md:text-6xl font-bold tracking-tight text-white">
            What We Do
          </h3>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card magnetic group relative p-10 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-border-flow" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with glow effect */}
                <div className="service-icon relative w-16 h-16 bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-all duration-300 border border-white/10" style={{ transform: 'translateZ(30px)' }}>
                  <service.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                </div>

                {/* Title */}
                <h4 className="text-2xl font-bold mb-4 text-white transition-colors duration-300">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="text-white/60 mb-8 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300"
                      style={{ transform: `translateZ(${10 + idx * 5}px)` }}
                    >
                      <div className="w-1 h-1 bg-white mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float" />
                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-float animation-delay-2000" />
                <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-float animation-delay-4000" />
              </div>

              {/* Top accent line with animation */}
              <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-white/40 via-white/20 to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes border-flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-border-flow {
          animation: border-flow 3s infinite;
        }
        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
