import Block from "@/core/Block";
import template from "./Dialogue.hbs?raw";
import DialogueForm from "../DialogueForm/DialogueForm";
interface IMessage {
  text: string;
  time: string;
  isMine?: boolean;
}
interface IChat {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageIsMine?: boolean;
  unreadCount?: number;
  messages?: IMessage[];
}
type DialogueProps = { CurrentChat?: IChat; DialogueForm?: Block };
const Dialogue = class extends Block {
  constructor(props: DialogueProps = {}) {
    const Form = new DialogueForm({});
    super("div", {
      ...props,
      DialogueForm: Form,
      className: "chats__dialogue",
    });
  }
  shouldComponentUpdate(): boolean {
    // Поведение по умолчанию: всегда обновлять
    return true;
  }
  render(): DocumentFragment {
    const CurrentChat = (this._meta.props.CurrentChat || {}) as IChat;
    let messages: Block[] = [];
    if (CurrentChat && Array.isArray(CurrentChat.messages)) {
      messages = CurrentChat.messages.filter((msg) => msg instanceof Block);
    }
    const DialogueForm = this.children.DialogueForm;
    this.children = {};
    if (DialogueForm) {
      this.children.DialogueForm = DialogueForm;
    }
    messages.forEach((msg, idx) => {
      this.children[`msg_${idx}`] = msg;
    });
    const itemsKeys = Object.keys(this.children).filter((k) =>
      k.startsWith("msg_"),
    );
    return this.compile(template, {
      ...this._meta.props,
      itemsKeys,
      DialogueForm,
    });
  }
};
export default Dialogue;
