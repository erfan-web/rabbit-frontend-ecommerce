import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrorMessage } from "@/shared/lib/api/getApiErrorMessage";
import { ordersApi } from "@/features/orders/api";
import type { Order, OrderStatusType } from "@/shared/types";

// -------------------- Async Thunks --------------------
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, thunkApi) => {
    try {
      return await ordersApi.getAll();
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (id: string, thunkApi) => {
    try {
      return await ordersApi.getById(id);
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
    }
  }
);
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (orderData: { orderId: string; value: OrderStatusType }, thunkApi) => {
    try {
      return await ordersApi.updateStatus(orderData.orderId, orderData.value);
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, thunkApi) => {
    try {
      return await ordersApi.getUserOrders();
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
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
