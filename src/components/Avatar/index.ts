import Block from '../../utils/Block';
import template from './avatar.hbs';
import styles from './avatar.module.scss';

interface AvatarProps {
  avatar: string;
  events: {
    click: () => void;
  };
}

export default class Index extends Block<AvatarProps> {
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
