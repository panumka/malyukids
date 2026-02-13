import React, { useEffect, useState } from "react";
import {
  denyAnalyticsConsent,
  getStoredAnalyticsConsent,
  grantAnalyticsConsent,
} from "../lib/analytics";
import { ActionButton } from "./ui/Button";

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
        <ActionButton
          variant="muted"
          onClick={() => {
            denyAnalyticsConsent();
            setIsVisible(false);
          }}
          type="button"
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-bold"
        >
          Відхилити
        </ActionButton>
        <ActionButton
          variant="primary"
          onClick={() => {
            grantAnalyticsConsent();
            setIsVisible(false);
          }}
          type="button"
          className="px-4 py-2 rounded-xl"
        >
          Прийняти
        </ActionButton>
      </div>
    </div>
  );
};
