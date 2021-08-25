// añadiendo documentos a nuestra coleccion de firestore llamadas posts
export const postCollection = (email, nombre, id, post, photo) => firebase.firestore().collection('posts').add({
  Email: email,
  User: nombre,
  Id: id,
  Text: post,
  Photo: photo,
  timePost: new Date(),
});
