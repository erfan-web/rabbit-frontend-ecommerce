import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAuthError } from "@/shared/lib/helpers/handleAuthError";
import { authApi } from "@/features/auth/api";
import type { LoginInput, RegisterInput, User } from "@/shared/types";

// ------------------ states ------------------
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

interface AuthState {
  guestId: string;

  // bootstrap profile fetch state
  profileFetched: boolean;

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

  profileFetched: false,

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
  RegisterInput,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    return await authApi.register(userData);
  } catch (err) {
    return handleAuthError(err, rejectWithValue);
  }
});

export const loginUser = createAsyncThunk<
  { message: string },
  LoginInput,
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    return await authApi.login(userData);
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
    return await authApi.logout();
  } catch (err) {
    return handleAuthError(err, rejectWithValue);
  }
});

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await authApi.getProfile();
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
        state.profileFetched = false;
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
    // ----------------fetchCurrentUserMatches----------------
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.profileFetched = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.profileFetched = true;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.profileFetched = true;
      });
  },
});

export default authSlice.reducer;
export const { setUser, clearRegister, clearLogin } = authSlice.actions;
