import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  productIds: string[];
  toggle: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  /** Placeholder for future backend sync (e.g. POST /api/favorites). */
  syncWithBackend?: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) => {
        const exists = get().productIds.includes(productId);
        set({
          productIds: exists
            ? get().productIds.filter((id) => id !== productId)
            : [...get().productIds, productId],
        });
      },
      isFavorite: (productId) => get().productIds.includes(productId),
    }),
    {
      name: "silverleaf:favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
