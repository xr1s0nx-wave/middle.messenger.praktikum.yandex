import Block from "@/core/Block";
import template from "./Input.hbs?raw";

export class Input extends Block {
  constructor(props: Record<string, any> = {}) {
    super("input", {
      ...props,
      className: `input input--${props.name || ''}`
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}
