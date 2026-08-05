import { api } from "@/shared/lib/api/axiosInstance";
import type { Cart, CartItem } from "@/shared/types";

export type CartPayload = {
  productId: string | undefined;
  quantity: number | string;
  size: string;
  color: string;
  guestId: string | null;
  userId: string | null;
};

export type RemoveCartItem = Omit<CartPayload, "quantity">;

export const cartApi = {
  create: (payload: CartPayload) =>
    api.post<Cart>("/cart", payload).then((r) => r.data),

  updateQuantity: (payload: CartPayload) =>
    api.put<Cart>("/cart", payload).then((r) => r.data),

  remove: (payload: RemoveCartItem) =>
    api.delete<Cart>("/cart", { data: payload }).then((r) => r.data),

  merge: (guestId: string) =>
    api.post<Cart>("/cart/merge", { guestId }).then((r) => r.data),

  get: (identifier: string) => {
    const query = identifier.includes("guest")
      ? `guestId=${identifier}`
      : `userId=${identifier}`;
    return api.get<Cart>(`/cart?${query}`).then((r) => r.data);
  },
};

export type { CartItem };
