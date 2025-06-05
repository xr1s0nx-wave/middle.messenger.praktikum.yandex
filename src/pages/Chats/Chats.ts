import Block from "../../core/Block.ts";
import template from "./Chats.hbs?raw";
import ChatsData from "../../mocks/chats.json";
import ChatsDetails from "../../mocks/chatsDetails.json";
import UserInfo from "../../mocks/userInfo.json";
import {
  ChatsList,
  Search,
  UserCard,
  Dialogue,
  DialogueMessage,
  DialogueForm,
} from "@/components";

class Chats extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const initialChatId = null;
    const searchComponent = new Search({});
    const chatsListComponent = new ChatsList({
      chats: (ChatsData as any).data,
      currentChatId: initialChatId,
      onChatClick: (id: string) => chatsInstance.setChatsList(id),
    });
    const userCardComponent = new UserCard({ ...UserInfo });
    const dialogueFormComponent = new DialogueForm({});
    const dialogueComponent = new Dialogue({
      CurrentChat: (ChatsData as any).data[0],
      DialogueForm: dialogueFormComponent,
    });
    const chatsInstance = {
      setChatsList: (): void => {},
    } as { setChatsList: (id: string) => void };
    super("div", {
      ...props,
      currentChatId: initialChatId,
      search: "",
      Search: searchComponent,
      ChatsList: chatsListComponent,
      UserCard: userCardComponent,
      Dialogue: dialogueComponent,
      DialogueForm: dialogueFormComponent,
    });
    this.children.Search = searchComponent;
    this.children.ChatsList = chatsListComponent;
    this.children.UserCard = userCardComponent;
    this.children.Dialogue = dialogueComponent;
    this.children.DialogueForm = dialogueFormComponent;
    chatsInstance.setChatsList = this.setChatsList.bind(this);
  }

  setChatsList(currentChatId: string): void {
    this.setProps({ currentChatId });
    this.children.ChatsList?.setProps({ currentChatId });
    const chat = (ChatsDetails as Record<string, any>)[currentChatId];
    if (chat) {
      const messages = (chat.messages || []).map(
        (msg: any) => new DialogueMessage(msg),
      );
      this.children.Dialogue.setProps({ CurrentChat: { ...chat, messages } });
    }
  }

  shouldComponentUpdate(): boolean {
    // Поведение по умолчанию: всегда обновлять
    return true;
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const ChatsPage = new Chats({ className: "chats" });
