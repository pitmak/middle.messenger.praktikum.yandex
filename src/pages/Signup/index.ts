import template from './signup.hbs';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AuthController from '../../controllers/AuthController';
import {SignupData} from '../../api/AuthAPI';
import Link from '../../components/Link';
import {Routes} from '../../utils/Router';
import Block from '../../utils/Block';
import getFormData from '../../utils/GetFormData';

export default class SignupPage extends Block {
  init() {
    this.children.emailInput = new Input({
      type: 'email',
      name: 'email',
      placeholder: 'Почта',
    });

    this.children.loginInput = new Input({
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
    });

    this.children.firstNameInput = new Input({
      type: 'text',
      name: 'first_name',
      placeholder: 'Имя',
    });

    this.children.secondNameInput = new Input({
      type: 'text',
      name: 'second_name',
      placeholder: 'Фамилия',
    });

    this.children.phoneInput = new Input({
      type: 'text',
      name: 'phone',
      placeholder: 'Телефон',
    });

    this.children.passwordInput = new Input({
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
    });

    this.children.password2Input = new Input({
      type: 'password',
      name: '',
      placeholder: 'Пароль (еще раз)',
    });

    this.children.button = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: 'Войти',
      to: Routes.Index,
    });
  }

  onSubmit() {
    const data = getFormData(this.children);
    if (data) {
      AuthController.signup(data as SignupData);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
