import type { EventBusTypes } from "@/types/EventBus.types.ts";
class EventBus implements EventBusTypes {
  _listeners: Record<string, Function[]> = {};
  on(event: string, callback: () => void): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  }
  off(event: string, callback: () => void): void {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter(
      (cb) => cb !== callback,
    );
  }
  emit<T extends unknown[]>(event: string, ...args: T): void {
    if (!this._listeners[event]) return;
    this._listeners[event].forEach((callback) => {
      callback(...args);
    });
  }
}
export default EventBus;
