import Block from "@/core/Block.ts";
import template from "./LoginForm.hbs?raw";
import { Input, Button } from "@/components";
import { loginValidation, passwordValidation } from "@/utils/validations.ts";
type LoginFormProps = { [key: string]: unknown };
const LoginForm = class extends Block {
  constructor(props: LoginFormProps = {}) {
    const LoginInput = new Input({
      type: "text",
      placeholder: "Введите логин",
      name: "login",
      onValidate: (error: string | false) => {
        LoginInput.setProps({ error });
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
      placeholder: "Введите пароль",
      name: "password",
      onValidate: (error: string | false) => {
        PasswordInput.setProps({ error });
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
    super("form", {
      ...props,
      LoginInput,
      PasswordInput,
      LoginButton,
      className: "login__form",
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const data: Record<string, string> = {};
          formData.forEach((value, key) => {
            data[key] = value as string;
          });
          console.log("Login form submitted:", data);
        },
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default LoginForm;
