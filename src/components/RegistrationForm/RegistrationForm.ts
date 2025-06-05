import Block from "@/core/Block.ts";
import template from "./RegistrationForm.hbs?raw";
import Input from "../Input/Input.ts";
import Button from "../Button/Button.ts";
import {
  emailValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  repeatPasswordValidation,
  surnameValidation,
} from "@/utils/validations.ts";
type RegistrationFormProps = { [key: string]: unknown };
const RegistrationForm = class extends Block {
  constructor(props: RegistrationFormProps = {}) {
    const EmailInput = new Input({
      type: "text",
      placeholder: "Введите почту",
      name: "email",
      onValidate: (error: string | false) => {
        EmailInput.setProps({ error });
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
    const FirstNameInput = new Input({
      type: "text",
      placeholder: "Введите имя",
      name: "first_name",
      onValidate: (error: string | false) => {
        FirstNameInput.setProps({ error });
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
        SecondNameInput.setProps({ error });
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
    const PasswordRepeatInput = new Input({
      type: "password",
      placeholder: "Повторите пароль",
      name: "passwordRepeat",
      onValidate: (error: string | false) => {
        PasswordRepeatInput.setProps({ error });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = repeatPasswordValidation(
            (PasswordInput as any)._meta?.props?.value,
            input.value,
          );
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
        PhoneInput.setProps({ error });
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
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const email = (formData.get("email") as string) || "";
          const login = (formData.get("login") as string) || "";
          const firstName = (formData.get("first_name") as string) || "";
          const secondName = (formData.get("second_name") as string) || "";
          const password = (formData.get("password") as string) || "";
          const passwordRepeat =
            (formData.get("passwordRepeat") as string) || "";
          const phone = (formData.get("phone") as string) || "";
          const errors: Record<string, string | null> = {};
          errors.email = emailValidation(email) || null;
          errors.login = loginValidation(login) || null;
          errors.first_name = nameValidation(firstName) || null;
          errors.second_name = surnameValidation(secondName) || null;
          errors.password = passwordValidation(password) || null;
          errors.password_repeat =
            repeatPasswordValidation(password, passwordRepeat) || null;
          errors.phone = phoneValidation(phone) || null;
          EmailInput.setProps({ error: errors.email });
          LoginInput.setProps({ error: errors.login });
          FirstNameInput.setProps({ error: errors.first_name });
          SecondNameInput.setProps({ error: errors.second_name });
          PasswordInput.setProps({ error: errors.password });
          PasswordRepeatInput.setProps({ error: errors.password_repeat });
          PhoneInput.setProps({ error: errors.phone });
          this.setProps({ validationErrors: errors });
          if (Object.values(errors).every((v) => !v)) {
            console.log("Регистрация успешна", {
              email,
              login,
              firstName,
              secondName,
              password,
              passwordRepeat,
              phone,
            });
          }
        },
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default RegistrationForm;
