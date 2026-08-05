import { api } from "@/shared/lib/api/axiosInstance";
import type { User } from "@/shared/types";

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export const usersApi = {
  getAll: () => api.get<User[]>("users").then((r) => r.data),

  create: (data: CreateUserInput) =>
    api.post<{ message: string; newUser: User }>("users", data).then((r) => r.data),

  remove: (userId: string) =>
    api.delete<{ message: string }>(`users/${userId}`).then((r) => r.data),

  updateRole: (userId: string, role: string) =>
    api.put<{ message: string }>(`/users/${userId}`, { role }).then((r) => r.data),
};