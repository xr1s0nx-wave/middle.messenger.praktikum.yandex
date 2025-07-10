import EventBus from "./EventBus.ts";

const STORE_UPDATED = "store:updated";

class Store<T extends Record<string, unknown>> {
  private state: T;
  private eventBus: EventBus;

  constructor(initialState: T) {
    this.state = { ...initialState };
    this.eventBus = new EventBus();
  }

  getState(): T {
    return { ...this.state };
  }

  setState(nextState: Partial<T>): void {
    this.state = { ...this.state, ...nextState };
    this.eventBus.emit(STORE_UPDATED, this.getState());
  }

  subscribe(listener: (state: T) => void): () => void {
    this.eventBus.on(STORE_UPDATED, listener);
    // Вернуть функцию для отписки
    return () => {
      this.eventBus.off(STORE_UPDATED, listener);
    };
  }
}

export default Store;
