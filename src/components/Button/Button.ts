import Block from "@/core/Block.ts";
type ButtonProps = {
  text?: string;
  styleType?: "primary" | "outline";
  events?: Record<string, (e: Event) => void>;
  page?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
};
const Button = class extends Block {
  constructor(props: ButtonProps = {}) {
    super("button", {
      ...props,
      className: `${props.className ? props.className + " " : ""}button button--${props.styleType} ${props.page ? "page--link" : ""}`,
      attrs: { page: props.page, type: props.type },
    });
  }
  public render(): DocumentFragment {
    return this.compile("{{text}}", { ...this._meta.props });
  }
};
export default Button;
