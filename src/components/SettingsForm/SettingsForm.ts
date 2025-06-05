import Block from "@/core/Block";
import template from "./SettingsForm.hbs?raw";
import UserInfo from "@/mocks/userInfo.json";
import { Button } from "../Button";
import {
  emailValidation,
  loginValidation,
  nameValidation,
  surnameValidation,
  phoneValidation,
} from "@/utils/validations";
import { SettingsInfoRow } from "@/components";

export class SettingsForm extends Block {
  constructor(props: Record<string, any> = {}) {
    const SaveButton = new Button({
      styleType: "primary",
      text: "Сохранить",
      type: "submit",
    });
    const LogoutButton = new Button({
      styleType: "outline",
      text: "Выйти",
    });
    const emailRow = new SettingsInfoRow({
      label: "Почта:",
      name: "email",
      value: UserInfo.email,
      onBlur: (e: Event) => {
        console.log("Blur event on email input");
        const input = e.target as HTMLInputElement;
        const errors: Record<string, string | null> = {};
        const error = emailValidation(input.value);
        errors.email = error || null;
        this.setProps({ validationErrors: errors });
        emailRow.setProps({ error });
      },
    });
    const loginRow = new SettingsInfoRow({
      label: "Логин:",
      name: "login",
      value: UserInfo.login,
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = loginValidation(input.value);
        loginRow.setProps({ error });
      },
    });
    const firstNameRow = new SettingsInfoRow({
      label: "Имя:",
      name: "first_name",
      value: UserInfo.first_name,
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = nameValidation(input.value);
        firstNameRow.setProps({ error });
      },
    });
    const secondNameRow = new SettingsInfoRow({
      label: "Фамилия:",
      name: "second_name",
      value: UserInfo.second_name,
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = surnameValidation(input.value);
        secondNameRow.setProps({ error });
      },
    });
    const phoneRow = new SettingsInfoRow({
      label: "Телефон:",
      name: "phone",
      value: UserInfo.phone,
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = phoneValidation(input.value);
        phoneRow.setProps({ error });
      },
    });
    super("form", {
      ...props,
      emailRow,
      loginRow,
      firstNameRow,
      secondNameRow,
      phoneRow,
      SaveButton,
      LogoutButton,
      UserInfo,
      className: "settings__content",
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const data: Record<string, string> = {};
          formData.forEach((value, key) => {
            data[key] = value as string;
          });
          const errors: Record<string, string | null> = {};
          errors.email = emailValidation(data.email || "") || null;
          errors.login = loginValidation(data.login || "") || null;
          errors.first_name = nameValidation(data.first_name || "") || null;
          errors.second_name =
            surnameValidation(data.second_name || "") || null;
          errors.phone = phoneValidation(data.phone || "") || null;
          // Можно добавить отображение ошибок в UI, если есть соответствующие поля
          console.log("Ошибки валидации:", errors);
          if (Object.values(errors).every((v) => !v)) {
            console.log("Сохранено", data);
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}
