import Block from "@/core/Block";
import ChatItem from "../ChatItem";
import template from "./ChatsList.hbs?raw";
type ChatsListProps = {
  chats: Array<any>;
  currentChatId?: string | null;
  onChatClick?: (id: string) => void;
};
interface IChat {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageIsMine?: boolean;
  unreadCount?: number;
}
const ChatsList = class extends Block {
  constructor(props: ChatsListProps) {
    super("div", { ...props, className: "chats-list" });
  }
  public componentDidUpdate(): boolean {
    return true;
  }
  render(): DocumentFragment {
    const {
      chats = [],
      currentChatId,
      onChatClick,
    } = this._meta.props as ChatsListProps;
    this.children = {};
    const itemsKeys: string[] = [];
    chats.forEach((chat: IChat, idx: number) => {
      const key = `item_${idx}`;
      this.children[key] = new ChatItem({
        id: chat.id,
        name: chat.name,
        avatarUrl: chat.avatarUrl,
        lastMessage: chat.lastMessage,
        lastMessageIsMine: chat.lastMessageIsMine,
        unreadCount: chat.unreadCount,
        selected: chat.id === currentChatId,
        events: {
          click: () =>
            typeof onChatClick === "function" && onChatClick(chat.id),
        },
      });
      itemsKeys.push(key);
    });
    return this.compile(template, { ...this._meta.props, itemsKeys });
  }
};
export default ChatsList;
