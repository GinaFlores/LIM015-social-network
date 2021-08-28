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
