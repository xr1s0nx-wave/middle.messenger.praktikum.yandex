import Block from "@/core/Block.ts";
import template from "./DialogueMessage.hbs?raw";
type DialogueMessageProps = {
  isMine?: boolean;
  className?: string;
  [key: string]: unknown;
};
const DialogueMessage = class extends Block {
  constructor(props: DialogueMessageProps = {}) {
    super("div", {
      ...props,
      className:
        `dialogue__message${props.isMine ? " dialogue__message--mine" : ""} ${props.className || ""}`.trim(),
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default DialogueMessage;
