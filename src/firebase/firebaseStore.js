// añadiendo documentos a nuestra coleccion de firestore llamadas posts
export const postCollection = (email, userName, id, post, photo) => firebase.firestore().collection('posts').add({
  correo: email,
  usuario: userName,
  identificador: id,
  texto: post,
  foto: photo,
  timePost: new Date(),
});

// obteniendo posts
export const getPosts = (callback) => {
  firebase.firestore().collection('posts').orderBy('timePost', 'desc').onSnapshot((data) => {
    const posts = [];
    data.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    callback(posts);
  });
};

/* // Obtener todos los posts en orden
export const getPosts = () => {
  const postOnFirestore = firebase.firestore().collection('posts').orderBy('time', 'desc').get();
  return postOnFirestore;
};

// Obtener todos los post actualizados (snapshot)
export const actualizePosts = (callback) => {
  const actualitPost = firebase.firestore().collection('posts').onSnapshot(callback);
  return actualitPost;
}; */
