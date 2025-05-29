import * as Pages from "@/pages";
import UserInfo from "@/mocks/userInfo.json";
import { ChatsPage } from "@/pages";

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
    Component: [Pages.Login],
    pageTitle: "Login",
  },
  [ROUTES_NAMES.REGISTRATION]: {
    Component: [Pages.Registration],
    pageTitle: "Registration",
  },
  [ROUTES_NAMES.NAVIGATION]: {
    Component: [
      Pages.Navigation,
      {
        routes: Object.values(ROUTES_NAMES),
      },
    ],
    pageTitle: "Navigation",
  },
  [ROUTES_NAMES.CHATS]: {
    Component: ChatsPage,
    pageTitle: "Chats",
  },
  [ROUTES_NAMES.SETTINGS]: {
    Component: [
      Pages.Settings,
      {
        UserInfo,
      },
    ],
    pageTitle: "Settings",
  },
  [ROUTES_NAMES.NOT_FOUND]: {
    Component: [Pages.NotFound],
    pageTitle: "Not Found",
  },
  [ROUTES_NAMES.SERVER_ERROR]: {
    Component: [Pages.ServerError],
    pageTitle: "Server Error",
  },
};
