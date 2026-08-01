import { create } from "zustand";
import type { CartLine, Product } from "@/types/menu";

interface CartState {
  lines: CartLine[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  addItem: (product) => {
    const existing = get().lines.find((l) => l.product.id === product.id);
    if (existing) {
      set({
        lines: get().lines.map((l) =>
          l.product.id === product.id ? { ...l, quantity: l.quantity + 1 } : l
        ),
      });
    } else {
      set({ lines: [...get().lines, { product, quantity: 1 }] });
    }
  },
  removeItem: (productId) => set({ lines: get().lines.filter((l) => l.product.id !== productId) }),
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      lines: get().lines.map((l) => (l.product.id === productId ? { ...l, quantity } : l)),
    });
  },
  itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
  subtotal: () =>
    get().lines.reduce((sum, l) => {
      const price = l.product.discountPrice ?? l.product.price;
      return sum + price * l.quantity;
    }, 0),
}));
