import Block from "@/core/Block";
import template from "./AddUserToChatForm.hbs?raw";
import { Button, Input } from "@/components";
import { chatsAPI } from "@/api/chats";
import { userAPI } from "@/api/user";
import "./style.scss";

class AddUserToChatForm extends Block {
  lastSearchValue: string = "";

  constructor(props: { chatId: string; onUserAdded?: () => void }) {
    let searchTimeout: any = null;
    const UserIdInput = new Input({
      type: "text",
      name: "userId",
      placeholder: "Введите логин пользователя",
      required: true,
      events: {
        input: (e: Event) => {
          const value = (e.target as HTMLInputElement).value.trim();
          this.lastSearchValue = value;
          if (searchTimeout) clearTimeout(searchTimeout);
          if (!value) {
            // Очищаем только если уже не пусто
            if (Array.isArray(this._meta.props.searchResults) && this._meta.props.searchResults.length > 0) {
              this.setProps({ searchResults: [] });
            }
            return;
          }
          searchTimeout = setTimeout(async () => {
            try {
              const resp = await userAPI.searchUsers(value);
              if (resp.status === 200 && this.lastSearchValue === value) {
                let searchResults = JSON.parse(resp.responseText);
                if (!Array.isArray(searchResults)) searchResults = [];
                // Создаём Button-компоненты для каждого пользователя с onClick
                this.children.searchResultButtons = searchResults.map((user: any) =>
                  new Button({
                    text: `${user.login} (${user.first_name} ${user.second_name})`,
                    type: "button",
                    styleType: "primary",
                    className: "add-user-to-chat-form__result-btn",
                    events: {
                      click: () => this.addUserToChat(user)
                    }
                  })
                );
                this.setProps({ searchResults: searchResults.map((u: any) => u.id) });
              }
            } catch { /* ignore */ }
          }, 300);
        },
      },
    });
    super("form", {
      ...props,
      UserIdInput,
      className: "add-user-to-chat-form",
      searchResults: [],
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
        },
        // click обработчик больше не нужен
      },
    });
  }
  async addUserToChat(user: any) {
    const props = this._meta.props;
    try {
      const resp = await chatsAPI.addUser({ users: [user.id], chatId: Number(props.chatId) });
      if (resp && resp.status === 401) {
        localStorage.removeItem("isAuth");
        if ((window as any).router && typeof (window as any).router.go === "function") {
          (window as any).router.go("/");
        }
        return;
      }
      if (typeof props.onUserAdded === "function") props.onUserAdded();
    } catch { /* ignore */ }
  }
  // Гарантируем ререндер при изменении searchResults
  shouldComponentUpdate(): boolean {
    console.log(this._meta.props.searchResults);
    return true;
  }
  render(): DocumentFragment {
    console.log("render searchResults", this._meta.props.searchResults);
    return this.compile(template, this._meta.props);
  }
}

export default AddUserToChatForm;
