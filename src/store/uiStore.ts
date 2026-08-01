import { create } from "zustand";

export type Theme = "light" | "dark";
export type Locale = "ar" | "en";

interface UiState {
  theme: Theme;
  locale: Locale;
  isCartOpen: boolean;
  toggleTheme: () => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const THEME_KEY = "silverleaf:theme";
const LOCALE_KEY = "silverleaf:locale";

function readInitialTheme(): Theme {
  const stored = memoryFallback.get(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

function readInitialLocale(): Locale {
  const stored = memoryFallback.get(LOCALE_KEY);
  return stored === "en" ? "en" : "ar";
}

// In-memory fallback (artifacts / sandboxed previews may not have persistent storage).
const memoryFallback = new Map<string, string>();

function applyDocumentAttributes(theme: Theme, locale: Locale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dir = locale === "ar" ? "rtl" : "ltr";
  root.lang = locale;
}

export const useUiStore = create<UiState>((set, get) => ({
  theme: readInitialTheme(),
  locale: readInitialLocale(),
  isCartOpen: false,
  toggleTheme: () => {
    const next: Theme = get().theme === "light" ? "dark" : "light";
    memoryFallback.set(THEME_KEY, next);
    applyDocumentAttributes(next, get().locale);
    set({ theme: next });
  },
  setLocale: (locale) => {
    memoryFallback.set(LOCALE_KEY, locale);
    applyDocumentAttributes(get().theme, locale);
    set({ locale });
  },
  toggleLocale: () => {
    const next: Locale = get().locale === "ar" ? "en" : "ar";
    memoryFallback.set(LOCALE_KEY, next);
    applyDocumentAttributes(get().theme, next);
    set({ locale: next });
  },
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));

// Apply on load
applyDocumentAttributes(useUiStore.getState().theme, useUiStore.getState().locale);
