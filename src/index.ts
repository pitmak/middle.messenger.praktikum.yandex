import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import {ProfilePage} from './pages/Profile';
import {ChatsPage} from './pages/Chats';
import Router, {Routes} from './utils/Router';
import AuthController from './controllers/AuthController';
import store from './utils/Store';
import {EditDataPage} from './pages/EditData';
import EditPasswordPage from './pages/EditPassword';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    await AuthController.fetchUser();
    store.set('userIsSignedIn', true);
  } catch (e) {
    store.set('userIsSignedIn', false);
  }

  // Страница, на которую по умолчанию попадает авторизаванный пользователь, регистрируется первой.
  // Неавторизованный пользователь при попытке открыть страницу, для которой требуется авторизация,
  // будет редиректиться на роут '/'
  Router
    .use(Routes.Messenger, ChatsPage, true)
    .use(Routes.Index, LoginPage, false)
    .use(Routes.Signup, SignupPage, false)
    .use(Routes.Settings, ProfilePage, true)
    .use(Routes.EditData, EditDataPage, true)
    .use(Routes.EditPassword, EditPasswordPage, true)
    .onError(ErrorPage)
    .setAuthorizationChecker(() => store.getState().userIsSignedIn ?? false)
    .start();
});
