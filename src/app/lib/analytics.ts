const GA_MEASUREMENT_ID = "G-ZDFGKDTK7B";
const CONSENT_STORAGE_KEY = "malyukids_analytics_consent";

type ConsentState = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __malyukidsGaLoaded?: boolean;
  }
}

const ensureGtagShim = () => {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
};

const loadGaScript = () => {
  if (window.__malyukidsGaLoaded) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  window.__malyukidsGaLoaded = true;
};

const setConsentMode = (state: ConsentState) => {
  ensureGtagShim();
  window.gtag?.("consent", "update", {
    analytics_storage: state,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
};

export const bootstrapAnalyticsConsent = () => {
  ensureGtagShim();
  window.gtag?.("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (storedConsent === "granted") {
    grantAnalyticsConsent();
  } else if (storedConsent === "denied") {
    denyAnalyticsConsent();
  }
};

export const grantAnalyticsConsent = () => {
  localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
  ensureGtagShim();
  loadGaScript();
  window.gtag?.("js", new Date());
  setConsentMode("granted");
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });
};

export const denyAnalyticsConsent = () => {
  localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
  setConsentMode("denied");
};

export const getStoredAnalyticsConsent = (): ConsentState | null => {
  const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
  return stored === "granted" || stored === "denied" ? stored : null;
};

const hasAnalyticsConsent = () => getStoredAnalyticsConsent() === "granted";

export const trackEvent = (eventName: string, params?: Record<string, string | number | boolean>) => {
  if (!hasAnalyticsConsent()) return;
  ensureGtagShim();
  window.gtag?.("event", eventName, params);
};
