// eslint-disable-next-line import/named
import { logInWithGoogleClick } from '../lib/index.js';
import { logInWithEmail } from '../firebase/firebaseAuth.js';

export const logInTemplate = () => {
  const sectionLogIn = document.createElement('section');
  sectionLogIn.classList.add('iOne');
  const templateLogIn = `
  <div class="divLoginForm positionLogin">
    <div class="divCabecera">
      <img src="./img/logoTuristik.png" class="imgLogo" alt="logoTuristik">
      <h2>Bienvenidas</h2>
    </div>
    <form id="logInForm">
      <input id="emailLogIn" type="email" placeholder="Enter Email" class="inputForm1" required>
      <span id="errorLogInEmail" class="errorLogin"></span><br>
      <input id="passwordLogIn" type="password" placeholder="Enter Password" class="inputForm1" required>
      <span id="errorLogInPassword" class="errorLogin"></span><br>
      <span id="emptyLogIn" class="errorLogin"></span><br>
      <a href="" class="linkResetP">¿Olvidaste tu contraseña?</a>
      <button type="button" id="btnLogIn" class="btnLogIn">Log In</button>
      <span id="messageSendEmail" class=""></span><br>
      <div class="errorConten">
        <span id="errorLogInGeneral" class="errorLogin"></span>
      </div>
    </form>
    <span class="link">New here? <a id="linkRegister" href="#/Register">Register</a></span>
    <div class="divIconG">
      <button id = 'btnGoogle'>
        <img src="./img/icons8-logo-de-google.svg" alt="iGoogle" class="iGoogle">
      </button>
    </div>
  </div>
  `;
  sectionLogIn.innerHTML = templateLogIn;
  const btnLogIn = sectionLogIn.querySelector('.btnLogIn');
  const errorLogInEmail = sectionLogIn.querySelector('#errorLogInEmail');
  const errorLogInPassword = sectionLogIn.querySelector('#errorLogInPassword');
  const errorLogInGeneral = sectionLogIn.querySelector('#errorLogInGeneral');
  let message = [];

  // LogIn con Correo y Contraseña
  btnLogIn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailLogIn = sectionLogIn.querySelector('#emailLogIn').value;
    const passwordLogIn = sectionLogIn.querySelector('#passwordLogIn').value;
    message = [];
    if (emailLogIn === '' || passwordLogIn === '') {
      message.push('Debe llenar todos los campos');
      errorLogInGeneral.innerHTML = message;
      errorLogInEmail.innerHTML = '';
      errorLogInPassword.innerHTML = '';
    } else {
      logInWithEmail(emailLogIn, passwordLogIn)
        .then((userCredential) => {
          if (userCredential.user.displayName === null) {
            localStorage.getItem('userName');
          } else {
            localStorage.setItem('userName', userCredential.user.displayName);
          }
          localStorage.setItem('userEmail', userCredential.user.email);
          localStorage.setItem('userPhoto', userCredential.user.photoURL);
          localStorage.setItem('userId', userCredential.user.uid);
          window.location.hash = '#/Home';
        })
        .catch((err) => {
          const errorCode = err.code;
          if (errorCode === 'auth/wrong-password') {
            errorLogInPassword.innerHTML = 'Usuario y/o contraseña incorrecta';
          } else if (errorCode === 'auth/invalid-email') {
            errorLogInEmail.innerHTML = 'Correo electrónico no válido';
          } else if (errorCode === 'auth/user-not-found') {
            errorLogInPassword.innerHTML = 'Usuario y/o contraseña incorrecta';
          }
        });
      localStorage.setItem('email', emailLogIn);
      errorLogInEmail.innerHTML = '';
      errorLogInPassword.innerHTML = '';
      errorLogInGeneral.innerHTML = '';
    }
  });

  // Inicia sesion con cuenta Google
  const btnGoogle = sectionLogIn.querySelector('#btnGoogle');
  btnGoogle.addEventListener('click', (logInWithGoogleClick));

  // Vista de login a register
  const btnRegister = sectionLogIn.querySelector('#linkRegister');
  btnRegister.addEventListener('click', () => {
    window.location.hash = '#/Register';
  });

  return sectionLogIn;

  /* const loginUser = (email, password) => {
    firebase
    .auth()
    .sigInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log('error', error);
    });
  };
  */
};

/* if (firebase.auth().currentUser === null) {
  window.location.hash = '#/LogIn';
  const sesionActivaGoogle = false;
  console.log('sesion activa', sesionActivaGoogle);
} */
