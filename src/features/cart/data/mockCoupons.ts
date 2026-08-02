import type { LocalizedText } from "@/types/menu";

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  description: LocalizedText;
  minSubtotal?: number;
}

export const coupons: Coupon[] = [
  {
    code: "LEAF20",
    type: "percent",
    value: 20,
    description: { ar: "خصم 20% على قيمة الأصناف", en: "20% off item subtotal" },
  },
  {
    code: "TRUFFLE10",
    type: "fixed",
    value: 10,
    description: { ar: "خصم 10 ريال", en: "SAR 10 off" },
    minSubtotal: 30,
  },
];

export function findCoupon(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}
