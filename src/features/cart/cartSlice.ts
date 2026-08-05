import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrorMessage } from "@/shared/lib/api/getApiErrorMessage";
import { cartApi, type CartPayload } from "@/features/cart/api";
import { checkoutApi, type ShippingAddress } from "@/features/cart/checkoutApi";
import type { Cart } from "@/shared/types";

export const createCart = createAsyncThunk<
  Cart,
  CartPayload,
  { rejectValue: string }
>("cart/createCart", async (cartDetail, { rejectWithValue }) => {
  try {
    return await cartApi.create(cartDetail);
  } catch (err) {
    return rejectWithValue(getApiErrorMessage(err));
  }
});
export const updateCartItemQuantity = createAsyncThunk<
  Cart,
  CartPayload,
  { rejectValue: string }
>("cart/updateCartItemQuantity", async (cartDetail, { rejectWithValue }) => {
  try {
    return await cartApi.updateQuantity(cartDetail);
  } catch (err) {
    return rejectWithValue(getApiErrorMessage(err));
  }
});
export const removeFromCart = createAsyncThunk<
  Cart,
  Omit<CartPayload, "quantity">,
  { rejectValue: string }
>("cart/removeFromCart", async (cartDetail, { rejectWithValue }) => {
  try {
    return await cartApi.remove(cartDetail);
  } catch (err) {
    return rejectWithValue(getApiErrorMessage(err));
  }
});
export const mergeCart = createAsyncThunk<
  Cart,
  string,
  { rejectValue: string }
>("cart/mergeCart", async (guestId, { rejectWithValue }) => {
  try {
    return await cartApi.merge(guestId);
  } catch (err) {
    return rejectWithValue(getApiErrorMessage(err));
  }
});
export const fetchCart = createAsyncThunk<
  Cart,
  string,
  { rejectValue: string }
>("cart/fetchCart", async (cartDetail, { rejectWithValue }) => {
  try {
    return await cartApi.get(cartDetail);
  } catch (err) {
    return rejectWithValue(getApiErrorMessage(err));
  }
});

export const createCheckout = createAsyncThunk<
  { payLink: string },
  ShippingAddress,
  { rejectValue: string }
>("cart/createCheckout", async (shippingAddress, { rejectWithValue }) => {
  try {
    return await checkoutApi.create(shippingAddress);
  } catch (err) {
    return rejectWithValue(getApiErrorMessage(err));
  }
});

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
      .addCase(createCart.rejected, (state, action) => {
        state.loadingCart = false;
        state.error = action.payload || "server error";
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
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loadingCartItem = false;
        state.loadingItemId = null;
        state.error = action.payload || "server error";
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
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loadingItemId = null;
        state.error = action.payload || "server error";
      })
      .addCase(mergeCart.pending, (state) => {
        state.loadingCart = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loadingCart = false;
        state.cart = action.payload;
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loadingCart = false;
        state.error = action.payload || "server error";
      })
      .addCase(fetchCart.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload || "server error";
      });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
