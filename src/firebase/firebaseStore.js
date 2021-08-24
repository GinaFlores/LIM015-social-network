// eslint-disable-next-line no-unused-vars
const db = firebase.firestore();
// para hacer referencia a una coleccion
// eslint-disable-next-line no-unused-vars
const posts = firebase.firestore().collection('posts');
// Para obtener todos los datos del documento de una colección .get() devuelve una promesa
// Para una consulta de colección Podemos acceder a ellos diciendo . snapshot.docs
//De cada documento, podemos obtener el id como una propiedad separada, y el resto de los datos usando .data()
