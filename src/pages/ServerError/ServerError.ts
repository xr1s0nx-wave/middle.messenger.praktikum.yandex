import Block from "@/core/Block";
import template from "./ServerError.hbs?raw";

class ServerError extends Block {
  constructor(props: Record<string, any> = {}) {
    super("div", {
      ...props,
      className: "server-error"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const ServerErrorPage = new ServerError({});
