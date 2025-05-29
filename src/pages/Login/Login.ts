import Block from "@/core/Block";
import template from "./Login.hbs?raw";
import { Input, Button } from "@/components";

class Login extends Block {
  constructor(props: Record<string, any> = {}) {
    const LoginInput = new Input({
      type: "text",
      placeholder: "Введите логин",
      name: "login"
    });
    const PasswordInput = new Input({
      type: "password",
      placeholder: "Пароль",
      name: "password"
    });
    const LoginButton = new Button({
      styleType: "primary",
      text: "Войти"
    });
    const RegisterButton = new Button({
      styleType: "secondary",
      text: "Регистрация",
      className: "page--link"
    });
    super("div", {
      ...props,
      LoginInput,
      PasswordInput,
      LoginButton,
      RegisterButton,
      className: "login"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const LoginPage = new Login({});
