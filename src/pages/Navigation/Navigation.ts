import Block from "@/core/Block";
import template from "./Navigation.hbs?raw";

class Navigation extends Block {
  constructor(props: Record<string, any> = {}) {
    super("nav", {
      ...props,
      className: "navigation"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const NavigationPage = new Navigation({ routes: [
  "login", "registration", "chats", "settings", "not-found", "server-error"
] });
