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
    let validationErrors: Record<string, string | false | null> = {};
    const EmailInput = new Input({
      type: "text",
      placeholder: "Введите почту",
      name: "email",
      onValidate: (error: string | false) => {
        EmailInput.setProps({ error });
        validationErrors = { ...validationErrors, email: error };
        this.setProps({ validationErrors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = emailValidation(input.value);
          EmailInput.setProps({ error });
          validationErrors = { ...validationErrors, email: error };
          this.setProps({ validationErrors });
        },
      },
    });
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
    const FirstNameInput = new Input({
      type: "text",
      placeholder: "Введите имя",
      name: "first_name",
      onValidate: (error: string | false) => {
        FirstNameInput.setProps({ error });
        validationErrors = { ...validationErrors, first_name: error };
        this.setProps({ validationErrors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = nameValidation(input.value);
          FirstNameInput.setProps({ error });
          validationErrors = { ...validationErrors, first_name: error };
          this.setProps({ validationErrors });
        },
      },
    });
    const SecondNameInput = new Input({
      type: "text",
      placeholder: "Введите фамилию",
      name: "second_name",
      onValidate: (error: string | false) => {
        SecondNameInput.setProps({ error });
        validationErrors = { ...validationErrors, second_name: error };
        this.setProps({ validationErrors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = surnameValidation(input.value);
          SecondNameInput.setProps({ error });
          validationErrors = { ...validationErrors, second_name: error };
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
    const PasswordRepeatInput = new Input({
      type: "password",
      placeholder: "Повторите пароль",
      name: "passwordRepeat",
      onValidate: (error: string | false) => {
        PasswordRepeatInput.setProps({ error });
        validationErrors = { ...validationErrors, password_repeat: error };
        this.setProps({ validationErrors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          // Для сравнения паролей нужно получить значение из PasswordInput
          const passwordValue =
            (
              document.querySelector(
                "input[name='password']",
              ) as HTMLInputElement
            )?.value || "";
          const error = repeatPasswordValidation(passwordValue, input.value);
          PasswordRepeatInput.setProps({ error });
          validationErrors = { ...validationErrors, password_repeat: error };
          this.setProps({ validationErrors });
        },
      },
    });
    const PhoneInput = new Input({
      type: "text",
      placeholder: "Введите номер телефона",
      name: "phone",
      onValidate: (error: string | false) => {
        PhoneInput.setProps({ error });
        validationErrors = { ...validationErrors, phone: error };
        this.setProps({ validationErrors });
      },
      events: {
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const error = phoneValidation(input.value);
          PhoneInput.setProps({ error });
          validationErrors = { ...validationErrors, phone: error };
          this.setProps({ validationErrors });
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
      validationErrors,
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
          const errors: Record<string, string | false | null> = {};
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
            console.log("Registration data submitted:", {
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
