import { API_URL } from "@/constants/api";
import { HTTPTransport } from "@/utils/HTTPTransport";

const api = new HTTPTransport();

export const userAPI = {
  updateProfile: (data: Record<string, unknown>) => api.put(`${API_URL}/user/profile`, { data, headers: { "Content-Type": "application/json" } }),
  updateAvatar: (data: FormData) => api.put(`${API_URL}/user/profile/avatar`, { data }),
  changePassword: (data: Record<string, unknown>) => api.put(`${API_URL}/user/password`, { data, headers: { "Content-Type": "application/json" } }),
  searchUsers: (login: string) => api.post(`${API_URL}/user/search`, { data: { login }, headers: { "Content-Type": "application/json" } }),
};
