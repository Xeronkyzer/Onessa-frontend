"use client";

import { useState, useEffect } from "react";
import { X, Send, Mail, User, MessageSquare, Sparkles } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated gradient backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
        onClick={onClose}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Main Modal */}
        <div className="relative bg-black border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
          
          {/* Content */}
          <div className="relative p-10">
            {/* Close button - Clean and minimal */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 group"
              aria-label="Close"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {!isSuccess ? (
              <>
                {/* Header - Magnetic and captivating */}
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-white/60" />
                    <span className="text-xs text-white/60 font-medium tracking-wider uppercase">Let's Talk</span>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
                    Start Your
                    <br />
                    <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
                      Dream Project
                    </span>
                  </h2>
                  
                  <p className="text-white/50 text-sm leading-relaxed">
                    We typically respond within 2 hours during business hours
                  </p>
                </div>

                {/* Form - Clean, spacious, inviting */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input - Floating label style */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-all text-white placeholder-transparent"
                      placeholder="Your name"
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-200 text-white/50 pointer-events-none
                        ${formData.name || focusedField === 'name' 
                          ? '-top-2.5 text-xs bg-black px-2' 
                          : 'top-4 text-sm'
                        }`}
                    >
                      Your name
                    </label>
                    <User className={`absolute right-4 top-4 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-white/60' : 'text-white/20'}`} />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-all text-white placeholder-transparent"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-200 text-white/50 pointer-events-none
                        ${formData.email || focusedField === 'email' 
                          ? '-top-2.5 text-xs bg-black px-2' 
                          : 'top-4 text-sm'
                        }`}
                    >
                      Email address
                    </label>
                    <Mail className={`absolute right-4 top-4 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-white/60' : 'text-white/20'}`} />
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-all resize-none text-white placeholder-transparent"
                      placeholder="Your message"
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-200 text-white/50 pointer-events-none
                        ${formData.message || focusedField === 'message' 
                          ? '-top-2.5 text-xs bg-black px-2' 
                          : 'top-4 text-sm'
                        }`}
                    >
                      Tell us about your project
                    </label>
                    <MessageSquare className={`absolute right-4 top-4 w-5 h-5 transition-colors ${focusedField === 'message' ? 'text-white/60' : 'text-white/20'}`} />
                  </div>

                  {/* Submit Button - Magnetic CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full group mt-8 overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white group-hover:scale-105 transition-transform duration-500" />
                    <div className="relative px-8 py-4 flex items-center justify-center gap-3 font-semibold text-black">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </>
            ) : (
              // Success State - Delightful
              <div className="text-center py-16">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60">We'll be in touch very soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
