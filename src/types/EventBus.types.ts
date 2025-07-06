export type EventBusTypes = {
  _listeners: Record<string, Function[]>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
  emit: <T extends unknown[]>(event: string, ...args: T) => void;
};
