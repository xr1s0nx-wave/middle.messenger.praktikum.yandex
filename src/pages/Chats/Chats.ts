import Block from "../../core/Block.ts";
import template from "./Chats.hbs?raw";
import ChatsData from "../../mocks/chats.json";
import ChatsDetails from "../../mocks/chatsDetails.json";
import UserInfo from "../../mocks/userInfo.json";
import {
  ChatsList,
  Search,
  UserCard,
  Dialogue,
  DialogueMessage,
  DialogueForm,
  CreateChatForm,
  Modal,
  Button, // Добавлен импорт Button
} from "@/components";
import { chatsAPI } from "@/api/chats";

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
  constructor(props: Record<string, unknown> = {}) {
    const initialChatId = null;
    const searchComponent = new Search({});
    const chatsListComponent = new ChatsList({
      chats: [],
      currentChatId: initialChatId,
      onChatClick: (id: string) => chatsInstance.setChatsList(id),
    });
    const userCardComponent = new UserCard();
    const dialogueFormComponent = new DialogueForm({});
    let modalInstance: Modal | null = null;
    // Функция обновления списка чатов
    const updateChats = () => {
      chatsAPI.getChats().then((xhr: XMLHttpRequest) => {
        try {
          const chats = JSON.parse(xhr.responseText);
          this.setProps({ chats });
          chatsListComponent.setProps({ chats });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("Ошибка загрузки чатов", e);
        }
      });
    };
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
    });
    this.children.Search = searchComponent;
    this.children.ChatsList = chatsListComponent;
    this.children.UserCard = userCardComponent;
    this.children.Dialogue = dialogueComponent;
    this.children.DialogueForm = dialogueFormComponent;
    this.children.CreateChatButton = createChatButton;
    chatsInstance.setChatsList = this.setChatsList.bind(this);

    // Загрузка чатов с сервера
    updateChats();
  }

  setChatsList(currentChatId: string): void {
    const chats = (ChatsData as { data: IChat[] }).data;
    this.setProps({ currentChatId });
    const chatsList = this.children.ChatsList;
    if (Array.isArray(chatsList)) {
      chatsList.forEach((child) => child.setProps?.({ currentChatId, chats }));
    } else {
      chatsList?.setProps?.({ currentChatId, chats });
    }
    const chat = (ChatsDetails as Record<string, IChat>)[currentChatId];
    if (chat) {
      const messages = (chat.messages || []).map(
        (msg: IMessage) => new DialogueMessage({ ...msg }),
      );
      const dialogue = this.children.Dialogue;
      if (Array.isArray(dialogue)) {
        dialogue.forEach((dlg) => dlg.setProps?.({ CurrentChat: { ...chat, messages } }));
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
