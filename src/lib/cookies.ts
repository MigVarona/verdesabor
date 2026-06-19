export type CookieConsentValue = "accepted" | "essential" | "declined";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

export const CONSENT_KEY = "renew-cookie-consent";
export const PREFERENCES_KEY = "renew-cookie-preferences";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
};

export const ACCEPT_ALL_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
};

export function saveConsent(value: CookieConsentValue, preferences: CookiePreferences) {
  localStorage.setItem(CONSENT_KEY, value);
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  window.dispatchEvent(new CustomEvent("cookie-consent-updated"));
}

export function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONSENT_KEY) as CookieConsentValue | null;
}

export function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PREFERENCES_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}
