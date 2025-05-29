import Block from "@/core/Block";
import template from "./Dialogue.hbs?raw";

export class Dialogue extends Block {
  constructor(props: Record<string, any> = {}) {
    super("div", {
      ...props,
      className: "chats__dialogue"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}
