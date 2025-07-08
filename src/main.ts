import "@/style.scss";
import { ROUTES } from "@/constants";
import Router from "./utils/Router";
import { authAPI } from "@/api/auth";
import appStore from "@/core/appStore";

const router = new Router("#app");

// Регистрируем только нужные роуты
Object.values(ROUTES).forEach((route) => {
  router.use(route.path, route.Component);
});

// Пример проверки авторизации (заглушка)
function isAuthenticated() {
  return Boolean(localStorage.getItem("isAuth"));
}

const originalOnRoute = (router as any)._onRoute.bind(router);
(router as any)._onRoute = function (pathname: string) {
  // Если авторизован и на / или /sign-up — редирект на /messenger
  if (isAuthenticated() && (pathname === "/" || pathname === "/sign-up")) {
    router.go("/messenger");
    return;
  }
  // Если неавторизован и не на / или /sign-up — редирект на / (login)
  if (!isAuthenticated() && pathname !== "/" && pathname !== "/sign-up") {
    router.go(pathname === "/sign-up" ? "/sign-up" : "/");
    return;
  }
  originalOnRoute(pathname);
};

router.start();

console.log(isAuthenticated());

if (isAuthenticated()) {
  authAPI.getUser().then((xhr) => {
    try {
      const user = JSON.parse(xhr.responseText);
      appStore.setState({ user });
    } catch { /* ignore */ }
  });
}

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

window.router = router;

declare global {
  interface Window {
    router?: { go: (path: string) => void };
  }
}
