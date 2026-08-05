import axios from "axios";

const API =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/";

export const api = axios.create({
  baseURL: API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
