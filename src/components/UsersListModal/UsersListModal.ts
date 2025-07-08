import Block from "@/core/Block";
import template from "./UsersListModal.hbs?raw";
import "./style.scss";
import { chatsAPI } from "@/api/chats";

export type User = {
  id: number;
  login: string;
  display_name?: string;
  avatar?: string;
};

export type UsersListModalProps = {
  users: User[];
  onClose?: () => void;
};

const UsersListModal = class extends Block {
  constructor(props: UsersListModalProps & { chatId?: number }) {
    super("div", {
      ...props,
      className: "users-list-modal",
      events: {
        click: async (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains("users-list-modal__close")) {
            if (typeof props.onClose === "function") props.onClose();
          }
          if (target.classList.contains("users-list-modal__remove")) {
            const userId = Number(target.getAttribute("data-user-id"));
            if (!userId || !props.chatId) return;
            try {
              await chatsAPI.removeUser({ users: [userId], chatId: props.chatId });
              // Получить обновлённый список
              const resp = await chatsAPI.getChatUsers(props.chatId);
              if (resp.status === 200) {
                const users = JSON.parse(resp.responseText);
                this.setProps({ users });
              }
            } catch { /* ignore */ }
          }
        },
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};

export default UsersListModal;
