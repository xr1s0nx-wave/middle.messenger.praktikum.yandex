import * as Pages from "../pages/index.ts";
export const ROUTES_NAMES = {
  LOGIN: "login",
  REGISTRATION: "registration",
  NAVIGATION: "navigation",
  CHATS: "chats",
  SETTINGS: "settings",
  NOT_FOUND: "not-found",
  SERVER_ERROR: "server-error",
};
export const ROUTES = {
  [ROUTES_NAMES.LOGIN]: {
    Component: Pages.Login,
    pageTitle: "Login",
    path: "/login",
  },
  [ROUTES_NAMES.REGISTRATION]: {
    Component: Pages.Registration,
    pageTitle: "Registration",
    path: "/registration",
  },
  [ROUTES_NAMES.NAVIGATION]: {
    Component: Pages.Navigation,
    pageTitle: "Navigation",
    path: "/navigation",
  },
  [ROUTES_NAMES.CHATS]: {
    Component: Pages.ChatsPage,
    pageTitle: "Chats",
    path: "/chats",
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
  [ROUTES_NAMES.SERVER_ERROR]: {
    Component: Pages.ServerError,
    pageTitle: "Server Error",
    path: "/server-error",
  },
};
