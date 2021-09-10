import {
  registerWithEmail,
  logInWithEmail,
  logInWithGoogle,
  logOut,
} from '../src/firebase/firebaseAuth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

// Test funcion de registro con correo y contraseña
describe('registerWithEmail', () => {
  it('Se creó un usuario con correo y contraseña', () => registerWithEmail('hola@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('hola@gmail.com');
    }));
});

// Tes funcion de inicio de sesion correo y contraseña
describe('logInWithEmail', () => {
  it('Se inició sesión con correo y contraseña', () => logInWithEmail('hola@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('hola@gmail.com');
    }));
});

// Test funcion de inicio de sesion con Google
describe('logInWithGoogle', () => {
  it('Se inició sesión con google', () => logInWithGoogle()
    .then((result) => {
      expect(result.providerData[0].providerId).toBe('google.com');
    }));
});

// Test funcion de cerrar sesion
describe('logOut', () => {
  it('Se cierra sesión', () => logOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
