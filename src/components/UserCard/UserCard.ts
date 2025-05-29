import Block from "@/core/Block";
import template from "./UserCard.hbs?raw";

export class UserCard extends Block {
  constructor(props: Record<string, any> = {}) {
    super("div", {
      ...props,
      className: "usercard"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}
