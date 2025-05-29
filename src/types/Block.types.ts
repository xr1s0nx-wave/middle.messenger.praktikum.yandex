import type { EventBusTypes } from "./EventBus.types";

export type BlockMetaType = {
    tagName: string;
    props: Record<string, unknown>;
}

export type BlockTypes = {
    _element: HTMLElement | null;
    _meta: BlockMetaType;
    props: Record<string, unknown>;
    eventBus: () => EventBusTypes;
    init: () => void;
    _createResources: () => void;
    _render: () => void;
    componentDidMount: (oldProps?: Record<string, unknown>) => void;
    dispatchComponentDidMount: () => void;
}