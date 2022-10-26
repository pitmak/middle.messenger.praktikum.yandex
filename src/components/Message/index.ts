import Block from '../../utils/Block';
import template from './message.hbs';
import styles from './message.module.scss';

interface MessageProps {
  content: string;
  isMine: boolean;
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
