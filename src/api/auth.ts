import { API_URL } from "@/constants/api";
import { HTTPTransport } from "@/utils/HTTPTransport";

const api = new HTTPTransport();

export const authAPI = {
  signup: (data: Record<string, unknown> | FormData) =>
    data instanceof FormData
      ? api.post(`${API_URL}/auth/signup`, { data })
      : api.post(`${API_URL}/auth/signup`, { data, headers: { "Content-Type": "application/json" } }),
  signin: (data: Record<string, unknown> | FormData | string) =>
    data instanceof FormData
      ? api.post(`${API_URL}/auth/signin`, { data })
      : api.post(`${API_URL}/auth/signin`, { data, headers: { "Content-Type": "application/json" } }),
  getUser: () => api.get(`${API_URL}/auth/user`),
  logout: () => api.post(`${API_URL}/auth/logout`),
};
