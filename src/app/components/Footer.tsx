import React from "react";
import { Youtube, Mail } from "lucide-react";
import logo from "../../assets/footer-logo.webp";

export const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-16">
          <div className="space-y-8 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="MalyuKiDs" className="h-12 w-auto" />
              <span className="text-3xl font-black tracking-tight">MalyuKiDs</span>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md font-medium">
              Яскравий світ музики та анімації для найменших. Навчаємо, розважаємо та даруємо посмішки кожній дитині.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/channel/UCi0EbpfqSkahDCbHJWR0oPg"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-8">Навігація</h4>
            <ul className="space-y-4 text-gray-500 font-bold">
              <li><a href="/" className="hover:text-blue-500 transition-colors">Головна</a></li>
              <li><a href="#music" className="hover:text-blue-500 transition-colors">Всі пісні</a></li>
              <li><a href="#videos" className="hover:text-blue-500 transition-colors">Відеокліпи</a></li>
              <li><a href="#platforms" className="hover:text-blue-500 transition-colors">Слухати</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-8">Для батьків</h4>
            <ul className="space-y-4 text-gray-500 font-bold">
              <li>Контакти</li>
              <li>Партнерство</li>
              <li className="flex items-center gap-2 pt-4">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-gray-900">malyukids.info@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-20 mt-20 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400 font-bold text-sm">
          <p>© 2026 MalyuKiDs. Всі права захищені.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy.html" className="hover:text-gray-600">Політика конфіденційності</a>
            <a href="/terms.html" className="hover:text-gray-600">Умови використання</a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("malyukids:open-cookie-settings"))}
              className="hover:text-gray-600"
            >
              Налаштування cookie
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
