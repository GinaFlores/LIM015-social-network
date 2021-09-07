// añadiendo documentos a nuestra coleccion de firestore llamadas posts
export const postCollection = (nameUser, email, post, photo) => firebase.firestore().collection('posts').add({
  usuario: nameUser,
  correo: email,
  texto: post,
  foto: photo,
  timePost: firebase.firestore.Timestamp.fromDate(new Date()),
  like: 0,
  array: [],
});

// obteniendo posts de forma descendente
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc');
// Función para dar like
export const updatelike = (doc, id, value, uid) => firebase.firestore().collection('posts').doc(id).update({ like: firebase.firestore.FieldValue.increment(value), array: doc.concat(uid) });
// Función para quitar like
export const updateDislike = (id, value, newArray) => firebase.firestore().collection('posts').doc(id).update({ like: firebase.firestore.FieldValue.increment(value), array: newArray });
// Función para borrar post
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();
// Realizando función Editar
export const postEdit = (id, loading) => firebase.firestore().collection('posts').doc(id).update(loading);
