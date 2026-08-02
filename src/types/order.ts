import type { CartLine } from "./menu";
import type { CartTotals } from "@/features/cart/utils/cartTotals";
import type { Coupon } from "@/features/cart/data/mockCoupons";

export interface CustomerInfo {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  notes?: string;
}

export type DeliveryMethod = "pickup" | "delivery";

export type PaymentMethod = "cash" | "mada" | "visa" | "mastercard" | "apple_pay" | "stc_pay" | "bank_transfer";

export type OrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "completed"
  | "cancelled"
  | "refunded";

export interface Order {
  id: string; // e.g. ORD-20260802-0001
  createdAt: string;
  lines: CartLine[];
  customer: CustomerInfo;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  coupon: Coupon | null;
  totals: CartTotals;
  status: OrderStatus;
  estimatedReadyMinutes: number;
}
