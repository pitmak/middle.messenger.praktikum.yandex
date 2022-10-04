import Block from "../../utils/Block";
import template from "./usersList.hbs";
import * as styles from "./usersList.module.scss";
import {withStore} from "../../utils/Store";
import {User} from "../../api/AuthAPI";
import ButtonRound from "../ButtonRound";
import ChatsController from "../../controllers/ChatsController";

interface UsersListProps {
  users: User[];
}

class UsersListBase extends Block<UsersListProps> {

  protected init() {
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

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, styles});
  }
}

const withUsers = withStore((state) => ({users: state.users}));

export const UsersList = withUsers(UsersListBase);
