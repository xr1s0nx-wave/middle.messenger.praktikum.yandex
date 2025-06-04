import Block from "@/core/Block";
import template from "./Settings.hbs?raw";
import { SettingsForm } from "@/components";

class Settings extends Block {
  constructor(props: Record<string, any> = {}) {
    const Form = new SettingsForm({});
    super("div", {
      ...props,
      SettingsForm: Form,
      className: "settings"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const SettingsPage = new Settings({});
