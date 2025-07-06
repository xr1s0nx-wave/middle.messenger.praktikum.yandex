type RouteProps = {
  rootQuery: string;
};

class Route {
  private _pathname: string;
  private _blockClass: any;
  private _block: any;
  private _props: RouteProps;

  constructor(pathname: string, view: any, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block && this._block.getContent()) {
      this._block.getContent().remove();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }
    const root = document.querySelector(this._props.rootQuery);
    if (root && this._block.getContent()) {
      root.innerHTML = '';
      root.appendChild(this._block.getContent());
    }
  }
}

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      // Редирект на 404
      const notFoundRoute = this.getRoute("/not-found");
      if (notFoundRoute) {
        this.history.replaceState({}, '', '/not-found');
        if (this._currentRoute) {
          this._currentRoute.leave();
        }
        this._currentRoute = notFoundRoute;
        notFoundRoute.render();
      }
      return;
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default Router;