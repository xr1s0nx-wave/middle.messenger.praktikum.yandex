import "@/style.scss";
import { ROUTES } from "@/constants";
import Router from "./utils/Router";
import { authAPI } from "@/api/auth";
import appStore from "@/core/appStore";
import type Block from "@/core/Block";

const router = new Router("#app");

type RouteComponent = typeof Block;

type RouterWithOnRoute = Router & {
  _onRoute: (pathname: string) => void;
};

// Регистрируем только нужные роуты
Object.values(ROUTES).forEach((route) => {
  router.use(route.path, route.Component as RouteComponent);
});

// Пример проверки авторизации (заглушка)
function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("isAuth"));
}

const routerWithOnRoute = router as RouterWithOnRoute;
const originalOnRoute = routerWithOnRoute._onRoute.bind(router);
routerWithOnRoute._onRoute = function (pathname: string): void {
  // Если это страница 404 или not-found — показываем всегда
  if (pathname === "/not-found" || pathname === "/404") {
    originalOnRoute(pathname);
    return;
  }
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
window.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.altKey && e.key === "ArrowLeft") router.back();
  if (e.altKey && e.key === "ArrowRight") router.forward();
});

window.router = router;

declare global {
  interface Window {
    router?: Router;
  }
}
