import { registerWithEmail, emailVerication } from '../firebase/firebaseAuth.js';

export const registerTemplate = () => {
  const sectionRegister = document.createElement('section');
  sectionRegister.classList.add('iTwo');
  const templateRegister = `
  <div class="divRegisterForm positionRegister">
    <div class="divCabecera">
      <img src="./img/logoTuristik.png" class="imgLogo" alt="LogoTuristik">
    </div>
    <form id="formRegister">
      <!-- USERNAME INPUT -->
      <input type="text" placeholder="Full Name" id="nameRegister" class="inputForm2" required>
      <!-- EMAIL INPUT -->
      <input type="email" placeholder="Email" id="emailRegister" class="inputForm2" required>
      <span id="errorEmail" class="errorMessage"></span>
      <!-- PASSWORD INPUT -->
      <input type="password" placeholder="Password" id="passwordRegister" class="inputForm2" required>
      <span id="errorPassword" class="errorMessage"></span>
      <!-- CONFIRMED PASSWORD INPUT -->
      <input type="password" placeholder="Confirmed Password" id="confirmedPassword" class="inputForm2" required>
      <span id="errorConfirmPassword" class="errorMessage"></span>
      <div class="errorConten">
        <span id="errorGeneral" class="errorMessage"></span>
      </div>
      <button type="submit" class="btnRegister" id="registerButton" >Register</button>
    </form>
    <span class="link">Already a member? <a id="linkLogIn" href="#/LogIn">Log In</a> </span>
  </div>
  `;
  sectionRegister.innerHTML = templateRegister;
  const btnRegister = sectionRegister.querySelector('#registerButton');
  const errorEmail = sectionRegister.querySelector('#errorEmail');
  const errorPassword = sectionRegister.querySelector('#errorPassword');
  const errorConfirmPassword = sectionRegister.querySelector('#errorConfirmPassword');
  const errorGeneral = sectionRegister.querySelector('#errorGeneral');
  let messages = [];

  // Registro de cuenta con correo y contraseña
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const nameUser = sectionRegister.querySelector('#nameRegister').value;
    const emailRegister = sectionRegister.querySelector('#emailRegister').value;
    const passwordRegister = sectionRegister.querySelector('#passwordRegister').value;
    const confirmPassword = sectionRegister.querySelector('#confirmedPassword').value;
    messages = [];
    if (emailRegister === '' || passwordRegister === '' || nameUser === '' || confirmPassword === '') {
      messages.push('Llenar todos los campos');
      errorGeneral.innerHTML = messages;
      errorPassword.innerHTML = '';
      errorConfirmPassword.innerHTML = '';
      errorEmail.innerHTML = '';
    } else if (passwordRegister !== confirmPassword) {
      messages.push('Las contraseñas deben coincidir');
      errorConfirmPassword.innerHTML = messages;
      errorGeneral.innerHTML = '';
      errorPassword.innerHTML = '';
      errorEmail.innerHTML = '';
    } else {
      registerWithEmail(emailRegister, passwordRegister)
        .then(() => {
          emailVerication();
          window.alert('mensaje de verificacion enviado');
          window.location.hash = '#/LogIn';
        }).catch((err) => {
          const errorCode = err.code;
          if (errorCode === 'auth/email-already-in-use') {
            errorEmail.innerHTML = 'El correo electrónico ya está registrado';
          } else if (errorCode === 'auth/invalid-email') {
            errorEmail.innerHTML = 'Correo electrónico no válido';
          } else if (errorCode === 'auth/weak-password') {
            errorPassword.innerHTML = 'La contraseña debe contener mínimo 6 carácteres';
          }
        });
      errorGeneral.innerHTML = '';
      errorPassword.innerHTML = '';
      errorEmail.innerHTML = '';
      errorConfirmPassword.innerHTML = '';
      console.log(nameUser, emailRegister, passwordRegister);
    }
  });
  return sectionRegister;
};
