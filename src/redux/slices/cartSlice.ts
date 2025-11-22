import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/helpers/axiosInstance";
import type { Cart } from "../../types";

interface PayloadCart {
  productId: string | undefined;
  quantity: number | string;
  size: string;
  color: string;
  guestId: string | null;
  userId: string | null;
}

export const createCart = createAsyncThunk<Cart, PayloadCart>(
  "cart/createCart",
  async (cartDetail) => {
    try {
      const res = await api.post("/cart", cartDetail);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateCartItemQuantity = createAsyncThunk<Cart, PayloadCart>(
  "cart/updateCartItemQuantity",
  async (cartDetail) => {
    try {
      const res = await api.put("/cart", cartDetail);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const removeFromCart = createAsyncThunk<
  Cart,
  {
    productId: string;
    size: string;
    color: string;
    guestId: string | null;
    userId: string | null;
  }
>("cart/removeFromCart", async (cartDetail) => {
  try {
    const res = await api.delete("/cart", {
      data: cartDetail,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
export const mergeCart = createAsyncThunk<Cart, string>(
  "cart/mergeCart",
  async (guestId) => {
    try {
      const res = await api.post("/cart/merge", { guestId });
      return res.data;
    } catch (err) {
      console.log("mergecart error:" + err);
    }
  }
);
export const fetchCart = createAsyncThunk<Cart, string>(
  "cart/fetchCart",
  async (cartDetail) => {
    try {
      const res = await api.get(
        `/cart?${
          cartDetail.includes("guest")
            ? `guestId=${cartDetail}`
            : `userId=${cartDetail}`
        }`
      );
      return res.data;
    } catch (err) {
    }
  }
);

interface CartState {
  loadingCart: boolean;
  loadingCartItem: boolean;
  error: string | null;
  cart: Cart | null;
  loadingItemId: string | null;
}
const initialState: CartState = {
  cart: null,
  loadingCart: false,
  loadingCartItem: false,
  loadingItemId: null,
  error: null,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.loadingCart = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loadingCart = false;
        state.cart = action.payload;
      })
      .addCase(updateCartItemQuantity.pending, (state, action) => {
        state.loadingCartItem = true;
        state.error = null;
        const { productId, size, color } = action.meta.arg;
        state.loadingItemId = `${productId}-${size}-${color}`;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loadingCartItem = false;
        state.loadingItemId = null;
        state.cart = action.payload;
      })
      .addCase(removeFromCart.pending, (state, action) => {
        state.error = null;
        const { productId, size, color } = action.meta.arg;
        state.loadingItemId = `${productId}-${size}-${color}`;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loadingItemId = null;
        state.cart = action.payload;
      })
      .addCase(mergeCart.pending, (state) => {
        state.loadingCart = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loadingCart = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
