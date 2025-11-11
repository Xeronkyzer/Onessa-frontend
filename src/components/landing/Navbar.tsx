"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - BIGGER */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight hover:text-primary transition-colors">
                ONESSA
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation - BIGGER & DARKER */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="magnetic text-base font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              Services
            </a>
            <a
              href="#work"
              className="magnetic text-base font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              Work
            </a>
            <a
              href="#about"
              className="magnetic text-base font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="magnetic text-base font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              Contact
            </a>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* CTA Button - Scrolls to top (Hero section) */}
            <button 
              onClick={scrollToTop}
              className="magnetic px-6 py-2.5 bg-foreground text-background rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start a Project
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="magnetic p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-t border-border animate-fade-in">
          <div className="px-6 py-6 space-y-4">
            <a
              href="#services"
              className="block text-base font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#work"
              className="block text-base font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="#about"
              className="block text-base font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-base font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <button 
              onClick={scrollToTop}
              className="w-full px-6 py-3 bg-foreground text-background rounded-full font-semibold mt-4 hover:scale-105 transition-all"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
