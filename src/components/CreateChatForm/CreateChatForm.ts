import Block from "../../core/Block";
import template from "./CreateChatForm.hbs?raw";
import { Button, Input } from "@/components";
import { chatsAPI } from "@/api/chats";

class CreateChatForm extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const TitleInput = new Input({
      type: "text",
      name: "title",
      placeholder: "Название чата",
      required: true,
    });
    const CreateButton = new Button({
      styleType: "primary",
      text: "Создать чат",
      type: "submit",
    });
    super("form", {
      ...props,
      TitleInput,
      CreateButton,
      className: "create-chat-form",
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          e.stopPropagation(); // предотвращает всплытие submit
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const title = (formData.get("title") as string) || "";
          if (!title.trim()) {
            alert("Введите название чата");
            return;
          }
          try {
            await chatsAPI.createChat({ title }); // POST /chats с title
            // Если есть callback, вызвать его для закрытия модалки и обновления списка
            if (typeof this._meta.props.onChatCreated === "function") {
              this._meta.props.onChatCreated();
            }
            form.reset();
          } catch {
            alert("Ошибка создания чата");
          }
        },
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export default CreateChatForm;
