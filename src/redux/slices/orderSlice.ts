import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/helpers/axiosInstance";
import type { Order } from "../../types";

// -------------------- Async Thunks --------------------
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, thunkApi) => {
    try {
      const res = await api.get(`/order`);
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err.response.data.error || "server error"
      );
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (id: string, thunkApi) => {
    try {
      const res = await api.get(`/order/single/${id}`);
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err.response.data.error || "server error"
      );
    }
  }
);
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (orderData: { orderId: string; value: string }, thunkApi) => {
    try {
      const res = await api.put(`/order/${orderData.orderId}`, {
        status: orderData.value,
      });
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err.response.data.error || "server error"
      );
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, thunkApi) => {
    try {
      const res = await api.get(`/order/user-orders`);
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err.response.data.error || "server error"
      );
    }
  }
);

// -------------------- State --------------------
interface OrderState {
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;

  order: Order | null;
  orderLoading: boolean;
  orderError: string | null;

  userOrders: Order[];
  userOrdersLoading: boolean;
  userOrdersError: string | null;

  totalSales: number;
}

export const initialState: OrderState = {
  orders: [],
  ordersLoading: false,
  ordersError: null,

  order: null,
  orderLoading: false,
  orderError: null,

  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null,

  totalSales: 0,
};

// -------------------- Slice --------------------
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderAfterUpdate: (state, action) => {
      const { orderId, value } = action.payload;
      state.orders = state.orders.map((order) => {
        if (order._id === orderId) order.status = value;
        return order;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.error.message as string;
      });
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload as string;
      });
    builder
      .addCase(updateOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.orderLoading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.error.message as string;
      });
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError = action.error.message as string;
      });
  },
});

// -------------------- Exports --------------------
export const { setOrderAfterUpdate } = orderSlice.actions;

export default orderSlice.reducer;
