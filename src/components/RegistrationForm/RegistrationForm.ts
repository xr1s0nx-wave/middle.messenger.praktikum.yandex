import Block from "@/core/Block";
import template from "./RegistrationForm.hbs?raw";
import { Input, Button } from "@/components";
import {
  emailValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  repeatPasswordValidation,
  surnameValidation,
} from "@/utils";

export class RegistrationForm extends Block {
  constructor(props: Record<string, any> = {}) {
    const EmailInput = new Input({
      type: "text",
      placeholder: "Введите почту",
      name: "email",
      onValidate: (error: string | false) => {
        EmailInput.setProps({
          error,
        });
        const errors = {
          ...(this._meta?.props?.validationErrors || {}),
        } as Record<string, string | null>;
        errors.email = error || null;
        this.setProps({ validationErrors: errors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = emailValidation(input.value);
          const onValidate = (EmailInput as any)._meta?.props?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
      },
    });
    const LoginInput = new Input({
      type: "text",
      placeholder: "Введите логин",
      name: "login",
      onValidate: (error: string | false) => {
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
    const FirstNameInput = new Input({
      type: "text",
      placeholder: "Введите имя",
      name: "first_name",
      onValidate: (error: string | false) => {
        FirstNameInput.setProps({
          error: error,
        });
        const errors = {
          ...(this._meta?.props?.validationErrors || {}),
        } as Record<string, string | null>;
        errors.first_name = error || null;
        this.setProps({ validationErrors: errors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = nameValidation(input.value);
          const onValidate = (FirstNameInput as any)._meta?.props?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
      },
    });
    const SecondNameInput = new Input({
      type: "text",
      placeholder: "Введите фамилию",
      name: "second_name",
      onValidate: (error: string | false) => {
        SecondNameInput.setProps({
          error: error,
        });
        const errors = {
          ...(this._meta?.props?.validationErrors || {}),
        } as Record<string, string | null>;
        errors.second_name = error || null;
        this.setProps({ validationErrors: errors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = surnameValidation(input.value);
          const onValidate = (SecondNameInput as any)._meta?.props?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
      },
    });
    let currentPassword = "";
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
          currentPassword = input.value;
          const error = passwordValidation(input.value);
          const onValidate = (PasswordInput as any)._meta?.props?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
        input: (e: Event) => {
          const input = e.target as HTMLInputElement;
          currentPassword = input.value;
        },
      },
    });
    const PasswordRepeatInput = new Input({
      type: "password",
      placeholder: "Повторите пароль",
      name: "passwordRepeat",
      onValidate: (error: string | false) => {
        PasswordRepeatInput.setProps({
          error: error,
        });
        const errors = {
          ...(this._meta?.props?.validationErrors || {}),
        } as Record<string, string | null>;
        errors.password_repeat = error || null;
        this.setProps({ validationErrors: errors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = repeatPasswordValidation(currentPassword, input.value);
          const onValidate = (PasswordRepeatInput as any)._meta?.props
            ?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
      },
    });
    const PhoneInput = new Input({
      type: "text",
      placeholder: "Введите номер телефона",
      name: "phone",
      onValidate: (error: string | false) => {
        PhoneInput.setProps({
          error: error,
        });
        const errors = {
          ...(this._meta?.props?.validationErrors || {}),
        } as Record<string, string | null>;
        errors.phone = error || null;
        this.setProps({ validationErrors: errors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = phoneValidation(input.value);
          const onValidate = (PhoneInput as any)._meta?.props?.onValidate;
          if (typeof onValidate === "function") onValidate(error);
        },
      },
    });
    const RegistrationButton = new Button({
      styleType: "primary",
      text: "Зарегистрироваться",
    });
    const LoginButton = new Button({
      styleType: "outline",
      text: "Войти",
      page: "login",
    });
    super("form", {
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
      className: "registration__form",
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}
