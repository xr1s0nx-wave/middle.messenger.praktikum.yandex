import Block from "@/core/Block";
import template from "./Registration.hbs?raw";
import { RegistrationForm } from "@/components/RegistrationForm/RegistrationForm";

class Registration extends Block {
  constructor(props: Record<string, any> = {}) {
    const Form = new RegistrationForm({});
    super("div", {
      ...props,
      RegistrationForm: Form,
      className: "registration"
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const RegistrationPage = new Registration({});
