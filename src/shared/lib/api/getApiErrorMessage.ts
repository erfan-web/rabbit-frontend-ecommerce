import axios from "axios";

export const getApiErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.error || "server error";
  }
  return "server error";
};
