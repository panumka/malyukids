import React, { useEffect, useState } from "react";
import {
  denyAnalyticsConsent,
  getStoredAnalyticsConsent,
  grantAnalyticsConsent,
} from "../lib/analytics";

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(getStoredAnalyticsConsent() === null);

    const onOpenSettings = () => setIsVisible(true);
    window.addEventListener("malyukids:open-cookie-settings", onOpenSettings);
    return () => window.removeEventListener("malyukids:open-cookie-settings", onOpenSettings);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl p-4 md:p-5">
      <p className="text-sm md:text-base text-gray-800 font-medium">
        Ми використовуємо аналітичні cookie (Google Analytics), щоб розуміти, як покращувати сайт.
      </p>
      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button
          type="button"
          onClick={() => {
            denyAnalyticsConsent();
            setIsVisible(false);
          }}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-bold"
        >
          Відхилити
        </button>
        <button
          type="button"
          onClick={() => {
            grantAnalyticsConsent();
            setIsVisible(false);
          }}
          className="px-4 py-2 rounded-xl bg-[#FC3C44] text-white font-bold"
        >
          Прийняти
        </button>
      </div>
    </div>
  );
};
