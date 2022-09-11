import Block from '../../utils/Block';
import template from './input.hbs';
import validateValueByName from '../../utils/Validate';
import * as styles from './input.module.scss';

interface InputProps {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  events?: {
    blur?: () => void;
  };
}

export default class Input extends Block<InputProps> {
  init() {
    this.setProps({
      events: {
        blur: this.validateOnBlur.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

  public isValid(): boolean {
    const inputName = this.getName();
    return inputName !== '' ? validateValueByName(this.getValue(), inputName) : true;
  }

  public getName(): string {
    return this.props.name!;
  }

  public getValue(): string {
    return (this.getContent() as HTMLInputElement).value;
  }

  private validateOnBlur(): void {
    this.isValid();
  }
}
