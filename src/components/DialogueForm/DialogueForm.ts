import Block from "@/core/Block.ts";
import template from "./DialogueForm.hbs?raw";
type DialogueFormProps = { events?: Record<string, (e: Event) => void> };
const DialogueForm = class extends Block {
  constructor(props: DialogueFormProps & { onSend?: (text: string) => void } = {}) {
    super("form", {
      ...props,
      className: "chats__dialogue-form",
      events: {
        input: (e: Event) => this.handleInput(e),
        submit: (e: Event) => this.handleSubmit(e),
      },
    });
  }

  get props() {
    return this._meta.props;
  }

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const form = input.closest("form");
    if (form) {
      if (input.value && input.value.trim() !== "") {
        form.classList.add("form--active");
      } else {
        form.classList.remove("form--active");
      }
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const message = (formData.get("message") as string || "").trim();
    if (!message) return;
    console.log(this.props);
    if (typeof this.props.onSend === "function") {
      this.props.onSend(message);
    }
    form.reset();
    form.classList.remove("form--active");
  }

  public updateEvents() {
    // @ts-ignore
    this._registerEvents();
  }

  componentDidUpdate(): boolean {
    console.log('update')
    this.setProps({
      events: {
        input: (e: Event) => this.handleInput(e),
        submit: (e: Event) => this.handleSubmit(e),
      },
    });
    return true;
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default DialogueForm;
