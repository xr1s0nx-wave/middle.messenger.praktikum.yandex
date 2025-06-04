import Block from "@/core/Block";
import template from "./Dialogue.hbs?raw";
import { DialogueForm } from "@/components";

export class Dialogue extends Block {
  constructor(props: Record<string, any> = {}) {
    const Form = new DialogueForm({});
    super("div", {
      ...props,
      DialogueForm: Form,
      className: "chats__dialogue",
    });
  }

  shouldComponentUpdate(oldProps: any, newProps: any): boolean {
    const keys = Object.keys({ ...oldProps, ...newProps });
    if (keys.length === 1 && keys[0] === "search") {
      return false;
    }

    return true;
  }

  render(): DocumentFragment {
    const CurrentChat = (this._meta.props.CurrentChat || {}) as any;
    let messages: Block[] = [];
    if (CurrentChat && Array.isArray(CurrentChat.messages)) {
      messages = CurrentChat.messages;
    }
    const DialogueForm = this.children.DialogueForm as Block;
    this.children = {};
    if (DialogueForm) {
      this.children.DialogueForm = DialogueForm;
    }
    messages.forEach((msg, idx) => {
      this.children[`msg_${idx}`] = msg;
    });

    const itemsKeys = Object.keys(this.children).filter((k) => k.startsWith("msg_"));
    return this.compile(template, { ...this._meta.props, itemsKeys, DialogueForm });
  }
}
