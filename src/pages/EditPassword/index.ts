import Input from '../../components/Input';
import Button from '../../components/Button';
import Router, {Routes} from '../../utils/Router';
import template from './editPassword.hbs';
import styles from './editPassword.module.scss';
import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import getFormData from '../../utils/GetFormData';

export default class EditPasswordPage extends Block {
  init() {
    this.children.oldPasswordInput = new Input({
      label: 'Старый пароль',
      type: 'password',
      name: 'oldPassword',
      placeholder: 'Старый пароль',
    });

    this.children.newPasswordInput = new Input({
      label: 'Новый пароль',
      type: 'password',
      name: 'newPassword',
      placeholder: 'Новый пароль',
    });

    this.children.newPassword2Input = new Input({
      label: 'Повторите новый пароль',
      type: 'password',
      name: '',
      placeholder: 'Повторите новый пароль',
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
      UserController.password(data);
      Router.go(Routes.Settings);
    }
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
