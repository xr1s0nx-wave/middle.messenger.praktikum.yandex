import * as Pages from "../pages/index.ts";
export const ROUTES_NAMES = {
  LOGIN: "login",
  REGISTRATION: "registration",
  CHATS: "chats",
  SETTINGS: "settings",
  NOT_FOUND: "not-found",
};
export const ROUTES = {
  [ROUTES_NAMES.LOGIN]: {
    Component: Pages.Login,
    pageTitle: "Login",
    path: "/",
  },
  [ROUTES_NAMES.REGISTRATION]: {
    Component: Pages.Registration,
    pageTitle: "Registration",
    path: "/sign-up",
  },
  [ROUTES_NAMES.CHATS]: {
    Component: Pages.ChatsPage,
    pageTitle: "Messenger",
    path: "/messenger",
  },
  [ROUTES_NAMES.SETTINGS]: {
    Component: Pages.Settings,
    pageTitle: "Settings",
    path: "/settings",
  },
  [ROUTES_NAMES.NOT_FOUND]: {
    Component: Pages.NotFound,
    pageTitle: "Not Found",
    path: "/not-found",
  },
};
