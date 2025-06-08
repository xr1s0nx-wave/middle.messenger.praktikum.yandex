import Block from "../../core/Block.ts";
import template from "./Registration.hbs?raw";
import RegistrationForm from "../../components/RegistrationForm/index.ts";

class Registration extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const Form = new RegistrationForm({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const data: Record<string, string> = {};
          formData.forEach((value, key) => {
            data[key] = value as string;
          });
          console.log("Registration data submitted:", data);
        },
      },
    });
    super("div", {
      ...props,
      RegistrationForm: Form,
      className: "registration",
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export const RegistrationPage = new Registration({});
