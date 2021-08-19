/* eslint-disable no-unused-vars */
import { logInWithGoogle, logout /* registerWithEmail */ } from '../firebase/firebaseAuth.js';

// inicio de sesion con google
export const logInWithGoogleClick = () => {
  const messageError = document.querySelector('#error-logueo');
  logInWithGoogle()
    .then(() => {
      const user = firebase.auth().currentUser;
      console.log(user);
      console.log('logueado con google');
      window.location.hash = '#/Home';
      messageError.innerHTML = '';
    })
    .catch((error) => {
      // Manejar errores aquí.
      console.log('error');
      const errorCode = error.code;
      const errorMessage = error.message;
      // El correo electrónico de la cuenta del usuario utilizada.
      const email = error.email;
    });
};

// cerrar sesion
export const logoutClick = () => {
  logout()
    .then(() => {
      console.log('sesion cerrada');
      window.location.hash = '#/LogIn';
    })
    .catch((err) => {
      console.log('Error logout', err);
    });
};
