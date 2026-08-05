import { api } from "@/shared/lib/api/axiosInstance";
import type { LoginInput, RegisterInput, User } from "@/shared/types";

export const authApi = {
  register: (data: RegisterInput) =>
    api.post<{ message: string }>("auth/register", data).then((r) => r.data),

  login: (data: LoginInput) =>
    api.post<{ message: string }>("auth/login", data).then((r) => r.data),

  logout: () =>
    api.get<{ message: string }>("auth/logout").then((r) => r.data),

  getProfile: () => api.get<User>("/users/profile").then((r) => r.data),
};