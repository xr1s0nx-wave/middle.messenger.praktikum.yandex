import Block from "@/core/Block";
import temaplte from "./ChatItem.hbs?raw";

export class ChatItem extends Block {
  constructor(props: Record<string, any> = {}) {
    super("div", {
        ...props,
        className: `chats__item ${props.currentChatId === props.id ? "chats__item--active" : ""}`,
    });
  }

  public componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.currentChatId !== newProps.currentChatId) {
      this.setProps({
        className: `chats__item ${newProps.currentChatId === newProps.id ? "chats__item--active" : ""}`,
      });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(temaplte, {
      ...this._meta.props,
    });
  }
}
