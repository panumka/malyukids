import React from "react";
import { Youtube, Mail } from "lucide-react";
import logo from "../../assets/footer-logo.webp";
import { ActionButton, LinkButton } from "./ui/Button";

export const Footer = () => {
  const mailSubject = encodeURIComponent("Пропозиція для MalyuKiDs");
  const mailtoHref = `mailto:malyukids.info@gmail.com?subject=${mailSubject}`;

  return (
    <footer className="bg-white text-gray-900 py-20 px-6 border-t border-gray-100">
      <div className="container-shell">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="space-y-8 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Логотип MalyuKiDs" className="h-12 w-auto" />
              <span className="text-3xl font-black tracking-tight">MalyuKiDs</span>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md font-medium">
              Яскравий світ музики та анімації для найменших. Навчаємо, розважаємо та даруємо посмішки кожній дитині.
            </p>
            <div className="flex gap-4">
              <LinkButton
                href="https://www.youtube.com/channel/UCi0EbpfqSkahDCbHJWR0oPg"
                variant="icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Перейти на YouTube-канал MalyuKiDs"
                className="w-12 h-12 bg-gray-50 rounded-2xl hover:bg-red-500 hover:text-white transform hover:-translate-y-1 focus-visible:ring-red-400"
              >
                <Youtube className="w-6 h-6" />
              </LinkButton>
              <LinkButton
                href={mailtoHref}
                variant="icon"
                aria-label="Написати листа MalyuKiDs"
                className="w-12 h-12 bg-gray-50 rounded-2xl hover:bg-blue-500 hover:text-white transform hover:-translate-y-1 hover:scale-105 focus-visible:ring-blue-500"
              >
                <Mail className="w-6 h-6" />
              </LinkButton>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-8">Навігація</h4>
            <ul className="space-y-4 text-gray-500 font-bold">
              <li><LinkButton href="/" variant="nav">Головна</LinkButton></li>
              <li><LinkButton href="#music" variant="nav">Всі пісні</LinkButton></li>
              <li><LinkButton href="#videos" variant="nav">Відеокліпи</LinkButton></li>
              <li><LinkButton href="#platforms" variant="nav">Слухати</LinkButton></li>
            </ul>
          </div>

        </div>

        <div className="pt-20 mt-20 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400 font-bold text-sm">
          <p>© 2026 MalyuKiDs. Всі права захищені.</p>
          <div className="flex items-center gap-6">
            <LinkButton href="/privacy.html" variant="muted">Політика конфіденційності</LinkButton>
            <LinkButton href="/terms.html" variant="muted">Умови використання</LinkButton>
            <ActionButton
              variant="muted"
              onClick={() => window.dispatchEvent(new Event("malyukids:open-cookie-settings"))}
              type="button"
            >
              Налаштування cookie
            </ActionButton>
          </div>
        </div>
      </div>
    </footer>
  );
};
