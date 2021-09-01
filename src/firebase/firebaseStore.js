/* eslint-disable max-len */
// añadiendo documentos a nuestra coleccion de firestore llamadas posts
export const postCollection = (nameUser, email, id, post, photo) => firebase.firestore().collection('posts').add({
  usuario: nameUser,
  correo: email,
  identificador: id,
  texto: post,
  foto: photo,
  timePost: firebase.firestore.Timestamp.fromDate(new Date()),
});

// obteniendo posts de forma descendente
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc');

// Declaracion para fecha
/* const date = new Date();
  const datePost = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '');
*/

// Realizando la función de delete
export const deletePost = () => firebase.firestore().collection('posts').doc().delete();
