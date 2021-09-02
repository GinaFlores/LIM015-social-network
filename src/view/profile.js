import { currentUser } from '../firebase/firebaseAuth.js';
import {
  postCollection, getCollection, deletePost, getPostEdit,
} from '../firebase/firebaseStore.js';

export const profile = () => {
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('profile');
  const templateProfile = `
  <!-- Perfil -->
  <div class="containerProfile">
    <div class="frontProfile"></div>
    <div class="container">
      <div><img src="../img/viajera1.png" alt="photo profile" class="photoUser"></img></div>
    </div>
    <div class="details">
      <h3 id="nameUser"></h3>
      <p id"statu">Lives in Lima, Perú works at Nestlé I´m a Psycologist</p>
    </div>
    <!-- Escribir Publicación -->
    <div class="writePostContainer">
      <div class="divPost">
        <img src="../img/viajera1.png" class="imgPost"></img>
        <div class="post">
          <div class="postGroup">
            <textarea id="contentPost" cols="35" roes="5"autofocus placeholder="¿Cuál es tu próximo destino?" required></textarea>
          </div>
          <button id="postButton" type="submit"class="postButton">Publicar</button>
        </div>
      </div>
      <div id="containerPosts"></div>
    </div>
  </div>
  `;
  sectionProfile.innerHTML = templateProfile;

  // declarando variables globales
  const btnPost = sectionProfile.querySelector('#postButton');
  const nameUser = sectionProfile.querySelector('#nameUser');
  const textContent = sectionProfile.querySelector('#contentPost');
  const contentPosts = sectionProfile.querySelector('#containerPosts');

  // funcion para mostrar el nombre de usuaria
  if (localStorage.getItem('userName') == null) {
    nameUser.textContent = localStorage.getItem('nameRegister');
  } else {
    nameUser.textContent = localStorage.getItem('userName');
  }

  // funcion para agregar post
  const writePost = (event) => {
    event.preventDefault();
    textContent.innerHTML = '';
    const post = textContent.value;
    const user = currentUser();
    const photo = currentUser().photoURL;
    const showName = user.displayName || localStorage.getItem('nameRegister');
    // eslint-disable-next-line no-console
    console.log(showName);
    if (textContent.value !== '') {
      postCollection(showName, user.email, post, photo)
        .then(() => {
          textContent.value = '';
          // eslint-disable-next-line no-console
          console.log('agregando post');
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log('no se agregó post', error);
        });
    } else {
      // eslint-disable-next-line no-alert
      alert('Ingrese su post');
    }
    console.log(showName, user.email, post, photo);
  };
  btnPost.addEventListener('click', (writePost));

  // funcion de mostrar publicaciones
  const getPosts = () => {
    getCollection().onSnapshot((collection) => {
      contentPosts.innerHTML = '';
      collection.forEach((doc) => {
        // console.log(element.data());
        const dataContent = doc.data();
        console.log(dataContent);
        contentPosts.innerHTML += `
          <div class="postProfile">
            <div class="datoProfile">
              <img src="../img/viajera1.png" class="imgPost"></img>
              <div class="datoName">
                <p id="userName-${doc.id}">${dataContent.usuario}</p>
                <span id="time-${doc.id}">${dataContent.timePost.toDate().toDateString()}</span>
              </div>
            </div>
            <textarea class="textEdit" id="postContentText-${doc.id}" cols="30" roes="5" readonly>${dataContent.texto}</textarea>
            <div class="reactionPost" id="reactionPost-${doc.id}">
              <div id="likesContent-${doc.id}"></div>
              <div><span><i class="fas fa-heart"></i></span></div>
              <div><span><i class="fas fa-edit btnEdit" data-id="${doc.id}"></i></span></div>
              <div><span id="closeItem-${doc.id}"><i class="fas fa-trash btnDelete" data-id="${doc.id}"></i></span></div>
            </div>
          </div>
          `;
        // Funcion para eliminar publicaciones
        const btnDelete = document.querySelectorAll('.btnDelete');
        btnDelete.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            /* console.log(e.target.dataset.id); */
            await deletePost(e.target.dataset.id);
          });
        });

        // Funcion para editar publicaciones
        const btnEdit = document.querySelectorAll('.btnEdit');
        btnEdit.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            /* console.log(e.target.dataset.id); */
            const edition = await getPostEdit(e.target.dataset.id);
            const task = edition.data();
            console.log(task);

            /* const textEdit = document.querySelector('#postContentText');
            textEdit.style.display = 'block';
            textEdit.value = dataContent.texto; */
          });
        });

        /* const removePost = (deletePost, id) => {
          const optionDelete = document.write('¿Estás seguro de querer eliminar el post?');
          if (optionDelete === true) {
            deletePost(id).then(() => {
            // eslint-disable-next-line no-console
              console.log(`post${postId}borrado con exito`);
            });
          }
        };
        */
      });
    });
  };
  getPosts();

  return sectionProfile;
};
