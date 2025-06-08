import Block from "../../core/Block.ts";
import template from "./NotFound.hbs?raw";

class NotFound extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super("div", {
      ...props,
      className: "not-found",
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const NotFoundPage = new NotFound({});
