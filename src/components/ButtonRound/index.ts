import Block from '../../utils/Block';
import template from './buttonRound.hbs';
import styles from './buttonRound.module.scss';

interface ButtonRoundProps {
  id?: number;
  label: string;
  events?: {
    click: (e: Event) => void;
  };
}

export default class ButtonRound extends Block<ButtonRoundProps> {
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
