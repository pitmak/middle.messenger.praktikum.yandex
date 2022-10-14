import Block from './Block';

export enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
  EditData = '/edit-data',
  EditPassword = '/edit-password',
}

export interface BlockConstructable<P extends Record<string, any> = any> {
  new(props: P): Block<P>;
}

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block?.getContent() ?? '');
  block?.dispatchComponentDidMount();

  return root;
}

class Route {
  private block: Block | null = null;

  constructor(
    public pathname: string,
    private readonly blockClass: BlockConstructable,
    private readonly query: string,
    public readonly needAuthorization: boolean = false) {
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block);
      return;
    }
  }
}

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private errorRoute: Route | null = null;
  private currentRoute: Route | null = null;
  private history = window.history;
  private authorizationChecker: () => boolean = () => true;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: BlockConstructable, needAuthorization: boolean) {
    const route = new Route(pathname, block, this.rootQuery, needAuthorization);
    this.routes.push(route);

    return this;
  }

  public onError(block: typeof Block) {
    this.errorRoute = new Route('', block, this.rootQuery);

    return this;
  }

  public setAuthorizationChecker(checker: () => boolean) {
    this.authorizationChecker = checker;

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      if (!this.errorRoute) {
        return;
      }
      route = this.errorRoute;
    } else if (route.needAuthorization && !this.authorizationChecker()) {
      this.go('/');
      return;
    } else if (!route.needAuthorization && this.authorizationChecker()) {
      this.go(this.routes[0].pathname);
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router('#app');
