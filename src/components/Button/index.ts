import Block from '../../utils/Block';
import template from './button.hbs';
import * as styles from './button.module.scss';

interface ButtonProps {
  label: string;
  events: {
    click: () => void;
  };
}

export default class Button extends Block<ButtonProps> {
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
