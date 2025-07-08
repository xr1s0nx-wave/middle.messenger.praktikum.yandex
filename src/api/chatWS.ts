// WebSocket API для чата Яндекс.Практикум
// Документация: https://ya-praktikum.tech/api/v2/openapi/ws

export type WSMessage =
  | { type: "ping" }
  | { type: "message"; content: string }
  | { type: "get old"; content: string }
  | { type: "file"; content: string }
  | { type: "sticker"; content: string };

export type WSChatMessage = {
  id: string;
  chat_id: string;
  time: string;
  user_id: string;
  content: string;
  type: "message" | "file" | "sticker";
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export class ChatWebSocket {
  private ws: WebSocket | null = null;
  private pingInterval: any = null;
  private chatId: number;
  private userId: number;
  private token: string;
  private queue: WSMessage[] = [];

  constructor(userId: number, chatId: number, token: string) {
    this.userId = userId;
    this.chatId = chatId;
    this.token = token;
  }

  connect(onMessage: (msg: any) => void) {
    this.ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`);
    this.ws.onopen = () => {
      console.log("WS opened", this.userId, this.chatId);
      // Пингуем каждые 30 секунд
      this.pingInterval = setInterval(() => {
        this.send({ type: "ping" });
      }, 30000);
      // Получаем историю
      this.send({ type: "get old", content: "0" });
      // Отправляем все сообщения из очереди
      while (this.queue.length > 0) {
        const msg = this.queue.shift();
        if (msg) this.send(msg);
      }
    };
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch { /* ignore */ }
    };
    this.ws.onclose = (event) => {
      console.log("WS closed", event.code, event.reason);
      if (this.pingInterval) clearInterval(this.pingInterval);
    };
  }

  send(msg: WSMessage) {
    if (this.ws) {
      console.log("WS readyState:", this.ws.readyState, "msg:", msg);
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(msg));
        console.log("WS sent:", msg);
      } else {
        this.queue.push(msg);
        console.log("WS queued:", msg);
      }
    } else {
      this.queue.push(msg);
      console.log("WS is null, queued:", msg);
    }
  }

  sendMessage(text: string) {
    this.send({ type: "message", content: text });
  }

  close() {
    if (this.ws) this.ws.close();
    if (this.pingInterval) clearInterval(this.pingInterval);
  }
}
