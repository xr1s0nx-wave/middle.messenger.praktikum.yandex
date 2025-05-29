import type { EventBusTypes } from "@/types/EventBus.types";

class EventBus implements EventBusTypes {
  _listeners: Record<string, Function[]>;

  constructor() {
    this._listeners = {};
  }

  on(event: string, callback: () => void): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  }

  off(event: string, callback: () => void): void {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    const index = this._listeners[event].indexOf(callback);
    if (index === -1) {
      throw new Error(`Нет подписки на событие: ${event}`);
    }

    this._listeners[event].splice(index, 1);
  }

  emit<T extends unknown[]>(event: string, ...args: T): void {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this._listeners[event].forEach((callback) => {
      callback(...args);
    });
  }
}

export default EventBus;
