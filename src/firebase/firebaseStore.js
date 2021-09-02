/* eslint-disable max-len */
// añadiendo documentos a nuestra coleccion de firestore llamadas posts
export const postCollection = (nameUser, email, post, photo) => firebase.firestore().collection('posts').add({
  usuario: nameUser,
  correo: email,
  texto: post,
  foto: photo,
  timePost: firebase.firestore.Timestamp.fromDate(new Date()),
  like: 0,
});

// obteniendo posts de forma descendente
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc');

export const getPostForEdit = (id) => firebase.firestore().collection('posts').doc(id).get();
// funcion para guardar los elementos del post
export const savePost = (name, post) => {
  firebase.firestore().collection('posts').doc().set({
    name,
    post,
    likePost: 0,
    array: [],
  });
};
// Función para dar like
export const updatelike = (doc, id, value, uid) => firebase.firestore().collection('posts').doc(id).update({ likePost: firebase.firestore.FieldValue.increment(value), array: doc.concat(uid) });

// Función para quitar like
export const updateDislike = (id, value, newArray) => firebase.firestore().collection('posts').doc(id).update({ likePost: firebase.firestore.FieldValue.increment(value), array: newArray });
// Declaracion para fecha
/* const date = new Date();
  const datePost = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '');
*/

// Realizando la función de delete
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();
// Realizando función Editar
export const getPostEdit = (id) => firebase.firestore().collection('posts').doc(id).get();
