import Block from "@/core/Block";
import template from "./DialogueMessage.hbs?raw";

export class DialogueMessage extends Block {
  constructor(props: Record<string, any> = {}) {
    super("div", {
      ...props,
      className: `dialogue__message ${props.className || ''}`
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}
