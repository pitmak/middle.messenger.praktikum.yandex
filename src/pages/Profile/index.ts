import template from './profile.hbs';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FormPage from '../../components/Form';
import img from '../../img/noavatar.png';
import * as styles from './profile.module.scss';

interface ProfilePageProps {
  title: string;
}

export default class ProfilePage extends FormPage<ProfilePageProps> {
  init() {
    this.children.button = new Button({
      label: 'Сохранить',
      events: {
        click: this.onSubmit.bind(this),
      },
    });

    this.children.emailInput = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      placeholder: 'pochta@yandex.ru',
    });

    this.children.loginInput = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      placeholder: 'ivanovivan',
    });

    this.children.firstNameInput = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      placeholder: 'Иван',
    });

    this.children.secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      placeholder: 'Иванов',
    });

    this.children.displayNameInput = new Input({
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      placeholder: 'Иван',
    });

    this.children.phoneInput = new Input({
      label: 'Телефон',
      type: 'text',
      name: 'phone',
      placeholder: '+7 (909) 967 30 30',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles, img });
  }
}
