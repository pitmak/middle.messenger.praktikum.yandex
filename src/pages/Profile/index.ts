import template from './profile.hbs';
import Button from '../../components/Button';
import img from '../../img/noavatar.png';
import * as styles from './profile.module.scss';
import AuthController from '../../controllers/AuthController';
import {withStore} from '../../utils/Store';
import UserController from "../../controllers/UserController";
import Link from '../../components/Link';
import Router, {Routes} from '../../utils/Router';
import Block from '../../utils/Block';
import {User} from '../../api/AuthAPI';
import Avatar from '../../components/Avatar/avatar';
import {isEqual} from '../../utils/Helpers';

class ProfilePageBase extends Block<User> {
  init() {
    AuthController.fetchUser();

    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      events: {
        click: () => this.onAvatarChange(),
      },
    });

    this.children.editDataLink = new Link({
      label: 'Изменить данные',
      to: Routes.EditData,
    });

    this.children.editPasswordLink = new Link({
      label: 'Изменить пароль',
      to: Routes.EditPassword,
    });

    this.children.logoutButton = new Button({
      label: 'Выйти',
      events: {
        click: () => AuthController.logout(),
      },
    });

    this.children.backButton = new Button({
      label: 'Назад',
      events: {
        click: () => Router.go(Routes.Messenger),
      },
    });
  }

  onAvatarChange() {
    const formData = new FormData();

    const avatar = document.createElement('input');
    avatar.type = 'file';
    avatar.accept = 'image/*';

    avatar.onchange = (e) => {
      formData.append('avatar', (e.target as HTMLInputElement).files![0]);
      UserController.avatar(formData);
    }

    avatar.click();
  }

  protected componentDidUpdate(oldProps: User, newProps: User): boolean {
    isEqual(oldProps, newProps); // !!!

    (this.children.avatar as Avatar).setProps({avatar: this.props.avatar});

    return true;
  }

  render() {
    return this.compile(template, {...this.props, styles, img});
  }
}

const withUser = withStore((state) => ({...state.user}));

export const ProfilePage = withUser(ProfilePageBase);
