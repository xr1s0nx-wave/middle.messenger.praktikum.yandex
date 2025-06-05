import Block from "../../core/Block.ts";
import template from "./Navigation.hbs?raw";

class Navigation extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super("nav", {
      ...props,
      className: "navigation",
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const NavigationPage = new Navigation({
  routes: [
    "login",
    "registration",
    "chats",
    "settings",
    "not-found",
    "server-error",
  ],
});
