import {set} from './Helpers';
import EventBus from './EventBus';
import Block from './Block';
import {User} from '../api/AuthAPI';
import {Chat} from '../api/ChatsAPI';
import img from '../img/noavatar.png';
import {Message} from "../controllers/MessagesController";

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  userIsSignedIn?: boolean;
  user?: User;
  chats?: Chat[];
  messages?: Record<number, Message[]>;
  selectedChat?: number;
  users?: User[];
}

export class Store extends EventBus {
  private state: State = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public setUser(data: User) {
    if (!data.avatar) {
      data.avatar = img;
    } else {
      data.avatar = `https://ya-praktikum.tech/api/v2/resources${data.avatar}`;
    }
    this.set('user', data);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore<SP extends Record<string, any>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P extends Record<string, any>>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: P) {
        let previousState = mapStateToProps(store.getState());

        super({...props, ...previousState});

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          // if (isEqual(previousState, stateProps)) {
          //   return;
          // }

          previousState = stateProps;

          this.setProps({...stateProps as Partial<SP & P>});
        });
      }
    }
  }
}

export default store;
