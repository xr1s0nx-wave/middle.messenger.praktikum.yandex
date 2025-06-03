import Block from "@/core/Block";
import template from "./LoginForm.hbs?raw";
import { Input, Button } from "@/components";
import { loginValidation, passwordValidation } from "@/utils";

export class LoginForm extends Block {
  constructor(props: Record<string, any> = {}) {
    const LoginInput = new Input({
      type: "text",
      placeholder: "Введите логин",
      name: "login",
      onValidate: (error: string | false) => {
        console.log(error);
        LoginInput.setProps({
          error: error,
        });
        const errors = {
          ...(this._meta?.props?.validationErrors || {}),
        } as Record<string, string | null>;
        errors.login = error || null;
        this.setProps({ validationErrors: errors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = loginValidation(input.value);
          const onValidate = (LoginInput as any)._meta?.props?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
      },
    });
    const PasswordInput = new Input({
      type: "password",
      placeholder: "Пароль",
      name: "password",
      onValidate: (error: string | false) => {
        PasswordInput.setProps({
          error,
        });
        const errors = {
          ...(this._meta?.props?.validationErrors || {}),
        } as Record<string, string | null>;
        errors.password = error || null;
        this.setProps({ validationErrors: errors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = passwordValidation(input.value);
          const onValidate = (PasswordInput as any)._meta?.props?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
      },
    });
    const LoginButton = new Button({
      styleType: "primary",
      text: "Войти",
      type: "submit",
    });
    const RegisterButton = new Button({
      styleType: "outline",
      text: "Регистрация",
      page: "registration",
    });
    super("form", {
      ...props,
      LoginInput,
      PasswordInput,
      LoginButton,
      RegisterButton,
      className: "login__form",
      validationErrors: {},
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}
