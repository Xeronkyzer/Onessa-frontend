"use client";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="pt-16 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* CTA Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to start your project?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your digital vision to life
            </p>
            
            {/* Contact Button - Same style as View All Projects */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="magnetic relative px-8 py-4 bg-white text-black border-2 border-white rounded-full font-medium overflow-hidden group transition-colors duration-500 hover:text-white"
            >
              {/* Expanding black circle on hover */}
              <span className="absolute inset-0 rounded-full bg-black transition-transform duration-700 ease-out scale-0 group-hover:scale-100" />
              
              {/* Button text */}
              <span className="relative z-10">Contact Us</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-32 pt-12 border-t border-white/10 text-center">
            <p className="text-white/60">
              © 2025 Onessa. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <a
                href="#"
                className="magnetic text-sm text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="magnetic text-sm text-white/60 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
