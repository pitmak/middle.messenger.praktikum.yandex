import API, {ChangeUserData, PasswordRequest, UserAPI} from '../api/UserAPI';
import store from '../utils/Store';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async update(data: ChangeUserData) {
    try {
      const user = await this.api.update(data);

      store.setUser(user);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async password(data: PasswordRequest) {
    try {
      await this.api.password(data);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async avatar(data: FormData) {
    try {
      const user = await this.api.avatar(data);

      store.setUser(user);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async getIdByLogin(login: string) {
    try {
      const users = await this.api.search(login);

      const user = users.find((u) => u.login === login)

      if (!user) {
        return null;
      }

      return user.id;
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new UserController();
