import Block from "@/core/Block";
import template from "./SettingsForm.hbs?raw";
import UserInfo from "@/mocks/userInfo.json";
import { Button } from "../Button";
import { emailValidation, loginValidation, nameValidation, surnameValidation, phoneValidation } from "@/utils/validations";

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
    super("div", {
      ...props,
      UserInfo,
      SaveButton,
      LogoutButton,
      className: "settings",
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const data: Record<string, string> = {};
          formData.forEach((value, key) => {
            data[key] = value as string;
          });
          const errors: Record<string, string|null> = {};
          errors.email = emailValidation(data.email || "") || null;
          errors.login = loginValidation(data.login || "") || null;
          errors.first_name = nameValidation(data.first_name || "") || null;
          errors.second_name = surnameValidation(data.second_name || "") || null;
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
