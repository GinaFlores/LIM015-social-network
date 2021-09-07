// importamos el firebase mock que hemos instalado en la terminal
import MockFirebase from 'mock-cloud-firestore';
// importamos la funcion que vamos a testear
import {
  postCollection,
  getCollection,
   deletePost,
  updatelike,
  updateDislike,
  postEdit,
} from '../src/firebase/firebaseStore.js';
// Declarando la constante fixtureData
const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        id12345: {
          texto: 'Hola chicas, quiero ir a Iquitos',
          like: 0,
          array: [],
          usuario: 'Gigi',
        },
        id12346: {
          texto: 'Hola chicas, quiero ir a Huaraz',
          like: 0,
          array: [],
          usuario: 'Yup',
        },
        id12347: {
          texto: 'Hola chicas, quiero ir a Cajamarca',
          like: 1,
          array: ['yup235'],
          usuario: 'keyla',
        },
      },
    },
  },
};
// Declarando a firebase como variable global
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
// test de registro con correo y contraseña
describe('getCollection', () => {
  it('debería obtener las publicaciones de un usuario de manera descendete', () => getCollection(posts).then((data) => {
    console.log(data);
    expect(data).toBe(posts);
  }));
});
