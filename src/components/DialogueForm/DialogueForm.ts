import Block from "@/core/Block.ts";
import template from "./DialogueForm.hbs?raw";
type DialogueFormProps = { events?: Record<string, (e: Event) => void> };
const DialogueForm = class extends Block {
  constructor(props: DialogueFormProps = {}) {
    super("form", {
      ...props,
      className: "chats__dialogue-form",
      events: {
        input: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const form = input.closest("form");
          if (form) {
            if (input.value && input.value.trim() !== "") {
              form.classList.add("form--active");
            } else {
              form.classList.remove("form--active");
            }
          }
        },
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const data: Record<string, any> = {};
          formData.forEach((value, key) => {
            data[key] = value;
          });
          console.log(data);
        },
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default DialogueForm;
