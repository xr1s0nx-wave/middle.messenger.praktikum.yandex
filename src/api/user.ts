import { HTTPTransport } from "@/utils/HTTPTransport";

const API_URL = "https://ya-praktikum.tech/api/v2/user";
const api = new HTTPTransport();

export const userAPI = {
  getUser: () => api.get(`${API_URL}/profile`),
  updateProfile: (data: Record<string, unknown>) => api.put(`${API_URL}/profile`, { data }),
  updateAvatar: (data: FormData) => api.put(`${API_URL}/profile/avatar`, { data }),
  updatePassword: (data: Record<string, unknown>) => api.put(`${API_URL}/password`, { data }),
  searchUsers: (login: string) => api.post(`${API_URL}/search`, { data: { login }, headers: { "Content-Type": "application/json" } }),
};
