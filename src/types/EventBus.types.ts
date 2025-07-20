export type EventBusTypes = {
  _listeners: Record<string, Function[]>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
  emit: <T extends unknown[]>(event: string, ...args: T) => void;
};
