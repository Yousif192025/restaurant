import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Order } from "@/types/order";

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  updateStatus: (id: string, status: Order["status"]) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      getOrderById: (id) => get().orders.find((o) => o.id === id),
      updateStatus: (id, status) =>
        set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)) }),
    }),
    {
      name: "silverleaf:orders",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
