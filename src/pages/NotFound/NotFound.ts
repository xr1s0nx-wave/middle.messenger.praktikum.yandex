import Block from "@/core/Block";
import template from "./NotFound.hbs?raw";

class NotFound extends Block {
  constructor(props: Record<string, any> = {}) {
    super("div", {
      ...props,
      className: "not-found"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const NotFoundPage = new NotFound({});
