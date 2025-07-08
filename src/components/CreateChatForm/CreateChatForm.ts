import Block from "@/core/Block.ts";
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
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const title = (formData.get("title") as string) || "";
          if (!title.trim()) {
            alert("Введите название чата");
            return;
          }
          try {
            await chatsAPI.createChat({ title });
            alert("Чат успешно создан!");
            form.reset();
            // Можно добавить обновление списка чатов через событие или props
          } catch (err) {
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
