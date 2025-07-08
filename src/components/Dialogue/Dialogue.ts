import Block from "@/core/Block";
import template from "./Dialogue.hbs?raw";
import DialogueForm from "../DialogueForm/DialogueForm";
import { Modal, AddUserToChatForm, Button } from "@/components";
interface IMessage {
  text: string;
  time: string;
  isMine?: boolean;
}
interface IChat {
  id: string;
  title: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageIsMine?: boolean;
  unreadCount?: number;
  messages?: IMessage[];
}
type DialogueProps = { CurrentChat?: IChat; DialogueForm?: Block };
const Dialogue = class extends Block {
  constructor(props: DialogueProps = {}) {
    const Form = new DialogueForm({});
    let modalInstance: Modal | null = null;
    const openAddUserModal = () => {
      if (!props.CurrentChat) return;
      if (!modalInstance) {
        const addUserForm = new AddUserToChatForm({
          chatId: props.CurrentChat.id,
          onUserAdded: () => {
            this.setProps({ showAddUserModal: false });
            modalInstance = null;
          },
        });
        modalInstance = new Modal({
          content: addUserForm,
          onClose: () => {
            this.setProps({ showAddUserModal: false });
            modalInstance = null;
          },
        });
      }
      this.setProps({ showAddUserModal: true, modalInstance });
    };
    const AddUserButton = new Button({
      styleType: "primary",
      text: "+",
      type: "button",
      className: "add-user-btn",
      events: { click: openAddUserModal },
    });
    super("div", {
      ...props,
      DialogueForm: Form,
      AddUserButton,
      className: "chats__dialogue",
      showAddUserModal: false,
      modalInstance: null,
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
    // AddUserButton всегда актуальный
    const AddUserButton = new Button({
      styleType: "primary",
      text: "+",
      type: "button",
      className: "add-user-btn",
      events: {
        click: () => {
          const chatId = CurrentChat?.id;
          if (!chatId) return;
          const addUserForm = new AddUserToChatForm({
            chatId,
            onUserAdded: () => {
              this.setProps({ showAddUserModal: false, modalInstance: null });
            },
          });
          const modalInstance = new Modal({
            content: addUserForm,
            onClose: () => {
              this.setProps({ showAddUserModal: false, modalInstance: null });
            },
          });
          this.setProps({ showAddUserModal: true, modalInstance });
        },
      },
    });
    this.children = {};
    if (DialogueForm) {
      this.children.DialogueForm = DialogueForm;
    }
    this.children.AddUserButton = AddUserButton;
    messages.forEach((msg, idx) => {
      this.children[`msg_${idx}`] = msg;
    });
    const itemsKeys = Object.keys(this.children).filter((k) =>
      k.startsWith("msg_"),
    );
    const fragment = this.compile(template, {
      ...this._meta.props,
      itemsKeys,
      DialogueForm,
      AddUserButton,
    });
    if (this._meta.props.showAddUserModal && this._meta.props.modalInstance) {
      const modal = this._meta.props.modalInstance as Modal;
      fragment.appendChild(modal.getContent());
    }
    return fragment;
  }
};
export default Dialogue;
