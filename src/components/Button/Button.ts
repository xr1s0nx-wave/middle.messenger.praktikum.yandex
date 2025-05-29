import Block from "@/core/Block";

type ButtonProps = {
  text?: string;
  styleType?: "primary" | "secondary";
  className?: string;
  events?: Record<string, (e: Event) => void>;
};

export class Button extends Block {
  constructor(props: ButtonProps = {}) {
    // Корневой тег теперь button, чтобы не было дублирования
    super("button", props);
  }

  public render(): DocumentFragment {
    // В шаблоне теперь только содержимое кнопки, без <button>
    return this.compile("{{text}}", { ...this._meta.props });
  }
}
