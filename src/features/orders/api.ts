import { api } from "@/shared/lib/api/axiosInstance";
import type { Order, OrderStatusType } from "@/shared/types";

export const ordersApi = {
  getAll: () => api.get<Order[]>("/order").then((r) => r.data),

  getById: (id: string) =>
    api.get<Order>(`/order/single/${id}`).then((r) => r.data),

  updateStatus: (orderId: string, status: OrderStatusType) =>
    api
      .put<Order>(`/order/${orderId}`, { status })
      .then((r) => r.data),

  getUserOrders: () =>
    api.get<Order[]>("/order/user-orders").then((r) => r.data),
};