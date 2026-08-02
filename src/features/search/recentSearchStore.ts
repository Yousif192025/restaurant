import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const MAX_RECENT = 6;

interface RecentSearchState {
  terms: string[];
  addTerm: (term: string) => void;
  clear: () => void;
}

export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set, get) => ({
      terms: [],
      addTerm: (term) => {
        const trimmed = term.trim();
        if (!trimmed) return;
        const withoutDup = get().terms.filter((t) => t.toLowerCase() !== trimmed.toLowerCase());
        set({ terms: [trimmed, ...withoutDup].slice(0, MAX_RECENT) });
      },
      clear: () => set({ terms: [] }),
    }),
    {
      name: "silverleaf:recent-searches",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
