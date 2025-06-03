import Block from "@/core/Block";

type InputProps = {
  type?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  value?: string;
  events?: Record<string, (e: Event) => void>;
  [key: string]: any;
}

export class Input extends Block {
  constructor(props: InputProps = {}) {
    super("input", {
      ...props,
      attrs: {
        type: props.type || "text",
        placeholder: props.placeholder || "",
        name: props.name || "",
        value: props.value || "",
      },
    });
  }

  public componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.className !== newProps.className) {
      if (this._element) {
        this._element.className = newProps.className || '';
      }
    }
    return false;
  }

  render(): DocumentFragment {
    return this.compile('', this._meta.props);
  }
}
