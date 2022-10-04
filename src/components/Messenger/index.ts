import MessagesController, {Message as MessageInfo} from '../../controllers/MessagesController';
import Block from '../../utils/Block';
import Input from '../Input';
import ButtonRound from '../ButtonRound';
import {isEqual} from '../../utils/Helpers';
import {Message} from '../Message';
import * as styles from './messenger.module.scss';
import template from './messenger.hbs';
import {withStore} from '../../utils/Store';

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }

  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.input = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message'
    });

    this.children.button = new ButtonRound({
      label: '\u279c',
      events: {
        click: () => {
          const input = this.children.input as Input;

          const message = input.getValue();

          input.setValue('');

          if (message !== '' && this.props.selectedChat) {
            MessagesController.sendMessage(this.props.selectedChat, message);
          }
        }
      }
    });
  }

  protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map(data => {
      return new Message({...data, isMine: props.userId === data.user_id });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withSelectedChatMessages = withStore(state => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user?.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user?.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
