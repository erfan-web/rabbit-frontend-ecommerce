import { toast } from "sonner";
import type { Middleware, UnknownAction } from "@reduxjs/toolkit";

const SILENT_REJECTED = new Set([
  "auth/fetchCurrentUser/rejected",
  "cart/fetchCart/rejected",
  "products/fetchHomeProducts/rejected",
  "products/fetchProducts/rejected",
  "products/fetchByFilters/rejected",
  "products/fetchBySearch/rejected",
  "products/fetchDetail/rejected",
  "products/fetchSimilarProducts/rejected",
  "order/fetchOrders/rejected",
  "order/fetchUserOrders/rejected",
  "order/fetchOrder/rejected",
  "user/fetchUsers/rejected",
]);

const SUCCESS = new Set([
  "auth/registerUser/fulfilled",
  "auth/loginUser/fulfilled",
  "auth/logoutUser/fulfilled",
]);

export const toastMiddleware: Middleware = () => (next) => (action) => {
  const a = action as UnknownAction;
  if (typeof a?.type === "string") {
    if (a.type.endsWith("/rejected")) {
      if (!SILENT_REJECTED.has(a.type)) {
        const payload = (action as { payload?: string }).payload;
        const err = (action as { error?: { message?: string } }).error;
        toast.error(payload || err?.message || "server error");
      }
    } else if (SUCCESS.has(a.type)) {
      const payload = (action as { payload?: { message?: string } }).payload;
      if (payload?.message) toast.success(payload.message);
    }
  }
  return next(action);
};