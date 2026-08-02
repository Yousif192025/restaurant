import type { ExtraOption, Product, SizeOption } from "@/types/menu";

export const VAT_RATE = 0.15; // Saudi VAT, ready for checkout's tax breakdown

/** Base unit price for a product, respecting an active discount. */
export function getBasePrice(product: Product): number {
  return product.discountPrice ?? product.price;
}

/** Unit price after applying a size delta and selected extras. */
export function computeUnitPrice(
  product: Product,
  selectedSize?: SizeOption,
  selectedExtras: ExtraOption[] = []
): number {
  const base = getBasePrice(product);
  const sizeDelta = selectedSize?.priceDelta ?? 0;
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  return Math.max(0, base + sizeDelta + extrasTotal);
}

export interface PriceBreakdown {
  unitPrice: number;
  quantity: number;
  lineSubtotal: number;
  vat: number;
  lineTotal: number;
}

/** Full tax-ready breakdown for a single cart line. */
export function computeLineBreakdown(unitPrice: number, quantity: number): PriceBreakdown {
  const lineSubtotal = Math.round(unitPrice * quantity * 100) / 100;
  const vat = Math.round(lineSubtotal * VAT_RATE * 100) / 100;
  const lineTotal = Math.round((lineSubtotal + vat) * 100) / 100;
  return { unitPrice, quantity, lineSubtotal, vat, lineTotal };
}

export function formatPrice(amount: number, currency = "SAR"): string {
  return `${amount.toFixed(2)} ${currency}`;
}
