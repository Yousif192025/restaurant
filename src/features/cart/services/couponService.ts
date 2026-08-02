import { apiClient } from "@/services/apiClient";
import { findCoupon, type Coupon } from "../data/mockCoupons";

function withMockLatency<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface ValidateCouponResult {
  valid: boolean;
  coupon?: Coupon;
  reason?: "not_found" | "min_subtotal";
}

export const couponService = {
  /** POST /api/coupons/validate — checks a code against subtotal, mock-backed until Flask exposes it. */
  async validate(code: string, subtotal: number): Promise<ValidateCouponResult> {
    try {
      return await apiClient.post<ValidateCouponResult>("/coupons/validate", { code, subtotal });
    } catch {
      const coupon = findCoupon(code);
      if (!coupon) return withMockLatency({ valid: false, reason: "not_found" });
      if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
        return withMockLatency({ valid: false, coupon, reason: "min_subtotal" });
      }
      return withMockLatency({ valid: true, coupon });
    }
  },
};
