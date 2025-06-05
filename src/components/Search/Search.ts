import Block from "@/core/Block.ts";
import template from "./Search.hbs?raw";
type SearchProps = {
  value?: string;
  events?: Record<string, (e: Event) => void>;
};
const Search = class extends Block {
  constructor(props: SearchProps = {}) {
    super("div", { ...props, className: "search" });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
};
export default Search;
