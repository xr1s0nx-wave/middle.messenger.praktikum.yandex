import Block from "@/core/Block";
import template from "./Chats.hbs?raw";
import ChatsData from "@/mocks/chats.json";
import ChatsDetails from "@/mocks/chatsDetails.json";
import { ChatsList, Search, UserCard, Dialogue, DialogueMessage } from "@/components";
import UserInfo from "@/mocks/userInfo.json";

class Chats extends Block {
  constructor(props: Record<string, any> = {}) {
    const initialChatId = null;
    const searchComponent = new Search({});
    const chatsListComponent = new ChatsList({
      chats: ChatsData.data,
      currentChatId: initialChatId,
      onChatClick: (id: string) => chatsInstance.setChatsList(id),
    });
    const userCardComponent = new UserCard({ ...UserInfo });
    const dialogueComponent = new Dialogue({ CurrentChat: ChatsData.data[0] });

    const chatsInstance = {
      setChatsList: (id: string) => {},
    } as any;
    super("div", {
      ...props,
      currentChatId: initialChatId,
      search: "",
      Search: searchComponent,
      ChatsList: chatsListComponent,
      UserCard: userCardComponent,
      Dialogue: dialogueComponent,
    });
    this.children.Search = searchComponent;
    this.children.ChatsList = chatsListComponent;
    this.children.UserCard = userCardComponent;
    this.children.Dialogue = dialogueComponent;

    chatsInstance.setChatsList = this.setChatsList.bind(this);
  }

  setChatsList(currentChatId: string) {
    this.setProps({ currentChatId });
    this.children.ChatsList?.setProps({ currentChatId });
    const chat = (ChatsDetails as any)[currentChatId];
    if (chat) {
      const messages = (chat.messages || []).map((msg: any) => new DialogueMessage(msg));
      this.children.Dialogue.setProps({ CurrentChat: { ...chat, messages } });
    }
  }

  shouldComponentUpdate(oldProps: any, newProps: any): boolean {
    const keys = Object.keys({ ...oldProps, ...newProps });
    if (keys.length === 1 && keys[0] === "search") {
      return false;
    }

    return true;
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const ChatsPage = new Chats({ className: "chats" });
