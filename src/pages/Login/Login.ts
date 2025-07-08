import Block from "@/core/Block.ts";
import template from "./Login.hbs?raw";
import { LoginForm } from "@/components";
import Router from "@/utils/Router";

function isAuthenticated() {
  return Boolean(localStorage.getItem("isAuth"));
}

class Login extends Block {
  constructor(props: Record<string, unknown> = {}) {
    if (isAuthenticated()) {
      const router = new Router("#app");
      router.go("/messenger");
      return;
    }
    const Form = new LoginForm({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const data: Record<string, string> = {};
          formData.forEach((value, key) => {
            data[key] = value as string;
          });
          console.log("Login data submitted:", data);
        },
      },
    });
    super("div", {
      ...props,
      LoginForm: Form,
      className: "login",
      validationErrors: {},
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export { Login };
