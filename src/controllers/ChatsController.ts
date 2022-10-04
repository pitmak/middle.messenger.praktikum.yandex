import API, {ChatsAPI} from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';
import UserController from './UserController';

export class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async createChat(title: string) {
    try {
      await this.api.createChat(title);

      await this.getChats();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async getChats() {
    try {
      const chats = await this.api.getChats();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id) ?? '';

        await MessagesController.connect(chat.id, token);
      });

      store.set('chats', chats);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async deleteChat(chatId: number) {
    try {
      await this.api.deleteChat(chatId);

      await this.getChats();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async addUser(userId: number, chatId: number) {
    try {
      await this.api.addUser([userId], chatId);

      await this.getUsers(chatId);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async addUserByLogin(login: string) {
    try {
      const currentChat = store.getState().selectedChat;
      if (currentChat) {
        const userId = await UserController.getIdByLogin(login);
        if (userId) {
          await this.addUser(userId, currentChat);
        }
      }
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async deleteUser(userId: number, chatId: number) {
    try {
      await this.api.deleteUser([userId], chatId);

      await this.getUsers(chatId);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async deleteUserByLogin(login: string) {
    try {
      const currentChat = store.getState().selectedChat;
      if (currentChat) {
        const userId = await UserController.getIdByLogin(login);
        if (userId) {
          await this.deleteUser(userId, currentChat);
        }
      }
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async getUsers(chatId: number) {
    try {
      const users = await this.api.getUsers(chatId);

      store.set('users', users);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  getToken(chatId: number) {
    try {
      return this.api.getToken(chatId);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  selectChat(chatId: number) {
    store.set('selectedChat', chatId);
    this.getUsers(chatId);
  }
}

export default new ChatsController();
