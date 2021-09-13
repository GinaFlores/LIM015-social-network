/* eslint-disable no-unused-vars */
import { logInWithGoogle, logOut /* registerWithEmail */ } from '../firebase/firebaseAuth.js';

// inicio de sesion con google
export const logInWithGoogleClick = () => {
  const messageError = document.querySelector('#error-logueo');
  logInWithGoogle()
    .then(() => {
      const user = firebase.auth().currentUser;
      if (user != null) {
        window.location.hash = '#/Home';
        messageError.innerHTML = '';
      }
    })
    .catch((error) => {
      // Manejar errores aquí.
      const errorCode = error.code;
      const errorMessage = error.message;
      // El correo electrónico de la cuenta del usuario utilizada.
      const email = error.email;
    });
};

export const observadorWatcher = () => {
  firebase.auth().onAuthStateChanged((user) => {
    let photo;
    let name;
    if (user !== null) {
      name = user.displayName;
      photo = user.photoURL;
    } else {
      window.location.hash = '#/LogIn';
    }
  });
};

// cerrar sesion
export const logOutClick = () => {
  logOut()
    .then(() => {
      localStorage.clear();
      window.location.hash = '#/LogIn';
    })
    .catch((err) => {
    });
};
