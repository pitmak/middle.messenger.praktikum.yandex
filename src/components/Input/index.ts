import Block from '../../utils/Block';
import template from './input.hbs';
import validateValueByName from '../../utils/Validate';
import styles from './input.module.scss';

interface InputProps {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
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
    return this.compile(template, {...this.props, styles});
  }

  public isValid(): boolean {
    const inputName = this.getName();
    return inputName !== '' ? validateValueByName(this.getValue(), inputName) : true;
  }

  public getName(): string {
    return (this.getContent() as HTMLInputElement).name;
  }

  public getValue(): string {
    return (this.getContent() as HTMLInputElement).value;
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  private validateOnBlur(): void {
    if (!this.isValid()) {
      (this.getContent() as HTMLInputElement).classList.add(styles['inputinvalid']);
    } else {
      (this.getContent() as HTMLInputElement).classList.remove(styles['inputinvalid']);
    }
  }
}
