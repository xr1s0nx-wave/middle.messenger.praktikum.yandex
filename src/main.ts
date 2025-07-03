import "@/style.scss";
import { ROUTES } from "@/constants";
import Router from "./utils/Router";

const router = new Router("#app");

// Регистрируем все роуты из ROUTES
Object.entries(ROUTES).forEach(([key, route]) => {
  router.use(route.path, route.Component);
});

router.start();

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target && target.classList.contains("page--link")) {
    const page = target.getAttribute("page");
    if (page) {
      e.preventDefault();
      router.go(page);
    }
  }
});
