import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "too_short"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?9665|05)\d{8}$/, "invalid_phone"),
  city: z.string().trim().min(2, "too_short"),
  district: z.string().trim().min(2, "too_short"),
  address: z.string().trim().min(5, "too_short"),
  notes: z.string().trim().optional(),
  deliveryMethod: z.enum(["pickup", "delivery"]),
  paymentMethod: z.enum(["cash", "mada", "visa", "mastercard", "apple_pay", "stc_pay", "bank_transfer"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
