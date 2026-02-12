import React, { useState } from "react";
import { Music, PlayCircle, Menu, X } from "lucide-react";
import logo from "../../assets/footer-logo.webp";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MalyuKiDs Logo" className="h-10 w-auto" />
          <span className="text-2xl font-black tracking-tight text-gray-900 hidden sm:block">
            MalyuKiDs
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#music" className="font-bold text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-1">
            <Music className="w-4 h-4" /> Пісні
          </a>
          <a href="#videos" className="font-bold text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1">
            <PlayCircle className="w-4 h-4" /> Кліпи
          </a>
          <a href="#platforms" className="px-6 py-2 bg-[#FC3C44] text-white rounded-full font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            Слухати музику
          </a>
        </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-600"
            aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 flex flex-col gap-3">
            <a
              href="#music"
              onClick={closeMobileMenu}
              className="font-bold text-gray-700 hover:text-blue-500 transition-colors flex items-center gap-2"
            >
              <Music className="w-4 h-4" /> Пісні
            </a>
            <a
              href="#videos"
              onClick={closeMobileMenu}
              className="font-bold text-gray-700 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4" /> Кліпи
            </a>
            <a
              href="#platforms"
              onClick={closeMobileMenu}
              className="mt-2 inline-flex justify-center px-6 py-3 bg-[#FC3C44] text-white rounded-full font-bold hover:shadow-lg transition-all"
            >
              Слухати музику
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
