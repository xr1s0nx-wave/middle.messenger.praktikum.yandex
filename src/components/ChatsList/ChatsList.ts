import Block from "@/core/Block";
import ChatItem from "../ChatItem";
import template from "./ChatsList.hbs?raw";
interface IChat {
  id: string;
  title: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageIsMine?: boolean;
  unreadCount?: number;
}
type ChatsListProps = {
  chats: Array<IChat>;
  currentChatId?: string | null;
  onChatClick?: (id: string) => void;
};
const ChatsList = class extends Block {
  constructor(props: ChatsListProps & { onScrollEnd?: () => void }) {
    super("div", { ...props, className: "chats-list" });
  }
  public componentDidMount(): void {
    // Добавляем обработчик скролла для подгрузки чатов
    const el = (this.getContent && this.getContent()) as HTMLElement | null;
    if (el) {
      el.addEventListener("scroll", () => {
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
          if (typeof this._meta.props.onScrollEnd === "function") {
            this._meta.props.onScrollEnd();
          }
        }
      });
    }
  }
  public componentDidUpdate(): boolean {
    console.log(this._meta.props);
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
        title: chat.title, // исправлено
        avatarUrl: chat.avatar, // исправлено
        lastMessage: chat.lastMessage, // исправлено
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
