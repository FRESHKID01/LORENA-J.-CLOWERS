import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070B19]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] p-0.5">
            <div className="w-full h-full bg-[#070B19] rounded-full flex items-center justify-center font-bold text-[#D4AF37]">
              LJC
            </div>
          </div>
          <span className="font-bold text-lg tracking-wide text-white">LORENA J. CLOWERS</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
          <a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
          <a href="#packages" className="hover:text-[#D4AF37] transition-colors">Packages</a>
          <a href="#testimonials" className="hover:text-[#D4AF37] transition-colors">Testimonials</a>
          <a href="#contact" className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#070B19] font-bold hover:bg-[#F3C66B] transition-all">Get Started</a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#070B19] border-b border-white/10 px-6 py-4 flex flex-col gap-4 text-gray-300">
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#packages" onClick={() => setIsOpen(false)}>Packages</a>
          <a href="#testimonials" onClick={() => setIsOpen(false)}>Testimonials</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-[#D4AF37] font-bold">Get Started</a>
        </div>
      )}
    </nav>
  );
} 