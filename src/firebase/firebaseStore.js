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
export const getPosts = (callback) => {
  firebase.firestore().collection('posts').orderBy('timePost', 'desc').onSnapshot((data) => {
    const posts = [];
    data.forEach((post) => {
      // eslint-disable-next-line no-undef
      posts.push({ id: post.id, ...post.data() });
    });
    callback(posts);
  });
};
