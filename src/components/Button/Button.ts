import Block from "@/core/Block";

type ButtonProps = {
  text?: string;
  styleType?: "primary" | "secondary";
  className?: string;
  events?: Record<string, (e: Event) => void>;
  page?: string;
  type?: "button" | "submit" | "reset";
};

export class Button extends Block {
  constructor(props: ButtonProps = {}) {
    super("button", { ...props, attrs: { page: props.page, type: props.type } });
  }

  public render(): DocumentFragment {
    return this.compile("{{text}}", { ...this._meta.props });
  }
}
