import Store from "./Store";
import type { IUser } from "@/types/user";

export interface AppState extends Record<string, unknown> {
  user: IUser | null;
  messagesByChatId?: Record<string, unknown[]>;
  // ...другие поля стора
}

const initialState: AppState = {
  user: null,
  messagesByChatId: {},
};

const appStore = new Store<AppState>(initialState);
export default appStore;
