import Block from '../../utils/Block';
import template from './error.hbs';
import * as styles from './error.module.scss';

interface ErrorPageProps {
  errorCode: string;
  errorText: string;
  linkText: string;
}

export default class ErrorPage extends Block<ErrorPageProps> {
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
