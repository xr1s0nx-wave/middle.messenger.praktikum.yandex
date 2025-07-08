import { HTTPTransport } from "@/utils/HTTPTransport";

const API_URL = "https://ya-praktikum.tech/api/v2/auth";
const api = new HTTPTransport();

export const authAPI = {
  signup: (data: Record<string, unknown> | FormData) =>
    data instanceof FormData
      ? api.post(`${API_URL}/signup`, { data })
      : api.post(`${API_URL}/signup`, { data, headers: { "Content-Type": "application/json" } }),
  signin: (data: Record<string, unknown> | FormData | string) =>
    data instanceof FormData
      ? api.post(`${API_URL}/signin`, { data })
      : api.post(`${API_URL}/signin`, { data, headers: { "Content-Type": "application/json" } }),
  logout: () => api.post(`${API_URL}/logout`),
  getUser: () =>
    api.get(`${API_URL}/user`).then((xhr) => {
      if (xhr.status === 401) {
        localStorage.removeItem("isAuth");
      }
      return xhr;
    }),
};
