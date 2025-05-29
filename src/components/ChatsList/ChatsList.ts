import Block from "@/core/Block";
import { ChatItem } from "../ChatItem";
import template from "./ChatsList.hbs?raw";

export class ChatsList extends Block {
  constructor(props: Record<string, any> = {}) {
    super("div", {
      ...props,
      className: "chats__items",
    });
  }

  public componentDidUpdate(oldProps: any, newProps: any): boolean {
    return (
      oldProps.currentChatId !== newProps.currentChatId ||
      oldProps.chats !== newProps.chats
    );
  }

  render(): DocumentFragment {
    let { chats = [], currentChatId, onChatClick } = this._meta.props;
    if (!Array.isArray(chats)) chats = [];
    this.children = {};
    const itemsKeys: string[] = [];
    (chats as any[]).forEach((chat: Record<string, any>, idx: number) => {
      const key = `item_${idx}`;
      this.children[key] = new ChatItem({
        ...chat,
        currentChatId,
        events: {
          click: () => typeof onChatClick === "function" && onChatClick(chat.id),
        },
      });
      itemsKeys.push(key);
    });
    return this.compile(template, {
      ...this._meta.props,
      itemsKeys,
    });
  }
}