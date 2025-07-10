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
import { BASE_URL } from "@/constants/api";
import type { IUser } from "@/types/user";

type SettingsFormProps = {
  user?: IUser | null;
};

const mapStateToProps = (state: { user: IUser | null }) => ({
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
    const user = props.user || null;
    // Формируем avatarUrl для аватара
    let avatarUrl = "/vite.svg";
    if (user && user.avatar) {
      // Если avatar уже абсолютный путь (например, начинается с http), не добавлять домен
      if (/^https?:/.test(user.avatar)) {
        avatarUrl = user.avatar;
      } else {
        avatarUrl = `${BASE_URL}/api/v2/resources${user.avatar}`;
      }
      // Добавляем v для обхода кэша
      avatarUrl += `?v=${user.avatar}`;
    }
    const SaveButton = new Button({
      styleType: "primary",
      text: "Сохранить",
      type: "submit",
    });
    const LogoutButton = new Button({
      styleType: "outline",
      text: "Выйти",
      type: "button",
      events: {
        click: async () => {
          const { authAPI } = await import("@/api/auth");
          await authAPI.logout();
          import("@/core/appStore").then(({ default: appStore }) => {
            appStore.setState({ user: null });
          });
          localStorage.removeItem("isAuth");
          if (window.router && typeof window.router.go === "function") {
            window.router.go("/");
          }
        },
      },
    });
    const emailRow = new SettingsInfoRow({
      label: "Почта:",
      name: "email",
      value: user?.email || "",
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
      value: user?.login || "",
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = loginValidation(input.value);
        loginRow.setProps({ error });
      },
    });
    const firstNameRow = new SettingsInfoRow({
      label: "Имя:",
      name: "first_name",
      value: user?.first_name || "",
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = nameValidation(input.value);
        firstNameRow.setProps({ error });
      },
    });
    const secondNameRow = new SettingsInfoRow({
      label: "Фамилия:",
      name: "second_name",
      value: user?.second_name || "",
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = surnameValidation(input.value);
        secondNameRow.setProps({ error });
      },
    });
    const phoneRow = new SettingsInfoRow({
      label: "Телефон:",
      name: "phone",
      value: user?.phone || "",
      onBlur: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const error = phoneValidation(input.value);
        phoneRow.setProps({ error });
      },
    });
    const displayNameRow = new SettingsInfoRow({
      label: "Имя в чате:",
      name: "display_name",
      value: user?.display_name || "",
      onBlur: () => {},
    });
    // Пароли не подставляем из user
    const oldPasswordRow = new SettingsInfoRow({
      label: "Старый пароль:",
      name: "oldPassword",
      type: "password",
      value: "",
      onBlur: () => {},
    });
    const newPasswordRow = new SettingsInfoRow({
      label: "Новый пароль:",
      name: "newPassword",
      type: "password",
      value: "",
      onBlur: () => {},
    });
    const AvatarInput = document.createElement("input");
    AvatarInput.type = "file";
    AvatarInput.accept = "image/*";
    AvatarInput.style.display = "none";
    const UploadAvatarButton = new Button({
      styleType: "primary",
      text: "Загрузить аватар",
      type: "button",
      events: {
        click: () => {
          AvatarInput.click();
        },
      },
    });
    AvatarInput.addEventListener("change", async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const formData = new FormData();
        formData.append("avatar", target.files[0]);
        const { userAPI } = await import("@/api/user");
        await userAPI.updateAvatar(formData);
        const { authAPI } = await import("@/api/auth");
        await authAPI.getUser().then((xhr) => {
          try {
            const user = JSON.parse(xhr.responseText);
            import("@/core/appStore").then(({ default: appStore }) => {
              appStore.setState({ user });
            });
          } catch { /* ignore */ }
        });
      }
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
      UploadAvatarButton,
      displayNameRow,
      oldPasswordRow,
      newPasswordRow,
      className: "settings__content",
      avatar: avatarUrl,
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const data: Record<string, string> = {};
          formData.forEach((value, key) => {
            data[key] = value as string;
          });
          // Проверка и смена пароля
          if (data.oldPassword && data.newPassword) {
            const { userAPI } = await import("@/api/user");
            try {
              await userAPI.changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
              });
              // Можно добавить уведомление об успешной смене пароля
            } catch {
              alert("Ошибка смены пароля");
              return;
            }
          }
          // Исключить поля паролей и фото
          const profileData = { ...data };
          delete profileData.oldPassword;
          delete profileData.newPassword;
          const { userAPI } = await import("@/api/user");
          await userAPI.updateProfile(profileData);
          // После успешного обновления профиля — обновить user в store
          const { authAPI } = await import("@/api/auth");
          await authAPI.getUser().then((xhr) => {
            try {
              const user = JSON.parse(xhr.responseText);
              import("@/core/appStore").then(({ default: appStore }) => {
                appStore.setState({ user });
              });
            } catch { /* ignore */ }
          });
          console.log("Settings data submitted:", data);
        },
      },
    });
    // Добавить input в DOM
    setTimeout(() => {
      const formEl = document.querySelector("form.settings__content");
      if (formEl) formEl.appendChild(AvatarInput);
    }, 0);
  }
  componentDidUpdate(): boolean {
    // @ts-expect-error: _prevProps is not typed in Block base class, but used for diffing user
    const prevUser = this._prevProps?.user as IUser | null;
    const user = this._meta.props.user as IUser | null;
    if (prevUser !== user) {
      (this.children.emailRow as Block)?.setProps?.({ value: user?.email || "" });
      (this.children.loginRow as Block)?.setProps?.({ value: user?.login || "" });
      (this.children.firstNameRow as Block)?.setProps?.({ value: user?.first_name || "" });
      (this.children.secondNameRow as Block)?.setProps?.({ value: user?.second_name || "" });
      (this.children.phoneRow as Block)?.setProps?.({ value: user?.phone || "" });
      (this.children.displayNameRow as Block)?.setProps?.({ value: user?.display_name || "" });
      // Обновляем avatarUrl если изменился avatar
      let avatarUrl = "/vite.svg";
      if (user && user.avatar) {
        if (/^https?:/.test(user.avatar)) {
          avatarUrl = user.avatar;
        } else {
          avatarUrl = `${BASE_URL}/api/v2/resources${user.avatar}`;
        }
        avatarUrl += `?v=${user.avatar}`;
      }
      this.setProps({ avatar: avatarUrl });
    }
    return true;
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export default withStore(SettingsForm, appStore, mapStateToProps);
