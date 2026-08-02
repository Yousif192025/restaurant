import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, ExtraOption, Product, SizeOption } from "@/types/menu";
import { computeUnitPrice } from "@/features/menu/utils/pricing";
import type { Coupon } from "./data/mockCoupons";

interface AddItemInput {
  product: Product;
  quantity?: number;
  selectedSize?: SizeOption;
  selectedExtras?: ExtraOption[];
}

interface CartState {
  lines: CartLine[];
  appliedCoupon: Coupon | null;
  addItem: (input: AddItemInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

function buildLineId(productId: string, size?: SizeOption, extras: ExtraOption[] = []): string {
  const extrasKey = extras.map((e) => e.id).sort().join(",");
  return `${productId}::${size?.id ?? "default"}::${extrasKey}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      appliedCoupon: null,
      addItem: ({ product, quantity = 1, selectedSize, selectedExtras = [] }) => {
        const lineId = buildLineId(product.id, selectedSize, selectedExtras);
        const existing = get().lines.find((l) => l.lineId === lineId);

        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.lineId === lineId ? { ...l, quantity: l.quantity + quantity } : l
            ),
          });
          return;
        }

        const unitPrice = computeUnitPrice(product, selectedSize, selectedExtras);
        const newLine: CartLine = {
          lineId,
          product,
          quantity,
          selectedSize,
          selectedExtras,
          unitPrice,
        };
        set({ lines: [...get().lines, newLine] });
      },
      removeItem: (lineId) => set({ lines: get().lines.filter((l) => l.lineId !== lineId) }),
      updateQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(lineId);
          return;
        }
        set({
          lines: get().lines.map((l) => (l.lineId === lineId ? { ...l, quantity } : l)),
        });
      },
      clear: () => set({ lines: [], appliedCoupon: null }),
      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),
      itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
    }),
    {
      name: "silverleaf:cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
