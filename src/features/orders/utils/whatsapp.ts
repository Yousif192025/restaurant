import type { Order } from "@/types/order";
import type { Locale } from "@/constants/copy";
import { RESTAURANT_WHATSAPP_NUMBER } from "@/constants/restaurant";

const deliveryLabel: Record<Order["deliveryMethod"], { ar: string; en: string }> = {
  pickup: { ar: "استلام من المطعم", en: "Pickup" },
  delivery: { ar: "توصيل", en: "Delivery" },
};

const paymentLabel: Record<Order["paymentMethod"], { ar: string; en: string }> = {
  cash: { ar: "الدفع عند الاستلام", en: "Cash on Delivery" },
  mada: { ar: "مدى", en: "Mada" },
  visa: { ar: "فيزا", en: "Visa" },
  mastercard: { ar: "ماستركارد", en: "MasterCard" },
  apple_pay: { ar: "Apple Pay", en: "Apple Pay" },
  stc_pay: { ar: "STC Pay", en: "STC Pay" },
  bank_transfer: { ar: "تحويل بنكي", en: "Bank Transfer" },
};

export function buildWhatsAppMessage(order: Order, locale: Locale): string {
  const lines = order.lines
    .map((line) => {
      const optionsParts: string[] = [];
      if (line.selectedSize) optionsParts.push(line.selectedSize.label[locale]);
      if (line.selectedExtras.length > 0) optionsParts.push(line.selectedExtras.map((e) => e.label[locale]).join(", "));
      const optionsText = optionsParts.length ? ` (${optionsParts.join(" | ")})` : "";
      return `• ${line.quantity}x ${line.product.name[locale]}${optionsText} — ${(line.unitPrice * line.quantity).toFixed(2)} SAR`;
    })
    .join("\n");

  if (locale === "ar") {
    return [
      `طلب جديد من مطعمي — ${order.id}`,
      ``,
      `الاسم: ${order.customer.fullName}`,
      `الجوال: ${order.customer.phone}`,
      ``,
      `الأصناف:`,
      lines,
      ``,
      `طريقة الاستلام: ${deliveryLabel[order.deliveryMethod].ar}`,
      order.deliveryMethod === "delivery" ? `العنوان: ${order.customer.city} - ${order.customer.district} - ${order.customer.address}` : "",
      `طريقة الدفع: ${paymentLabel[order.paymentMethod].ar}`,
      order.customer.notes ? `ملاحظات: ${order.customer.notes}` : "",
      ``,
      `الإجمالي الكلي: ${order.totals.grandTotal.toFixed(2)} SAR`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    `New order from مطعمي — ${order.id}`,
    ``,
    `Name: ${order.customer.fullName}`,
    `Phone: ${order.customer.phone}`,
    ``,
    `Items:`,
    lines,
    ``,
    `Fulfillment: ${deliveryLabel[order.deliveryMethod].en}`,
    order.deliveryMethod === "delivery" ? `Address: ${order.customer.city} - ${order.customer.district} - ${order.customer.address}` : "",
    `Payment: ${paymentLabel[order.paymentMethod].en}`,
    order.customer.notes ? `Notes: ${order.customer.notes}` : "",
    ``,
    `Grand Total: ${order.totals.grandTotal.toFixed(2)} SAR`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppLink(order: Order, locale: Locale): string {
  const message = buildWhatsAppMessage(order, locale);
  return `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
