import Block from "@/core/Block";
import template from "./Registration.hbs?raw";
import { Input, Button } from "@/components";

class Registration extends Block {
  constructor(props: Record<string, any> = {}) {
    const EmailInput = new Input({
      type: "text",
      placeholder: "Введите почту",
      name: "email"
    });
    const LoginInput = new Input({
      type: "text",
      placeholder: "Введите логин",
      name: "login"
    });
    const FirstNameInput = new Input({
      type: "text",
      placeholder: "Введите имя",
      name: "first_name"
    });
    const SecondNameInput = new Input({
      type: "text",
      placeholder: "Введите фамилию",
      name: "second_name"
    });
    const PasswordInput = new Input({
      type: "password",
      placeholder: "Пароль",
      name: "password"
    });
    const PasswordRepeatInput = new Input({
      type: "password",
      placeholder: "Повторите пароль",
      name: "passwordRepeat"
    });
    const PhoneInput = new Input({
      type: "password",
      placeholder: "Введите номер телефона",
      name: "phone"
    });
    const RegistrationButton = new Button({
      styleType: "primary",
      text: "Зарегистрироваться"
    });
    const LoginButton = new Button({
      styleType: "secondary",
      text: "Войти",
      className: "page--link"
    });
    super("div", {
      ...props,
      EmailInput,
      LoginInput,
      FirstNameInput,
      SecondNameInput,
      PasswordInput,
      PasswordRepeatInput,
      PhoneInput,
      RegistrationButton,
      LoginButton,
      className: "registration"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const RegistrationPage = new Registration({});
