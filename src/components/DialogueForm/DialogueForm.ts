import Block from "@/core/Block.ts";
import template from "./DialogueForm.hbs?raw";
type DialogueFormProps = { events?: Record<string, (e: Event) => void> };
const DialogueForm = class extends Block {
  constructor(props: DialogueFormProps & { onSend?: (text: string) => void } = {}) {
    console.log(props);
    super("form", {
      ...props,
      className: "chats__dialogue-form",
    });
  }

  get props() {
    return this._meta.props;
  }

  public updateEvents() {
    // @ts-expect-error
    // this._registerEvents();
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default DialogueForm;
