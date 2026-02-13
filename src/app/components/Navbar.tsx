import React, { useState } from "react";
import { Music, PlayCircle, Menu, X } from "lucide-react";
import logo from "../../assets/footer-logo.webp";
import { LinkButton } from "./ui/Button";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 md:px-6 md:py-4">
      <div className="container-shell">
        <div className="flex items-center justify-between">
        <a
          href="#"
          aria-label="Перейти на початок сторінки"
          className="flex items-center gap-2 md:gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <img src={logo} alt="Логотип MalyuKiDs" className="h-8 w-auto md:h-10" />
          <span className="text-2xl font-black tracking-tight text-gray-900 hidden sm:block">
            MalyuKiDs
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <LinkButton href="#music" variant="nav" className="flex items-center gap-1">
            <Music className="w-4 h-4" /> Пісні
          </LinkButton>
          <LinkButton href="#videos" variant="nav" className="flex items-center gap-1 hover:text-red-500 focus-visible:ring-red-500">
            <PlayCircle className="w-4 h-4" /> Кліпи
          </LinkButton>
          <LinkButton href="#platforms" variant="primary" className="px-6 py-2 transform hover:-translate-y-0.5">
            Слухати музику
          </LinkButton>
        </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-600 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-nav-menu" className="md:hidden mt-4 pb-2 flex flex-col gap-3">
            <LinkButton
              href="#music"
              variant="nav"
              onClick={closeMobileMenu}
              className="text-gray-700 flex items-center gap-2"
            >
              <Music className="w-4 h-4" /> Пісні
            </LinkButton>
            <LinkButton
              href="#videos"
              variant="nav"
              onClick={closeMobileMenu}
              className="text-gray-700 flex items-center gap-2 hover:text-red-500 focus-visible:ring-red-500"
            >
              <PlayCircle className="w-4 h-4" /> Кліпи
            </LinkButton>
            <LinkButton
              href="#platforms"
              variant="primary"
              onClick={closeMobileMenu}
              className="mt-2 px-6 py-3"
            >
              Слухати музику
            </LinkButton>
          </div>
        )}
      </div>
    </nav>
  );
};
