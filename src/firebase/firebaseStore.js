// añadiendo documentos a nuestra coleccion de firestore llamadas posts
export const postCollection = (email, nameUser, id, post, photo) => firebase.firestore().collection('posts').add({
  correo: email,
  usuario: nameUser,
  identificador: id,
  texto: post,
  foto: photo,
  timePost: firebase.firestore.Timestamp.fromDate(new Date()),
});

// obteniendo posts de forma descendente
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc').get();
