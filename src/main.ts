import "@/style.scss";
import { ROUTES } from "@/constants";
import Router from "./utils/Router";

const router = new Router("#app");

// Регистрируем только нужные роуты
Object.values(ROUTES).forEach((route) => {
  router.use(route.path, route.Component);
});

// Пример проверки авторизации (заглушка)
function isAuthenticated() {
  // Здесь должна быть реальная проверка (например, по токену)
  return Boolean(localStorage.getItem("isAuth"));
}

const originalOnRoute = (router as any)._onRoute.bind(router);
(router as any)._onRoute = function (pathname: string) {
  // Если неавторизован и не на / или /sign-up — редирект на / (login)
  if (!isAuthenticated() && pathname !== "/" && pathname !== "/sign-up") {
    router.go("/");
    return;
  }
  originalOnRoute(pathname);
};

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

// Пример переходов назад/вперёд через интерфейс
window.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "ArrowLeft") router.back();
  if (e.altKey && e.key === "ArrowRight") router.forward();
});
