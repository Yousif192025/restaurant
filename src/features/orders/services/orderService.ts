import { apiClient } from "@/services/apiClient";
import type { CartLine } from "@/types/menu";
import type { CustomerInfo, DeliveryMethod, Order, PaymentMethod, OrderStatus } from "@/types/order";
import type { CartTotals } from "@/features/cart/utils/cartTotals";
import type { Coupon } from "@/features/cart/data/mockCoupons";
import { generateOrderNumber } from "../utils/orderNumber";
import { useOrdersStore } from "../ordersStore";

function withMockLatency<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface CreateOrderInput {
  lines: CartLine[];
  customer: CustomerInfo;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  coupon: Coupon | null;
  totals: CartTotals;
}

export const orderService = {
  /** POST /api/orders */
  async createOrder(input: CreateOrderInput): Promise<Order> {
    try {
      return await apiClient.post<Order>("/orders", input);
    } catch {
      const order: Order = {
        id: generateOrderNumber(),
        createdAt: new Date().toISOString(),
        status: "new",
        estimatedReadyMinutes: input.deliveryMethod === "delivery" ? 35 : 18,
        ...input,
      };
      useOrdersStore.getState().addOrder(order);
      return withMockLatency(order, 700);
    }
  },

  /** GET /api/orders/:id */
  async getOrderById(id: string): Promise<Order | undefined> {
    try {
      return await apiClient.get<Order>(`/orders/${id}`);
    } catch {
      return withMockLatency(useOrdersStore.getState().getOrderById(id), 200);
    }
  },

  /** PATCH /api/orders/:id/status — reserved for the future admin dashboard. */
  async updateStatus(id: string, status: OrderStatus): Promise<void> {
    try {
      await apiClient.patch(`/orders/${id}/status`, { status });
    } catch {
      useOrdersStore.getState().updateStatus(id, status);
      await withMockLatency(undefined, 200);
    }
  },
};
