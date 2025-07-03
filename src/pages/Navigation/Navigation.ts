import { ROUTES } from "@/constants/routes.ts";
import Block from "../../core/Block.ts";
import template from "./Navigation.hbs?raw";

class Navigation extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super("nav", {
      ...props,
      className: "navigation",
      routes: Object.values(ROUTES).map(route => route.path),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export { Navigation };
