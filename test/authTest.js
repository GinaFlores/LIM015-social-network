import {
    registerUser,
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

// test de registro con gmail
describe('logInWithGoogle', () => {
    it('debería permitir que un usuario pueda registrarse usando su cuenta de gmail prueba@gmail.com', () => logInWithGoogle().then((user) => {
      expect(user.email).toBe('prueba@gmail.com');
    }));
  });