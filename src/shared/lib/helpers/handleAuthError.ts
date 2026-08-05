import axios from "axios";

export const handleAuthError = <T>(
  err: unknown,
  rejectWithValue: (value: string) => T
) => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    if (status === 500 || status === 404) {
      return rejectWithValue("internal server error");
    }
    return rejectWithValue(err.response?.data.error);
  }
  return rejectWithValue("unexpected error");
};
