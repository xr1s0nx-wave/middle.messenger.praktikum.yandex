import { HTTPTransport } from "@/utils/HTTPTransport";

const API_URL = "https://ya-praktikum.tech/api/v2/auth";
const api = new HTTPTransport();

export const authAPI = {
  signup: (data: Record<string, unknown>) => api.post(`${API_URL}/signup`, { data }),
  signin: (data: Record<string, unknown>) => api.post(`${API_URL}/signin`, { data }),
  logout: () => api.post(`${API_URL}/logout`),
  getUser: () => api.get(`${API_URL}/user`),
};
