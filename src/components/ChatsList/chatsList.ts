import Block from '../../utils/Block';
import {Chat} from '../../api/ChatsAPI';
import template from './chatsList.hbs';
import * as styles from './chatsList.module.scss';
import {ChatPlate} from '../ChatPlate';
import ChatsController from '../../controllers/ChatsController';
import {withStore} from '../../utils/Store';
import {isEqual} from '../../utils/Helpers';


interface ChatsListProps {
  chats: Chat[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {

  // protected init() {
  //   this.children.chats = this.createChats(this.props);
  // }

  protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map(data => {
      return new ChatPlate({
        ...data,
        selectedChat: undefined,
        onDelete: this.onDeleteChat,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          }
        }
      });
    });
  }

  onDeleteChat(event: Event) {
    ChatsController.deleteChat(Number((event.target as HTMLElement).dataset.id));
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, styles});
  }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

export const ChatsList = withChats(ChatsListBase);
