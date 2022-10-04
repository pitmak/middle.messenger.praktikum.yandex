import Block from '../../utils/Block';
import {PropsWithRouter, withRouter} from '../../hocs/withRouter';
import template from './link.hbs';
import * as styles from './link.module.scss';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  events?: {
    click: () => void;
  };
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate()
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const Link = withRouter(BaseLink);

export default Link;
