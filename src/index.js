import {sum} from './modules/sum';

const root = document.querySelector('#root');
root.textContent = sum(116, -1).toString();
