// importamos el firebase mock que hemos instalado en la terminal
import MockFirebase from 'mock-cloud-firestore';
// importamos la funcion que vamos a testear
import {
  getCollection,
  deletePost,
// updatelike
} from '../src/firebase/firebaseStore.js';

// Declarando la constante fixtureData
const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc12345: {
          texto: 'Hola chicas, quiero ir a Iquitos',
        },
        abc12346: {
          texto: 'Hola chicas, quiero ir a Huaraz',
        },
        abc12347: {
          texto: 'Hola chicas, quiero ir a Cajamarca',
        },
      },
    },
  },
};
// Declarando a firebase como variable global
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

// Test de funcion para elimar post
describe('deletePost', () => {
  it('Debería poder eliminar una publicacion', () => {
    deletePost('abc12346')
      .then(() => getCollection(
        (data) => {
          expect(data).toBe(undefined);
        },
      ));
  });
});

// Test de funcion para dar like post
/* describe('updatelike', () => {
  it('debería ser una función', () => {
    expect(typeof postLike).toBe('function');
  });
  it('Debería poder dar like', (done) => updatelike('abc134', 1)
    .then(() => getCollection(
      (data) => {
        const result = data.find((note) => note.like === 1);
        expect(result.like).toBe(1);
        done();
      },
    )));
}); */
