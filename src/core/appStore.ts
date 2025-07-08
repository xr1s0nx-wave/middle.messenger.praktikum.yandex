import Store from "./Store";

export interface AppState {
  user: null | {
    id: number;
    login: string;
    avatar?: string;
    [key: string]: unknown;
  };
  messagesByChatId?: Record<string, any[]>;
  // ...другие поля стора
}

const initialState: AppState = {
  user: null,
  messagesByChatId: {},
};

const appStore = new Store<AppState>(initialState);
export default appStore;
