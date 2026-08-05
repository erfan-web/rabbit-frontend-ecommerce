import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import productReducer from "@/features/products/productsSlice";
import cartReducer from "@/features/cart/cartSlice";
import orderReducer from "@/features/orders/orderSlice";
import userReducer from "@/features/admin/userSlice";
import { toastMiddleware } from "@/app/toastMiddleware";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toastMiddleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
