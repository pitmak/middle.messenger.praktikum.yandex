import template from './chats.hbs';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FormPage from '../../components/Form';
import * as styles from './chats.module.scss';

interface ChatsPageProps {
  title: string;
}

export default class ChatsPage extends FormPage<ChatsPageProps> {
  init() {
    this.children.button = new Button({
      label: '>>>',
      events: {
        click: this.onSubmit.bind(this),
      },
    });

    this.children.messageInput = new Input({
      type: 'text',
      name: 'message',
      placeholder: 'Сообщение',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
