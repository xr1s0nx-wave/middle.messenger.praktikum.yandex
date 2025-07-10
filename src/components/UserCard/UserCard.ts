import Block from "@/core/Block.ts";
import template from "./UserCard.hbs?raw";
import withStore from "@/core/withStore";
import appStore from "@/core/appStore";
import { BASE_URL } from "@/constants/api";

type UserCardProps = {
  login?: string;
  avatarUrl?: string;
};

const mapStateToProps = (state: { user: { id: number; login: string; avatar?: string } | null }) => ({
  login: state.user?.login || "",
  avatarUrl: state.user?.avatar
    ? `${BASE_URL}/api/v2/resources${state.user.avatar}?v=${Date.now()}`
    : "/vite.svg",
});

class UserCard extends Block {
  constructor(tagName?: string, props: UserCardProps = {}) {
    super(tagName || "div", { ...props, className: "usercard" });
  }
  render(): DocumentFragment {
    return this.compile(template, this._meta.props);
  }
}

export default withStore(UserCard, appStore, mapStateToProps);
