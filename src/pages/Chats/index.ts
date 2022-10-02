import template from './chats.hbs';
import Input from '../../components/Input';
import * as styles from './chats.module.scss';
import Link from '../../components/Link';
import {Routes} from '../../utils/Router';
import ButtonRound from '../../components/ButtonRound';
import ChatsController from '../../controllers/ChatsController';
import {withStore} from '../../utils/Store';
import {Chat} from '../../api/ChatsAPI';
import Block from '../../utils/Block';
import {ChatsList} from "../../components/ChatsList/chatsList";
import {Messenger} from "../../components/Messenger";
import {User} from "../../api/AuthAPI";

interface ChatsPageProps {
  chats: Chat[];
  users: User[];
}

class ChatsPageBase extends Block<ChatsPageProps> {
  // private currentChatId: number | null = null;

  init() {
    //ChatsController.getChats();

    this.children.chatsList = new ChatsList({chats: [], isLoaded: false});

    this.children.messenger = new Messenger({});

    ChatsController.getChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true
      })
    });

    this.children.addChatButton = new ButtonRound({
      label: '\u271a',
      events: {
        click: () => this.onAddChat(),
      },
    });

    this.children.addUserButton = new ButtonRound({
      label: '+',
      events: {
        click: () => this.onAddUser(),
      },
    });

    this.children.deleteUserButton = new ButtonRound({
      label: '-',
      events: {
        click: () => this.onDeleteUser(),
      },
    });

    this.children.messageSendButton = new ButtonRound({
      label: '\u279c',
      events: {
        click: () => {return},
      },
    });

    this.children.messageInput = new Input({
      type: 'text',
      name: 'message',
      placeholder: 'Сообщение',
    });

    this.children.profileLink = new Link({
      label: 'Профиль >',
      to: Routes.Settings,
    });
  }

  onAddChat() {
    const title = prompt('Имя нового чата:');
    if (title) {
      ChatsController.createChat(title);
    }
  }

  onAddUser() {
    const login = prompt('Добавить пользователя с login:');
    if (login) {
      ChatsController.addUserByLogin(login);
    }
  }

  onDeleteUser() {
    const login = prompt('Удалить пользователя с login:');
    if (login) {
        ChatsController.deleteUserByLogin(login);
    }
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withChats = withStore((state) => ({chats: state.chats}));
const withUsers = withStore((state) => ({users: state.users}));

export const ChatsPage = withUsers(withChats(ChatsPageBase));
