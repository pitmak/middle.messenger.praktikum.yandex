import template from './signin.hbs';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FormPage from '../../components/Form';

interface SigninPageProps {
  title: string;
}

export default class SigninPage extends FormPage<SigninPageProps> {
  init() {
    this.children.button = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: this.onSubmit.bind(this),
      },
    });

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
  }

  render() {
    return this.compile(template, this.props);
  }
}
