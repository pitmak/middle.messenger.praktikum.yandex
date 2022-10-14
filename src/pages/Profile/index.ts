import template from './profile.hbs';
import Button from '../../components/Button';
import styles from './profile.module.scss';
import AuthController from '../../controllers/AuthController';
import UserController from "../../controllers/UserController";
import Link from '../../components/Link';
import Router, {Routes} from '../../utils/Router';
import Block from '../../utils/Block';
import {User} from '../../api/AuthAPI';
import Index from '../../components/Avatar';
import {isEqual} from '../../utils/Helpers';
import {withUser} from '../../hocs/withUser';

class ProfilePageBase extends Block<User> {
  init() {
    AuthController.fetchUser();

    this.children.avatarElem = new Index({
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
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        formData.append('avatar', files[0]);
        UserController.avatar(formData);
      }
    }

    avatar.click();
  }

  protected componentDidUpdate(oldProps: User, newProps: User): boolean {
    isEqual(oldProps, newProps); // !!!

    (this.children.avatarElem as Index).setProps({avatar: this.props.avatar});

    return true;
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

export const ProfilePage = withUser(ProfilePageBase);
