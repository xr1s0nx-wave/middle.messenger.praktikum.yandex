import "@/style.scss";
import { ROUTES } from "@/constants";
const addLinkEventLIstener = () => {
  document.querySelectorAll(".page--link").forEach((link) => {
    link.addEventListener("click", (e: any) => {
      const page = e.currentTarget?.getAttribute("page");
      if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
  });
};
function navigate(page: string) {
  const currentPage = ROUTES[page].Component.getElement();
  document.title = `Messanger | ${ROUTES[page].pageTitle}`;
  const container = document.getElementById("app");
  if (!container) {
    throw new Error("App container not found");
  }
  container.innerHTML = "";
  if (currentPage) {
    container.appendChild(currentPage);
  }
  addLinkEventLIstener();
}
document.addEventListener("DOMContentLoaded", () => {
  navigate("navigation");
});
