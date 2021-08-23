// Aqui todas las funciones que involucran FIREBASE AUTH

// Iniciar sesion con cuenta registrada

//  Registro con correo y contraseña
export const registerWithEmail = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

// Iniciar sesion con cuenta de Google
export const logInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const emailVerication = () => (
  firebase.auth().currentUser.sendEmailVerification()
);

// Cerrar Sesión
export const logOut = () => firebase.auth().signOut();

// Propiedad que usuario esta activo
/* export const currentUser = () => firebase.auth().currentUser; */

// Cambiar contraseña
/* export const changePasword = (email) => (
  firebase.auth().sendPasswordResetEmail(email)
); */
