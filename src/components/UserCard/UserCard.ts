import Block from "@/core/Block.ts";
import template from "./UserCard.hbs?raw";
import withStore from "@/core/withStore";
import appStore from "@/core/appStore";

type UserCardProps = {
  login?: string;
  avatarUrl?: string;
};

const mapStateToProps = (state: { user: any }) => ({
  login: state.user?.login || "",
  avatarUrl: state.user?.avatar
    ? `https://ya-praktikum.tech/api/v2/resources${state.user.avatar}?v=${Date.now()}`
    : "/vite.svg",
});

class UserCard extends Block {
  constructor(props: UserCardProps = {}) {
    super("div", { ...props, className: "usercard" });
  }
  render(): DocumentFragment {
    // @ts-ignore
    return (this as any).compile(template, (this as any)._meta.props);
  }
}

export default withStore(UserCard, appStore, mapStateToProps);
