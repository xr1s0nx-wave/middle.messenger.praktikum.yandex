import Block from "@/core/Block.ts";
import template from "./SettingsForm.hbs?raw";
import withStore from "@/core/withStore";
import appStore from "@/core/appStore";
import { Button, SettingsInfoRow } from "@/components";
import {
  emailValidation,
  loginValidation,
  nameValidation,
  surnameValidation,
  phoneValidation,
} from "@/utils/validations.ts";

type SettingsFormProps = {
  user?: any;
};

const mapStateToProps = (state: { user: any }) => ({
  user: state.user,
});

class SettingsForm extends Block {
  constructor(arg1?: string | SettingsFormProps, arg2?: SettingsFormProps) {
    let tagName: string;
    let props: SettingsFormProps;
    if (typeof arg1 === "string") {
      tagName = arg1;
      props = arg2 || {};
    } else {
      tagName = "form";
      props = arg1 || {};
    }
    const user = props.user || {};
    const SaveButton = new Button({
      styleType: "primary",
      text: "Сохранить",
      type: "submit",
    });
    const LogoutButton = new Button({ styleType: "outline", text: "Выйти" });
    const emailRow = new SettingsInfoRow({
      label: "Почта:",
      name: "email",
      value: user.email || "",
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
      value: user.login || "",
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = loginValidation(input.value);
        loginRow.setProps({ error });
      },
    });
    const firstNameRow = new SettingsInfoRow({
      label: "Имя:",
      name: "first_name",
      value: user.first_name || "",
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = nameValidation(input.value);
        firstNameRow.setProps({ error });
      },
    });
    const secondNameRow = new SettingsInfoRow({
      label: "Фамилия:",
      name: "second_name",
      value: user.second_name || "",
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = surnameValidation(input.value);
        secondNameRow.setProps({ error });
      },
    });
    const phoneRow = new SettingsInfoRow({
      label: "Телефон:",
      name: "phone",
      value: user.phone || "",
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = phoneValidation(input.value);
        phoneRow.setProps({ error });
      },
    });
    const displayNameRow = new SettingsInfoRow({
      label: "Имя в чате:",
      name: "display_name",
      value: user.display_name || "",
      onBlur: (e: Event) => {},
    });
    // Пароли не подставляем из user
    const oldPasswordRow = new SettingsInfoRow({
      label: "Старый пароль:",
      name: "oldPassword",
      type: "password",
      value: "",
      onBlur: (e: Event) => {},
    });
    const newPasswordRow = new SettingsInfoRow({
      label: "Новый пароль:",
      name: "newPassword",
      type: "password",
      value: "",
      onBlur: (e: Event) => {},
    });
    super(tagName, {
      ...props,
      emailRow,
      loginRow,
      firstNameRow,
      secondNameRow,
      phoneRow,
      SaveButton,
      LogoutButton,
      displayNameRow,
      oldPasswordRow,
      newPasswordRow,
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
  componentDidUpdate(): boolean {
    // @ts-ignore
    const prevUser = this._prevProps?.user;
    const user = this._meta.props.user as {
      email?: string;
      login?: string;
      first_name?: string;
      second_name?: string;
      phone?: string;
      display_name?: string;
    };
    if (prevUser !== user) {
      (this.children.emailRow as any)?.setProps?.({ value: user?.email || "" });
      (this.children.loginRow as any)?.setProps?.({ value: user?.login || "" });
      (this.children.firstNameRow as any)?.setProps?.({ value: user?.first_name || "" });
      (this.children.secondNameRow as any)?.setProps?.({ value: user?.second_name || "" });
      (this.children.phoneRow as any)?.setProps?.({ value: user?.phone || "" });
      (this.children.displayNameRow as any)?.setProps?.({ value: user?.display_name || "" });
    }
    return true;
  }
  render(): DocumentFragment {
    // @ts-ignore
    return (this as any).compile(template, (this as any)._meta.props);
  }
}

export default withStore(SettingsForm, appStore, mapStateToProps);
