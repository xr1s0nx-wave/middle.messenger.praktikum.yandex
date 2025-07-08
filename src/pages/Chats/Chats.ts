import Block from "../../core/Block.ts";
import template from "./Chats.hbs?raw";
import {
  ChatsList,
  Search,
  UserCard,
  Dialogue,
  DialogueForm,
  CreateChatForm,
  Modal,
  Button, // Добавлен импорт Button
} from "@/components";
import { chatsAPI } from "@/api/chats";
import { ChatWebSocket } from "@/api/chatWS";
import appStore from "@/core/appStore";

interface IChat {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageIsMine?: boolean;
  unreadCount?: number;
  messages?: IMessage[];
}
interface IMessage {
  text: string;
  time: string;
  isMine?: boolean;
}

class Chats extends Block {
  private ws: ChatWebSocket | null = null;
  constructor(props: Record<string, unknown> = {}) {
    const initialChatId = null;
    let offset = 0;
    const limit = 20;
    const searchComponent = new Search({});
    const chatsListComponent = new ChatsList({
      chats: [],
      currentChatId: initialChatId,
      onChatClick: (id: string) => chatsInstance.setChatsList(id),
    });
    const userCardComponent = new UserCard();
    const dialogueFormComponent = new DialogueForm({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const input = form.querySelector("input[name='message']") as HTMLInputElement;
          if (input && input.value.trim() !== "") {
            if (this.ws) {
              this.ws.sendMessage(input.value);
              input.value = ""; // Очистка поля ввода после отправки
            } else {
              console.error("WebSocket не инициализирован");
            }
          }
        },
        input: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const form = input.closest("form");
          if (form) {
            if (input.value && input.value.trim() !== "") {
              form.classList.add("form--active");
            } else {
              form.classList.remove("form--active");
            }
          }
        }
      }
    });
    let modalInstance: Modal | null = null;
    let isLoading = false;
    let allLoaded = false;
    // Функция обновления списка чатов с пагинацией
    const updateChats = (append = false) => {
      if (isLoading || allLoaded) return;
      isLoading = true;
      chatsAPI.getChats({ offset, limit }).then((xhr: XMLHttpRequest) => {
        try {
          const newChats = JSON.parse(xhr.responseText);
          let chats = newChats;
          if (append && Array.isArray(this._meta.props.chats)) {
            chats = [...this._meta.props.chats, ...newChats];
          }
          if (newChats.length < limit) allLoaded = true;
          this.setProps({ chats });
          chatsListComponent.setProps({ chats });
          offset += newChats.length;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("Ошибка загрузки чатов", e);
        } finally {
          isLoading = false;
        }
      });
    };
    // Кнопки пагинации
    const nextPage = () => {
      offset += limit;
      updateChats();
    };
    const prevPage = () => {
      offset = Math.max(0, offset - limit);
      updateChats();
    };
    const nextButton = new Button({
      styleType: "outline",
      text: ">",
      type: "button",
      events: { click: nextPage },
    });
    const prevButton = new Button({
      styleType: "outline",
      text: "<",
      type: "button",
      events: { click: prevPage },
    });
    // Открытие модалки с пробросом onChatCreated
    const openModal = () => {
      if (!modalInstance) {
        const createChatFormComponent = new CreateChatForm({
          onChatCreated: () => {
            this.setProps({ showModal: false });
            modalInstance = null;
            updateChats(); // обновить список чатов
          },
        });
        modalInstance = new Modal({
          content: createChatFormComponent,
          onClose: () => {
            this.setProps({ showModal: false });
            modalInstance = null;
          },
        });
      }
      this.setProps({ showModal: true, modalInstance });
    };
    const createChatButton = new Button({
      styleType: "primary",
      text: "Создать чат",
      type: "button",
      events: {
        click: openModal,
      },
    });
    const dialogueComponent = new Dialogue({
      CurrentChat: undefined, // Исправлено: null -> undefined
      DialogueForm: dialogueFormComponent,
    });
    const chatsInstance = {
      setChatsList: (): void => {},
    } as { setChatsList: (id: string) => void };
    super("div", {
      ...props,
      currentChatId: initialChatId,
      search: "",
      Search: searchComponent,
      ChatsList: chatsListComponent,
      UserCard: userCardComponent,
      Dialogue: dialogueComponent,
      DialogueForm: dialogueFormComponent,
      CreateChatButton: createChatButton,
      showModal: false,
      modalInstance: null,
      className: "chats",
      NextPageButton: nextButton,
      PrevPageButton: prevButton,
    });
    this.children.Search = searchComponent;
    this.children.ChatsList = chatsListComponent;
    this.children.UserCard = userCardComponent;
    this.children.Dialogue = dialogueComponent;
    this.children.DialogueForm = dialogueFormComponent;
    this.children.CreateChatButton = createChatButton;
    chatsInstance.setChatsList = this.setChatsList.bind(this);

    chatsListComponent.setProps({
      onScrollEnd: () => updateChats(true),
    });

    // Загрузка чатов с сервера
    updateChats();
  }

  async setChatsList(currentChatId: string): Promise<void> {
    this.setProps({ currentChatId });
    const chatsList = this.children.ChatsList;
    if (Array.isArray(chatsList)) {
      chatsList.forEach((child) =>
        child.setProps?.({ currentChatId, chats: this._meta.props.chats }),
      );
    } else {
      chatsList?.setProps?.({ currentChatId, chats: this._meta.props.chats });
    }
    const chats: IChat[] = Array.isArray(this._meta.props.chats)
      ? this._meta.props.chats
      : [];
    const chat = chats.find((c) => c.id === currentChatId);
    if (chat) {
      if (this.ws) this.ws.close();
      const userId = appStore.getState().user?.id;
      if (!userId) {
        return;
      }
      // Получаем токен для чата
      let token = "";
      try {
        const xhr = await chatsAPI.getToken(Number(chat.id));
        const res = JSON.parse(xhr.responseText);
        token = res.token;
      } catch (e) {
        console.error("Ошибка получения токена для чата", e);
        return;
      }
      this.ws = new ChatWebSocket(userId, Number(chat.id), token);
      console.log("Connecting to chat:", chat.id);
      this.ws.connect((data) => {
        let messages = appStore.getState().messagesByChatId?.[chat.id] || [];
        if (Array.isArray(data)) {
          messages = [...data.reverse(), ...messages];
        } else if (
          data.type === "message" ||
          data.type === "file" ||
          data.type === "sticker"
        ) {
          messages = [...messages, data];
        }
        appStore.setState({
          messagesByChatId: {
            ...appStore.getState().messagesByChatId,
            [chat.id]: messages,
          },
        });
        const dialogue = this.children.Dialogue;
        if (Array.isArray(dialogue)) {
          dialogue.forEach((dlg) =>
            dlg.setProps?.({ CurrentChat: { ...chat, messages } }),
          );
        } else {
          dialogue?.setProps?.({ CurrentChat: { ...chat, messages } });
        }
      });
      // Передаём сообщения из store
      const messages = appStore.getState().messagesByChatId?.[chat.id] || [];
      const dialogue = this.children.Dialogue;
      if (Array.isArray(dialogue)) {
        dialogue.forEach((dlg) =>
          dlg.setProps?.({ CurrentChat: { ...chat, messages } }),
        );
      } else {
        dialogue?.setProps?.({ CurrentChat: { ...chat, messages } });
      }
    }
  }

  shouldComponentUpdate(): boolean {
    return true;
  }

  render(): DocumentFragment {
    const fragment = this.compile(template, this._meta.props);
    if (this._meta.props.showModal && this._meta.props.modalInstance) {
      // Приведение типа для корректного вызова getContent
      const modal = this._meta.props.modalInstance as Modal;
      fragment.appendChild(modal.getContent());
    }
    return fragment;
  }
}

export { Chats };
