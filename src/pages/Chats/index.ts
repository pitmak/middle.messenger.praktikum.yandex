import template from './chats.hbs';
import * as styles from './chats.module.scss';
import Link from '../../components/Link';
import {Routes} from '../../utils/Router';
import ButtonRound from '../../components/ButtonRound';
import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import {ChatsList} from '../../components/ChatsList/chatsList';
import {Messenger} from '../../components/Messenger';
import {UsersList} from '../../components/UsersList/usersList';

export class ChatsPage extends Block {
  init() {
    this.children.profileLink = new Link({
      label: 'Профиль >',
      to: Routes.Settings,
    });

    this.children.chatsList = new ChatsList({chats: [], isLoaded: false});

    this.children.usersList = new UsersList({users: []});

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
  }

  onAddChat() {
    const title = prompt('Имя нового чата:');
    if (title) {
      ChatsController.createChat(title);
    }
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
