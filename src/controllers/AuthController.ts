import API, {AuthAPI, SigninData, SignupData} from '../api/AuthAPI';
import store from '../utils/Store';
import router, {Routes} from '../utils/Router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      store.set('userIsSignedIn', true);

      router.go(Routes.Messenger);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      store.set('userIsSignedIn', true);

      router.go(Routes.Messenger);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.setUser(user);
  }

  async logout() {
    try {
      await this.api.logout();

      store.set('userIsSignedIn', false);

      router.go(Routes.Index);
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new AuthController();
