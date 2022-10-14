import Input from '../../components/Input';
import Button from '../../components/Button';
import template from './editData.hbs';
import styles from './editData.module.scss';
import UserController from '../../controllers/UserController';
import AuthController from '../../controllers/AuthController';
import Router, {Routes} from '../../utils/Router';
import {User} from '../../api/AuthAPI';
import Block from '../../utils/Block';
import getFormData from '../../utils/GetFormData';
import {isEqual} from '../../utils/Helpers';
import {withUser} from "../../hocs/withUser";

class EditDataPageBase extends Block<User> {
  init() {
    AuthController.fetchUser();

    this.children.emailInput = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      placeholder: 'Почта',
    });

    this.children.loginInput = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
    });

    this.children.firstNameInput = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      placeholder: 'Имя',
    });

    this.children.secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      placeholder: 'Фамилия',
    });

    this.children.displayNameInput = new Input({
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      placeholder: 'Имя в чате',
    });

    this.children.phoneInput = new Input({
      label: 'Телефон',
      type: 'text',
      name: 'phone',
      placeholder: 'Телефон',
    });

    this.children.saveButton = new Button({
      label: 'Сохранить',
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.backButton = new Button({
      label: 'Назад',
      events: {
        click: () => Router.go(Routes.Settings),
      },
    });
  }

  onSubmit() {
    const data = getFormData(this.children);
    if (data) {
      UserController.update(data);
      Router.go(Routes.Settings);
    }
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }

  protected componentDidUpdate(oldProps: User, newProps: User): boolean {
    isEqual(oldProps, newProps); // !!!
    Object.values(this.children)
      .filter((child) => (child instanceof Input) && (child.getName() !== ''))
      .forEach((child) => (child as Input).setProps({value: newProps[(child as Input).getName()]}));

    return false;
  }
}

export const EditDataPage = withUser(EditDataPageBase);
