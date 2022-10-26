import Block from '../../utils/Block';
import template from './error.hbs';
import styles from './error.module.scss';

export default class ErrorPage extends Block {
  render() {
    return this.compile(template, {...this.props, styles});
  }
}
