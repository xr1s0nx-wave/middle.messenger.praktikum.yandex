import Block from "@/core/Block.ts";
import template from "./UserCard.hbs?raw";
type UserCardProps = { [key: string]: unknown };
const UserCard = class extends Block {
  constructor(props: UserCardProps = {}) {
    super("div", { ...props, className: "usercard" });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default UserCard;
