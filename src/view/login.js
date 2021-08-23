import { logInWithGoogleClick, observadorWatcher } from '../lib/index.js';

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
      <span id="errorLogInEmail" class="error"></span><br>
      <input id="passwordLogIn" type="password" placeholder="Enter Password" class="inputForm1" required>
      <span id="errorLogInPassword" class="error"></span><br>
      <span id="emptyLogIn" class="error"></span>
      <a href="" class="linkResetP">¿Olvidaste tu contraseña?</a>
      <button type="button" id="btnLogIn" class="btnLogIn">Log In</button>
      <span id="messageSendEmail" class=""></span><br>
    </form>
    <span class="link">New here? <a id="linkRegister" href="#/Register">Register</a></span>
    <div class="divIconG">
      <button id = 'btnGoogle'>
        <img src="./img/icons8-logo-de-google.svg" alt="iGoogle" class="iGoogle">
      </button>
      <div id = 'error-logueo'></div>
    </div>
  </div>
  `;
  sectionLogIn.innerHTML = templateLogIn;

  // Inicia sesion con cuenta Google
  const btnGoogle = sectionLogIn.querySelector('#btnGoogle');
  btnGoogle.addEventListener('click', (logInWithGoogleClick));

  observadorWatcher();
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
