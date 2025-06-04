import EventBus from "./EventBus";
import { v4 as makeUUID } from "uuid";
import Handlebars from "handlebars";

type TProps = {
  events?: Record<string, (event: Event) => void>;
  [key: string]: unknown;
};

type TMeta = {
  tagName: string;
  props: TProps;
};

class Block {
  static EVENTS = {
    INIT: "init",
    RENDER: "render",
    FLOW_CDM: "flow:component-did-mount",
  };

  protected _meta: TMeta;
  protected _element: HTMLElement | null = null;
  protected _eventBus: EventBus;
  protected _id: string;

  public children: Record<string, Block> = {};

  constructor(tagName = "div", propsAndChildren: TProps = {}) {
    this._eventBus = new EventBus();
    this._id = makeUUID();

    const { props, children } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      tagName,
      props: this._makePropsProxy({ ...props, _id: this._id }),
    };

    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(): void {
    this._eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    this._eventBus.on(Block.EVENTS.RENDER, this._render.bind(this));
  }

  private _init(): void {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.RENDER);
  }

  private _createResources(): void {
    const { tagName, props } = this._meta;
    const element = document.createElement(tagName);

    if (typeof props.className === "string") {
      const classes = props.className.split(" ").filter(Boolean);
      if (classes.length) element.classList.add(...classes);
    }

    if (typeof props.attrs === "object" && props.attrs !== null) {
      Object.entries(props.attrs).forEach(([attr, value]) => {
        if (typeof value === "string") {
          element.setAttribute(attr, value);
        }
      });
    }

    this._element = element;
  }

  private _render(): void {
    if (!this._element) {
      throw new Error("Element is not created");
    }

    const newElement = this.render();

    if (this._element.children.length === 0) {
      this._element.appendChild(newElement);
    } else {
      this._element.replaceChildren(newElement);
    }

    this._removeEventListeners();

    this._addEventListeners();
  }

  private _componentUpdate(oldProps: TProps): void {
    const newProps = this._meta.props;
    if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
      // Если компонент реализует shouldComponentUpdate и он возвращает false — не ререндерим
      if (typeof this.shouldComponentUpdate === 'function') {
        if (!this.shouldComponentUpdate(oldProps, newProps)) {
          return;
        }
      }
      if (this.componentDidUpdate(oldProps, newProps)) {
        this._eventBus.emit(Block.EVENTS.RENDER);
      }
    }
  }

  private _getChildren(propsAndChildren: TProps) {
    const children: any = {};
    const props: TProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });

        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  private _makePropsProxy(props: TProps): TProps {
    return new Proxy(props, {
      set: (target, prop, value) => {
        const oldProps = { ...target };
        target[prop as keyof typeof target] = value;

        this._componentUpdate(oldProps);

        return true;
      },
    });
  }

  private _addEventListeners(): void {
    const { events = {} } = this._meta.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEventListeners(): void {
    const { events = {} } = this._meta.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  public getContent(): HTMLElement {
    return this._element!;
  }

  protected compile(template: string, props: any): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((component) => `<div data-id="${component._id}"></div>`)
          .join("");
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(
            `[data-id="${component._id}"]`
          );
          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
    return true;
  }

  // По умолчанию всегда true, но можно переопределить в наследнике
  public shouldComponentUpdate(_oldProps: TProps, _newProps: TProps): boolean {
    return true;
  }

  public render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getElement(): HTMLElement | null {
    if (!this._element) {
      this._render();
    }
    return this._element;
  }

  public setProps(nextProps: TProps): void {
    if (!nextProps) {
      return;
    }
    Object.assign(this._meta.props, nextProps);
  }
}

export default Block;
