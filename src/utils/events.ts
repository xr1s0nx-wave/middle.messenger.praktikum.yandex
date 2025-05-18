import { ROUTES, ROUTES_NAMES } from "@/constants";
import Chats from "@/mocks/chats.json";
import ChatsDetails from "@/mocks/chatsDetails.json";

export function addEvents(
  navigate: (page: string, context?: { [x: string]: any }) => void
) {
  const onSearchChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const searchWrap = document.querySelector(".search") as HTMLDivElement;

    if (!searchWrap) return;

    if (target.value.length > 0) {
      searchWrap.classList.add("search--active");
    } else {
      searchWrap.classList.remove("search--active");
    }
  };

  const onClearSearch = () => {
    const searchInput = document.querySelector(
      ".search__input"
    ) as HTMLInputElement;
    const searchWrap = document.querySelector(".search") as HTMLDivElement;

    if (!searchWrap || !searchInput) return;

    searchWrap.classList.remove("search--active");
    searchInput.value = "";
    searchInput.focus();
  };

  const onChatClick = (event: Event) => {
    const currentChatId = (event.currentTarget as HTMLDivElement).getAttribute(
      "data-chat-id"
    );
    if (!currentChatId) return;
    const rerenderedChats = [
      ...Chats.data.map((chat) => ({
        ...chat,
        isActive: chat.id === currentChatId,
      })),
    ];

    const currentChat =
      ChatsDetails[currentChatId as keyof typeof ChatsDetails];

    const [_, context] = ROUTES[ROUTES_NAMES.CHATS].Component;
    navigate(ROUTES_NAMES.CHATS, {
      ...(typeof context === "object" && context !== null ? context : {}),
      Chats: rerenderedChats,
      CurrentChat: currentChat,
    });

    const onEscClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate(ROUTES_NAMES.CHATS);
        document.removeEventListener("keydown", onEscClick);
      }
    };

    document.addEventListener("keydown", onEscClick);
  };

  const onMessageInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const messageInputWrap = document.querySelector(
      ".chats__dialogue-form"
    ) as HTMLDivElement;

    if (!messageInputWrap) return;

    if (target.value.length > 0) {
      messageInputWrap.classList.add("form--active");
    } else {
      messageInputWrap.classList.remove("form--active");
    }
  };

  // Add event listener to the search input
  const searchInput = document.querySelector(
    ".search__input"
  ) as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener("input", onSearchChange);
  }

  // Add event listener to the clear search button
  const clearSearchButton = document.querySelector(
    ".search__clear"
  ) as HTMLButtonElement;
  if (clearSearchButton) {
    clearSearchButton.addEventListener("click", onClearSearch);
  }

  // Add event listener to chat items
  const chatItems = document.querySelectorAll(".chats__item");
  chatItems.forEach((chatItem) => {
    chatItem.addEventListener("click", onChatClick);
  });

  // Add event listener to the message input
  const messageInput = document.querySelector(
    ".chats__dialogue-form .form__input"
  ) as HTMLInputElement;
  if (messageInput) {
    messageInput.addEventListener("input", onMessageInputChange);
  }
}
