import Block from "@/core/Block";
import template from "./Chats.hbs?raw";
import ChatsData from "@/mocks/chats.json";
import { ChatsList } from "@/components";

class Chats extends Block {
  constructor(props: Record<string, any> = {}) {
    const initialChatId = ChatsData.data[0]?.id || "";
    const chatsList = new ChatsList({
      chats: ChatsData.data,
      currentChatId: initialChatId,
      onChatClick: (id: string) => this.setChatsList(id),
    });
    super("div", {
      ...props,
      currentChatId: initialChatId,
      ChatsList: chatsList,
    });
    this.children.ChatsList = chatsList;
  }

  setChatsList(currentChatId: string) {
    this.setProps({ currentChatId });
    this.children.ChatsList?.setProps({ currentChatId });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const ChatsPage = new Chats({ className: "chats" });
