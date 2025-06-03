import Block from "@/core/Block";
import template from "./LoginForm.hbs?raw";
import { Input, Button } from "@/components";
import { loginValidation } from "@/utils";

export class LoginForm extends Block {
  constructor(props: Record<string, any> = {}) {
    const LoginInput = new Input({
      type: "text",
      placeholder: "Введите логин",
      name: "login",
      onValidate: (error: string | false) => {
        LoginInput.setProps({
          className: error ? "input input--login error" : "input input--login",
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
          className: error ? "input input--password error" : "input input--password",
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
          let error: string | false = false;
          if (input.value.length < 6) error = "Пароль должен быть не менее 6 символов";
          const onValidate = (PasswordInput as any)._meta?.props?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
      },
    });
    const LoginButton = new Button({
      styleType: "primary",
      text: "Войти",
      className: "button button--primary",
      type: "submit",
    });
    const RegisterButton = new Button({
      styleType: "secondary",
      text: "Регистрация",
      className: "button button--outline page--link",
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
