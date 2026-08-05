import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrorMessage } from "@/shared/lib/api/getApiErrorMessage";
import { usersApi } from "@/features/admin/api";
import type { User } from "@/shared/types";

// -------------------- Async Thunks --------------------
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkApi) => {
    try {
      return await usersApi.getAll();
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
    }
  }
);
export const addUser = createAsyncThunk(
  "user/addUser",
  async (
    userData: {
      name: string;
      email: string;
      password: string;
      role: string;
    },
    thunkApi
  ) => {
    try {
      return await usersApi.create(userData);
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, thunkApi) => {
    try {
      return await usersApi.remove(userId);
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
    }
  }
);
export const updateUser = createAsyncThunk(
  "order/updateUser",
  async (userData: { userId: string; role: string }, thunkApi) => {
    try {
      return await usersApi.updateRole(userData.userId, userData.role);
    } catch (err) {
      return thunkApi.rejectWithValue(getApiErrorMessage(err));
    }
  }
);

// -------------------- State --------------------
interface UserState {
  users: User[];
  usersLoading: boolean;
  usersError: string | null;

  user: User | null;
  userMessage: string;
  userLoading: boolean;
  userError: string | null;
}

export const initialState: UserState = {
  users: [],
  usersLoading: false,
  usersError: null,

  user: null,
  userMessage: "",
  userLoading: false,
  userError: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserAfterDelete: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    setUserAfterUpdate: (state, action) => {
      const { userId, role } = action.payload;
      state.users = state.users.map((user) => {
        if (user._id === userId) user.role = role;
        return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload as string;
      });
    builder
      .addCase(addUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userMessage = action.payload.message;
        state.user = action.payload.newUser;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
      });
  },
});
export const { setUserAfterDelete, setUserAfterUpdate } = userSlice.actions;
export default userSlice.reducer;
