import Block from "@/core/Block.ts";
import template from "./SettingsForm.hbs?raw";
import UserInfo from "@/mocks/userInfo.json";
import { Button, SettingsInfoRow } from "@/components";
import {
  emailValidation,
  loginValidation,
  nameValidation,
  surnameValidation,
  phoneValidation,
} from "@/utils/validations.ts";
type SettingsFormProps = { [key: string]: unknown };
const SettingsForm = class extends Block {
  constructor(props: SettingsFormProps = {}) {
    const SaveButton = new Button({
      styleType: "primary",
      text: "Сохранить",
      type: "submit",
    });
    const LogoutButton = new Button({ styleType: "outline", text: "Выйти" });
    const emailRow = new SettingsInfoRow({
      label: "Почта:",
      name: "email",
      value: UserInfo.email,
      onBlur: (e: Event) => {
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
          console.log("Settings data submitted:", data);
        },
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default SettingsForm;
