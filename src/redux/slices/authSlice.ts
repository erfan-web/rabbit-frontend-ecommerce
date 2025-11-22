import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAuthError } from "../../lib/helpers/handleAuthError";
import api from "../../lib/helpers/axiosInstance";
import type { User } from "../../types";

// ------------------ states ------------------
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

interface AuthState {
  guestId: string;

  // register state
  userLoading: boolean;
  userError: string | null | undefined;
  user: User | null;

  // login state
  regMessage: string;
  regLoading: boolean;
  regError: string | null | undefined;

  // user state
  loginMessage: string;
  loginLoading: boolean;
  loginError: string | null | undefined;

  // logout state
  logoutMessage: string;
  logoutLoading: boolean;
  logoutError: string | null | undefined;
}

const initialState: AuthState = {
  guestId: initialGuestId,

  // register state
  regMessage: "",
  regLoading: false,
  regError: null,

  // login state
  loginMessage: "",
  loginLoading: false,
  loginError: null,

  // user state
  userLoading: false,
  userError: null,
  user: null,
  // logout state
  logoutMessage: "",
  logoutLoading: false,
  logoutError: null,
};

// ------------------ thunk ------------------
export const registerUser = createAsyncThunk<
  { message: string },
  { email: string; password: string; name: string },
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const res = await api.post("auth/register", userData);
    const data = res.data;
    return data;
  } catch (err) {
    return handleAuthError(err, rejectWithValue);
  }
});

export const loginUser = createAsyncThunk<
  { message: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const res = await api.post("auth/login", userData);
    const data = res.data;
    return data;
  } catch (err) {
    return handleAuthError(err, rejectWithValue);
  }
});

export const logoutUser = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: string }
>("auth/logoutUser", async (_NEVER, { rejectWithValue }) => {
  try {
    const res = await api.get("auth/logout");
    const data = res.data;
    return data;
  } catch (err) {
    return handleAuthError(err, rejectWithValue);
  }
});

// ------------------ auth reducer ------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload as User;
    },
    clearLogin: (state) => {
      state.loginMessage = "";
    },
    clearRegister: (state) => {
      state.regMessage = "";
    },
  },
  extraReducers: (builder) => {
    // ----------------registerUserMatches----------------
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.regLoading = false;
        state.regMessage = action.payload.message;
        state.regError = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.regLoading = true;
        state.regMessage = "";
        state.regError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.regLoading = false;
        state.regError = action.payload;
      });
    // ----------------loginUserMatches----------------
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginMessage = action.payload.message;
        state.loginError = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginMessage = "";
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      });
    // ----------------LogoutMatches----------------
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = null;
        state.user = null;
        state.logoutMessage = action.payload.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutMessage = "";
        state.logoutError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { setUser, clearRegister, clearLogin } = authSlice.actions;
