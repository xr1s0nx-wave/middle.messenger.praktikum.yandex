import Block from "@/core/Block";
import template from "./Settings.hbs?raw";
import UserInfo from "@/mocks/userInfo.json";
import { Button } from "@/components";

class Settings extends Block {
  constructor(props: Record<string, any> = {}) {
    const SaveButton = new Button({
      styleType: "primary",
      text: "Сохранить"
    });
    const LogoutButton = new Button({
      styleType: "outline",
      text: "Выйти"
    });
    super("div", {
      ...props,
      UserInfo,
      SaveButton,
      LogoutButton,
      className: "settings"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const SettingsPage = new Settings({});
