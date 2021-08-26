import { catchPost } from '../firebase/firebaseStore.js';
import { components } from '../view/allTemplate.js';
import { navigator } from '../view/home.js';

export const changeView = (route) => {
  const viewRoot = document.querySelector('#root');
  viewRoot.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/LogIn': viewRoot.appendChild(components.LogIn());
      break;
    case '#/Register': viewRoot.appendChild(components.Register());
      break;
    case '#/Home':
      viewRoot.appendChild(navigator());
      viewRoot.appendChild(components.Home());
      break;
    case '#/Profile':
      viewRoot.appendChild(navigator());
      viewRoot.appendChild(components.Profile());
      catchPost();
      break;
    default: viewRoot.appendChild(components.Error404());
  }
  return viewRoot;
};
