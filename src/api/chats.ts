import { API_URL } from "@/constants/api";
import { HTTPTransport } from "@/utils/HTTPTransport";

const api = new HTTPTransport();

export const chatsAPI = {
  getChats: (params?: Record<string, unknown>) => api.get(`${API_URL}/chats`, { params }),
  createChat: (data: Record<string, unknown>) => api.post(`${API_URL}/chats`, { data, headers: { "Content-Type": "application/json" } }),
  deleteChat: (data: Record<string, unknown>) => api.delete(`${API_URL}/chats`, { data, headers: { "Content-Type": "application/json" } }),
  addUser: (data: Record<string, unknown>) => api.put(`${API_URL}/chats/users`, { data, headers: { "Content-Type": "application/json" } }),
  removeUser: (data: Record<string, unknown>) => api.delete(`${API_URL}/chats/users`, { data, headers: { "Content-Type": "application/json" } }),
  getToken: (chatId: number) => api.post(`${API_URL}/chats/token/${chatId}`),
  getUsers: (chatId: number) => api.get(`${API_URL}/chats/${chatId}/users`),
};
