import BaseAPI from './BaseAPI';
import {User} from './AuthAPI';

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  createChat(title: string) {
    return this.http.post('', {title});
  }

  getChats(): Promise<Chat[]> {
    return this.http.get('');
  }

  deleteChat(chatId: number) {
    return this.http.delete('', {chatId});
  }

  addUser(users: number[], chatId: number) {
    return this.http.put('/users', {users, chatId});
  }

  deleteUser(users: number[], chatId: number) {
    return this.http.delete('/users', {users, chatId});
  }

  getUsers(chatId: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${chatId}/users`);
  }

  async getToken(chatId: number): Promise<string> {
    const response = await this.http.post<{token: string}>(`/token/${chatId}`);

    return response.token;
  }
}

export default new ChatsAPI();
