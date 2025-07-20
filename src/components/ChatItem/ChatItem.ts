import Block from "../../core/Block";
import template from "./ChatItem.hbs?raw";

type ChatItemProps = {
  id: string;
  title: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageIsMine?: boolean;
  unreadCount?: number;
  selected?: boolean;
  events?: Record<string, (e: Event) => void>;
};

const ChatItem = class extends Block {
  constructor(props: ChatItemProps) {
    console.log(props);
    super("div", {
      ...props,
      className: `chats__item${props.selected ? " chats__item--active" : ""}`,
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};

export default ChatItem;
