import { logInWithGoogleClick } from '../lib/index.js';

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
      <button type="button" class="btnLogIn">Log In</button>
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

  /* if (firebase.auth().currentUser === null) {
    window.location.hash = '#/LogIn';
    const sesionActivaGoogle = false;
    console.log('sesion activa', sesionActivaGoogle);
  } */
  return sectionLogIn;
};

/* btnLogin.addEventListener('click', (event) => {
  event.preventDefault();
  const LogInEmail = containerAll.querySelector('#emailLogIn').value;
  const LogInPassword = containerAll.querySelector('#passwordLogIn').value;
  const emptyLogIn = containerAll.querySelector('#emptyLogIn');
  const errorLogInEmail = containerAll.querySelector('#errorLogInEmail');
  const errorLogInPassword = containerAll.querySelector('#errorLogInPassword');
  const messages = [];
      if (emailLogin === '' || passwordLogin === '') {
          messages.push('Debe llenar todos los campos');
          errorAllLogin.innerHTML = messages;
          errorEmailLogin.innerHTML = '';
          errorpasswordLogin.innerHTML = '';
  } else {
    loginUser(emailLogin, passwordLogin)
      .then((userCredential) => {
        localStorage.setItem('email', userCredential.user.email);
        localStorage.setItem('uid', userCredential.user.uid);
        window.location.hash = '#/application';
      }).catch((err) => {
        const errorCode = err.code;
        if (errorCode === 'auth/wrong-password') {
          errorpasswordLogin.innerHTML = 'Usuario y/o contraseña incorrecta';
        } else if (errorCode === 'auth/invalid-email') {
          errorEmailLogin.innerHTML = 'Correo electrónico no válido';
        } else if (errorCode === 'auth/user-not-found') {
          errorpasswordLogin.innerHTML = 'Usuario y/o contraseña incorrecta';
        }
      });
    localStorage.setItem('email1', emailLogin);
    errorEmailLogin.innerHTML = '';
    errorpasswordLogin.innerHTML = '';
    errorAllLogin.innerHTML = '';
  }
});
 */
