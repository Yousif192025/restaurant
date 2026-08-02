import type { CartLine } from "@/types/menu";
import { VAT_RATE } from "@/features/menu/utils/pricing";
import type { Coupon } from "../data/mockCoupons";

export const DELIVERY_FEE = 12;
export const FREE_DELIVERY_THRESHOLD = 150;

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface CartTotals {
  itemsSubtotal: number;
  discount: number;
  discountedSubtotal: number;
  deliveryFee: number;
  isFreeDelivery: boolean;
  vat: number;
  grandTotal: number;
}

export function computeCouponDiscount(subtotal: number, coupon?: Coupon | null): number {
  if (!coupon) return 0;
  if (coupon.type === "percent") return round(subtotal * (coupon.value / 100));
  return round(Math.min(coupon.value, subtotal));
}

export function computeCartTotals(
  lines: CartLine[],
  coupon?: Coupon | null,
  deliveryMethod: "pickup" | "delivery" = "delivery"
): CartTotals {
  const itemsSubtotal = round(lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0));
  const discount = computeCouponDiscount(itemsSubtotal, coupon);
  const discountedSubtotal = round(itemsSubtotal - discount);
  const isFreeDelivery =
    deliveryMethod === "pickup" || lines.length === 0 || discountedSubtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE;
  const vat = round((discountedSubtotal + deliveryFee) * VAT_RATE);
  const grandTotal = round(discountedSubtotal + deliveryFee + vat);

  return { itemsSubtotal, discount, discountedSubtotal, deliveryFee, isFreeDelivery, vat, grandTotal };
}
