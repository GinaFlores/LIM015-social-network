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
export const catchPost = (callback) => firebase.firestore().collection('posts').orderBy('timePost', 'desc')
  .onSnapshot((querySnapshot) => {
    const postGetPost = [];
    querySnapshot.forEach((doc) => {
      postGetPost.push({ id: doc.id, ...doc.data() });
    });
    callback(postGetPost);
  });
/*
// hora
const actuallyhour = function(){
  const date = new Date(),
        hours = date.getHours();

}
*/
