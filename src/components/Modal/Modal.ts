import Block from "@/core/Block.ts";
import template from "./Modal.hbs?raw";
import "./style.scss";

class Modal extends Block {
  constructor(props: { content: Block; onClose?: () => void }) {
    super("div", {
      className: "modal__overlay",
      ...props,
      events: {
        click: (e: Event) => {
          if ((e.target as HTMLElement).classList.contains("modal__overlay")) {
            props.onClose?.();
          }
        },
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export default Modal;
