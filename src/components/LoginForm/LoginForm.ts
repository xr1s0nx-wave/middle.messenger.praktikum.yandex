import Block from "@/core/Block.ts";
import template from "./LoginForm.hbs?raw";
import { Input, Button } from "@/components";
import { loginValidation, passwordValidation } from "@/utils/validations.ts";
import { authAPI } from "@/api/auth";
type LoginFormProps = { [key: string]: unknown };
const LoginForm = class extends Block {
  constructor(props: LoginFormProps = {}) {
    let validationErrors: {
      login?: string | false;
      password?: string | false;
    } = {};
    const LoginInput = new Input({
      type: "text",
      placeholder: "Введите логин",
      name: "login",
      onValidate: (error: string | false) => {
        LoginInput.setProps({ error });
        validationErrors = { ...validationErrors, login: error };
        this.setProps({ validationErrors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = loginValidation(input.value);
          LoginInput.setProps({ error });
          validationErrors = { ...validationErrors, login: error };
          this.setProps({ validationErrors });
        },
      },
    });
    const PasswordInput = new Input({
      type: "password",
      placeholder: "Введите пароль",
      name: "password",
      onValidate: (error: string | false) => {
        PasswordInput.setProps({ error });
        validationErrors = { ...validationErrors, password: error };
        this.setProps({ validationErrors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = passwordValidation(input.value);
          PasswordInput.setProps({ error });
          validationErrors = { ...validationErrors, password: error };
          this.setProps({ validationErrors });
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
      validationErrors,
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const login = (formData.get("login") as string) || "";
          const password = (formData.get("password") as string) || "";
          const loginError = loginValidation(login);
          const passwordError = passwordValidation(password);
          validationErrors = { login: loginError, password: passwordError };
          this.setProps({ validationErrors });
          LoginInput.setProps({ error: loginError });
          PasswordInput.setProps({ error: passwordError });
          if (!loginError && !passwordError) {
            try {
              await authAPI.signin({ login, password });
              // Получить и обновить user в store
              await authAPI.getUser().then((xhr) => {
                try {
                  const user = JSON.parse(xhr.responseText);
                  import("@/core/appStore").then(({ default: appStore }) => {
                    appStore.setState({ user });
                  });
                } catch { /* ignore */ }
              });
              localStorage.setItem("isAuth", "1");
              if (window.router && typeof window.router.go === "function") {
                window.router.go("/messenger");
              }
            } catch {
              alert("Ошибка авторизации");
            }
          }
        },
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default LoginForm;
