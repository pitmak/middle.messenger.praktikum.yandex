import {withStore} from '../utils/Store';

export const withUser = withStore((state) => ({...state.user}));
