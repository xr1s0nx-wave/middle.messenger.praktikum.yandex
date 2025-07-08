import { HTTPTransport } from "@/utils/HTTPTransport";

const API_URL = "https://ya-praktikum.tech/api/v2/chats";
const api = new HTTPTransport();

export const chatsAPI = {
  getChats: (params?: { offset?: number; limit?: number }) => api.get(`${API_URL}/`, { data: params }),
  createChat: (data: { title: string }) => api.post(`${API_URL}/`, { data }),
  addUser: (data: { users: number[]; chatId: number }) => api.put(`${API_URL}/users`, { data }),
  removeUser: (data: { users: number[]; chatId: number }) => api.delete(`${API_URL}/users`, { data }),
  getToken: (chatId: number) => api.post(`${API_URL}/token/${chatId}`),
};
