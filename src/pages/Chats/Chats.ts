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

interface IChat {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageIsMine?: boolean;
  unreadCount?: number;
  messages?: IMessage[];
}
interface IMessage {
  text: string;
  time: string;
  isMine?: boolean;
}

class Chats extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const initialChatId = null;
    const searchComponent = new Search({});
    const chatsListComponent = new ChatsList({
      chats: (ChatsData as { data: IChat[] }).data,
      currentChatId: initialChatId,
      onChatClick: (id: string) => chatsInstance.setChatsList(id),
    });
    const userCardComponent = new UserCard({ ...UserInfo });
    const dialogueFormComponent = new DialogueForm({});
    const dialogueComponent = new Dialogue({
      CurrentChat: (ChatsData as { data: IChat[] }).data[0],
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
    const chats = (ChatsData as { data: IChat[] }).data;
    this.setProps({ currentChatId });
    const chatsList = this.children.ChatsList;
    if (Array.isArray(chatsList)) {
      chatsList.forEach((child) => child.setProps?.({ currentChatId, chats }));
    } else {
      chatsList?.setProps?.({ currentChatId, chats });
    }
    const chat = (ChatsDetails as Record<string, IChat>)[currentChatId];
    if (chat) {
      const messages = (chat.messages || []).map(
        (msg: IMessage) => new DialogueMessage({ ...msg }),
      );
      const dialogue = this.children.Dialogue;
      if (Array.isArray(dialogue)) {
        dialogue.forEach((dlg) => dlg.setProps?.({ CurrentChat: { ...chat, messages } }));
      } else {
        dialogue?.setProps?.({ CurrentChat: { ...chat, messages } });
      }
    }
  }

  shouldComponentUpdate(): boolean {
    return true;
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const ChatsPage = new Chats({ className: "chats" });
