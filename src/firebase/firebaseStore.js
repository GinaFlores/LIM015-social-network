// añadiendo documentos a nuestra coleccion de firestore llamadas posts
export const postCollection = (email, user, id, post, photo) => firebase.firestore().collection('posts').add({
  correo: email,
  usuario: user,
  identificador: id,
  texto: post,
  foto: photo,
  timePost: new Date(),
});

// obteniendo posts
export const catchPosts = () => {
  const seePosts = firebase.firestore().collection('posts').orderBy('time', 'desc').get();
  return seePosts;
};

// obteniendo las publicaciones actualizadas
export const actualPosts = (callback) => {
  const getActualPosts = firebase.firestore().collection('posts').onSnapshot(callback);
  return getActualPosts;
};
