import Block from "@/core/Block";
import template from "./Dialogue.hbs?raw";
import { Modal, AddUserToChatForm, Button } from "@/components";
import DialogueMessage from "../DialogueMessage/DialogueMessage";
import appStore from "@/core/appStore";
import UsersListModal from "@/components/UsersListModal/UsersListModal";
import { chatsAPI } from "@/api/chats";
import type { IChat, IUser } from "@/types/chat";
interface DialogueProps {
  CurrentChat?: IChat;
  DialogueForm?: Block;
}
const Dialogue = class extends Block {
  private modalInstance: Modal | null = null;
  private usersListModalInstance: Modal | null = null;
  constructor(props: DialogueProps = {}) {
    super("div", {
      ...props,
      className: "chats__dialogue",
      showAddUserModal: false,
      modalInstance: null,
      showUsersListModal: false,
      usersListModalInstance: null,
    });
    const openAddUserModal = () => {
      const chat = this._meta.props.CurrentChat as IChat;
      if (!chat || !chat.id) return;
      this.modalInstance = null;
      const addUserForm = new AddUserToChatForm({
        chatId: String(chat.id), // string for AddUserToChatForm
        onUserAdded: () => {
          this.setProps({ showAddUserModal: false });
          this.modalInstance = null;
        },
      });
      this.modalInstance = new Modal({
        content: addUserForm,
        onClose: () => {
          this.setProps({ showAddUserModal: false });
          this.modalInstance = null;
        },
      });
      this.setProps({ showAddUserModal: true, modalInstance: this.modalInstance });
    };
    const openUsersListModal = async () => {
      const chat = this._meta.props.CurrentChat as IChat;
      if (!chat) return;
      this.usersListModalInstance = null;
      let users: IUser[] = [];
      try {
        const resp = await chatsAPI.getUsers(Number(chat.id));
        if (resp.status === 200) {
          users = JSON.parse(resp.responseText);
        }
      } catch { /* ignore */ }
      const usersList = new UsersListModal({
        users,
        chatId: chat.id, // number for UsersListModal
        onClose: () => {
          this.setProps({ showUsersListModal: false });
          this.usersListModalInstance = null;
        },
      });
      this.usersListModalInstance = new Modal({
        content: usersList,
        onClose: () => {
          this.setProps({ showUsersListModal: false });
          this.usersListModalInstance = null;
        },
      });
      this.setProps({ showUsersListModal: true, usersListModalInstance: this.usersListModalInstance });
    };
    const AddUserButton = new Button({
      styleType: "primary",
      text: "+",
      type: "button",
      className: "add-user-btn",
      events: { click: openAddUserModal },
    });
    const UsersListButton = new Button({
      styleType: "outline",
      text: "👥",
      type: "button",
      className: "users-list-btn",
      events: { click: openUsersListModal },
    });
    this.setProps({ AddUserButton, UsersListButton });
  }
  shouldComponentUpdate(): boolean {
    // Поведение по умолчанию: всегда обновлять
    return true;
  }
  render(): DocumentFragment {
    const CurrentChat = (this._meta.props.CurrentChat || {}) as IChat;
    let messages: Block[] = [];
    if (CurrentChat && Array.isArray(CurrentChat.messages)) {
      const userId = appStore.getState().user?.id;
      messages = CurrentChat.messages.map((msg) =>
        new DialogueMessage({ ...msg, isMine: msg.user_id === userId }),
      );
    }
    // Не пересоздаём this.children, а только обновляем сообщения
    const DialogueForm = this.children.DialogueForm || this._meta.props.DialogueForm;
    const AddUserButton = this.children.AddUserButton || this._meta.props.AddUserButton;
    const UsersListButton = this.children.UsersListButton || this._meta.props.UsersListButton;
    // Очищаем только сообщения
    Object.keys(this.children).forEach((k) => {
      if (k.startsWith("msg_")) delete this.children[k];
    });
    if (DialogueForm) this.children.DialogueForm = DialogueForm as Block;
    if (AddUserButton) this.children.AddUserButton = AddUserButton as Block;
    if (UsersListButton) this.children.UsersListButton = UsersListButton as Block;
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
      UsersListButton,
    });
    if (this._meta.props.showAddUserModal && this._meta.props.modalInstance) {
      const modal = this._meta.props.modalInstance as Modal;
      fragment.appendChild(modal.getContent());
    }
    if (this._meta.props.showUsersListModal && this._meta.props.usersListModalInstance) {
      const usersModal = this._meta.props.usersListModalInstance as Modal;
      fragment.appendChild(usersModal.getContent());
    }
    return fragment;
  }
};
export default Dialogue;
