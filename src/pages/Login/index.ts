import template from './login.hbs';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Link from '../../components/Link';
import {Routes} from '../../utils/Router';
import AuthController from '../../controllers/AuthController';
import {SigninData} from '../../api/AuthAPI';
import Block from '../../utils/Block';
import getFormData from '../../utils/GetFormData';
import styles from './login.module.scss';

export default class LoginPage extends Block {
  init() {
    this.children.loginInput = new Input({
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
    });

    this.children.passwordInput = new Input({
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
    });

    this.children.button = new Button({
      label: 'Авторизоваться',
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: 'Нет аккаунта?',
      to: Routes.Signup,
    });
  }

  onSubmit() {
    const data = getFormData(this.children);
    if (data) {
      AuthController.signin(data as SigninData);
    }
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
