import type { IUser } from "./user";

export interface IMessage {
  id?: number;
  chat_id?: number;
  user_id?: number;
  time: string;
  type?: string;
  content: string;
  isMine?: boolean;
  user?: IUser;
}

export interface IChat {
  id: number;
  title: string;
  avatar?: string;
  unread_count?: number;
  last_message?: IMessage;
  users?: IUser[];
  messages?: IMessage[];
}

export type { IUser };
