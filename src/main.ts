import Handlebars from "handlebars";
import * as Components from "@/components";
import "@/style.scss";
import { ROUTES } from "@/constants";
import { addEvents } from "./utils";

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

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

function navigate(page: string, pageContext?: any) {
  const [source, context] = ROUTES[page].Component;
  document.title = `Messanger | ${ROUTES[page].pageTitle}`;
  const container = document.getElementById("app");
  if (!container) {
    throw new Error("App container not found");
  }

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(pageContext || context);

  addLinkEventLIstener();
  addEvents(navigate);
}

document.addEventListener("DOMContentLoaded", () => {
  navigate("navigation");
});
