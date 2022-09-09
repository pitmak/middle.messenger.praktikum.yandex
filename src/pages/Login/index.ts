import template from './login.hbs';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FormPage from '../../components/Form';

interface LoginPageProps {
  title: string;
}

export default class LoginPage extends FormPage<LoginPageProps> {
  init() {
    this.children.button = new Button({
      label: 'Авторизоваться',
      events: {
        click: this.onSubmit.bind(this),
      },
    });

    this.children.loginInput = new Input({
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
    });

    this.children.passwordInput = new Input({
      type: 'text',
      name: 'password',
      placeholder: 'Пароль',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
