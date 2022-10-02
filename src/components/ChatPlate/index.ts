import Block from '../../utils/Block';
import template from './chatPlate.hbs';
import * as styles from './chatPlate.module.scss';
import ButtonRound from "../ButtonRound";
import {Chat} from "../../api/ChatsAPI";
import {withStore} from "../../utils/Store";

interface ChatPlateProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: Chat | undefined;
  onDelete: (e: Event) => void;
  events: {
    click: (e: Event) => void;
  };
}

class ChatPlateBase extends Block<ChatPlateProps> {
  constructor(props: ChatPlateProps) {
    super(props);
  }

  init() {
    this.children.deleteButton = new ButtonRound({
      label: '\u2716',
      id: this.props.id,
      events: {
        click: this.props.onDelete,
      },
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
      styles,
    });
  }
}
export const withSelectedChat = withStore((state) => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}));

export const ChatPlate = withSelectedChat(ChatPlateBase);
