// Aqui todas las funciones que involucran FIREBASE AUTH

//  Registro con correo y contraseña
export const registerWithEmail = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

// Funcion para Iniciar Sesión con Correo y Contraseña
export const logInWithEmail = (email, password) => {
  const login = firebase.auth().signInWithEmailAndPassword(email, password);
  return login;
};

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
export const currentUser = () => firebase.auth().currentUser;

// Cambiar contraseña
/* export const changePasword = (email) => (
  firebase.auth().sendPasswordResetEmail(email)
); */
