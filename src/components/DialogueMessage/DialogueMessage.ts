import Block from "@/core/Block";
import template from "./DialogueMessage.hbs?raw";

export class DialogueMessage extends Block {
  constructor(props: Record<string, any> = {}) {
    super("div", {
      ...props,
      className: `dialogue__message${props.isMine ? " dialogue__message--mine" : ""} ${props.className || ''}`.trim()
    });
  }

  render(): DocumentFragment {
    console.log(this.compile(template, this._meta.props));
    return this.compile(template, this._meta.props);
  }
}
