import Block from "@/core/Block";

type ButtonProps = {
  text?: string;
  styleType?: "primary" | "outline";
  events?: Record<string, (e: Event) => void>;
  page?: string;
  type?: "button" | "submit" | "reset";
};

export class Button extends Block {
  constructor(props: ButtonProps = {}) {
    super("button", {
      ...props,
      className: `button button--${props.styleType} ${props.page ? 'page--link' : ''}`,
      attrs: { page: props.page, type: props.type },
    });
  }

  public render(): DocumentFragment {
    return this.compile("{{text}}", { ...this._meta.props });
  }
}
