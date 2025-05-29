export type EventBusTypes = {
    _listeners: Record<string, Function[]>;
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
    emit: <T extends unknown[]>(event: string, ...args: T) => void;
}
