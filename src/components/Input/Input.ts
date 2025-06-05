import Block from "@/core/Block.ts";
type InputProps = {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  error?: string | null;
  events?: Record<string, (e: Event) => void>;
  [key: string]: unknown;
};
const Input = class extends Block {
  constructor(props: InputProps = {}) {
    super("input", {
      ...props,
      className: `input input--${props.name}`,
      attrs: {
        type: props.type || "text",
        placeholder: props.placeholder || "",
        name: props.name || "",
        value: props.value || "",
      },
    });
  }
  public componentDidUpdate(
    oldProps: InputProps,
    newProps: InputProps,
  ): boolean {
    if (
      oldProps.error !== newProps.error ||
      oldProps.className !== newProps.className
    ) {
      if (this._element) {
        this._element.className = `input input--${newProps.name}${newProps.error ? " error" : ""}`;
      }
      return false;
    }
    return false;
  }
  render(): DocumentFragment {
    return this.compile("", this._meta.props);
  }
};
export default Input;
