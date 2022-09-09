import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';
import Block from './utils/Block';
import SigninPage from './pages/Signin';
import ProfilePage from './pages/Profile';
import ChatsPage from './pages/Chats';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')!;
  const menu = document.querySelector('#menu');

  const pages: Record<string, Block> = {
    chats: new ChatsPage({
      title: 'Chats',
    }),

    error404: new ErrorPage({
      errorCode: '404',
      errorText: 'Не туда попали',
      linkText: 'Назад к чатам',
    }),

    error500: new ErrorPage({
      errorCode: '500',
      errorText: 'Мы уже фиксим',
      linkText: 'Назад к чатам',
    }),

    login: new LoginPage({
      title: 'Вход',
    }),

    signin: new SigninPage({
      title: 'Регистрация',
    }),

    profile: new ProfilePage({
      title: 'Профиль',
    }),
  };

  menu!.addEventListener('click', (event) => {
    const name = (event.target as HTMLElement).id;
    root.innerHTML = '';
    root.append(pages[name].getContent()!);
    pages[name].dispatchComponentDidMount();
  });
});
