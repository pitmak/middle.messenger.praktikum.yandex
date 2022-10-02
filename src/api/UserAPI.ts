import BaseAPI from './BaseAPI';
import {User} from "./AuthAPI";

export interface ChangeUserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

// export interface GetUserData {
//   id: number;
//   first_name: string;
//   second_name: string;
//   display_name: string;
//   login: string;
//   email: string;
//   phone: string;
//   avatar: string;
// }

export interface PasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  update(data: ChangeUserData): Promise<User> {
    return this.http.put('/profile', data);
  }

  password(data: PasswordRequest) {
    return this.http.put('/password', data);
  }

  avatar(data: FormData): Promise<User> {
    return this.http.put('/profile/avatar', data);
  }

  search(login: string): Promise<User[]> {
    return this.http.post('/search', {login});
  }
}

export default new UserAPI();
