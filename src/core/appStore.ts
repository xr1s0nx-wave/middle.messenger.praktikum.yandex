import Store from "./Store";

export interface AppState {
  user: null | {
    id: number;
    login: string;
    avatar?: string;
    [key: string]: unknown;
  };
  // ...другие поля стора
}

const initialState: AppState = {
  user: null,
};

const appStore = new Store<AppState>(initialState);
export default appStore;
