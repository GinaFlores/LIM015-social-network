// eslint-disable-next-line import/named
import { logOutClick, observadorWatcher } from '../lib/index.js';
import { currentUser } from '../firebase/firebaseAuth.js';
import {
  postCollection, getCollection, deletePost, getPostEdit, postEdit,
} from '../firebase/firebaseStore.js';

export const home = () => {
  const sectionHome = document.createElement('section');
  sectionHome.classList.add('iHome');
  const templateHome = `
  <!-- Inicio-->
  <div class="containerHome">
    <div class="containerInfo">
      <div class="infoPhoto">
        <div><img src="../img/viajera1.png" alt="photo profile" class="photoUserHome"></img></div>
      </div>
      <div id="nameUserHom">Gina</div>
      <p>Viajera</p>
    </div>
    <!-- Escribir Publicación -->
    <div class="writePostContainer">
      <div class="divPost">
        <img src="../img/viajera1.png" class="imgPost"></img>
        <div class="post">
          <div class="postGroup">
            <textarea id="contentPostHom" cols="35" roes="5"autofocus placeholder="¿Cuál es tu próximo destino?" required></textarea>
          </div>
          <button id="postButtonHom" type="submit"class="postButton">Publicar</button>
        </div>
      </div>
      <div id="containerPostsHom"></div>
    </div>
  </div>
  `;
  sectionHome.innerHTML = templateHome;

  // declarando variables globales
  const btnPostHom = sectionHome.querySelector('#postButtonHom');
  // const nameUser = sectionProfile.querySelector('#nameUserHom');
  const textContentHom = sectionHome.querySelector('#contentPostHom');
  const contentPostsHom = sectionHome.querySelector('#containerPostsHom');

  // funcion para agregar post
  const writePost = (event) => {
    event.preventDefault();
    textContentHom.innerHTML = '';
    const post = textContentHom.value;
    const user = currentUser();
    const photo = currentUser().photoURL;
    const showName = localStorage.getItem('userEmail');
    if (textContentHom.value !== '') {
      postCollection(showName, user.email, post, photo)
        .then(() => {
          textContentHom.value = '';
          console.log('agregando post');
        }).catch((error) => {
          console.log('no se agregó post', error);
        });
    } else {
      alert('Ingrese su post');
    }
  };
  btnPostHom.addEventListener('click', (writePost));

  // funcion de mostrar publicaciones
  const getPosts = () => {
    getCollection().onSnapshot((collection) => {
      contentPostsHom.innerHTML = '';
      collection.forEach((doc) => {
        // console.log(element.data());
        const dataContent = doc.data();
        contentPostsHom.innerHTML += `
          <div class="postProfile">
            <div class="datoProfile">
              <img src="../img/viajera1.png" class="imgPost"></img>
              <div class="datoName">
                <p id="userNameHome-${doc.id}">${dataContent.usuario}</p>
                <span id="timeHome-${doc.id}">${dataContent.timePost.toDate().toDateString()}</span>
              </div>
            </div>
            <p class="textEdit" id="postContentTextHo-${doc.id}">${dataContent.texto}</p>
            <textarea class="" id="textareaContentHo-${doc.id}" cols="30" roes="5" style="display:none">${dataContent.texto}</textarea>
            <div class="reactionPost" id="reactionPostHom-${doc.id}">
              <div id="likesContentHom-${doc.id}"></div>
              <div><span><i class="fas fa-heart"></i></span></div>
              <div><span><i class="fas fa-edit btnEdit" id="iconEditHome-${doc.id}"></i></span></div>
              <div><span><i class="fas fa-save btnSave" id="icontSaveHome-${doc.id}" style="display:none"></i></span></div>
              <div><span id="closeItemHome-${doc.id}"><i class="fas fa-trash btnDelete" data-id="${doc.id}"></i></span></div>
            </div>
          </div>
          `;
        // Funcion para eliminar publicaciones
        const btnDeleteHome = document.querySelectorAll('.btnDelete');
        btnDeleteHome.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            /* console.log(e.target.dataset.id); */
            await deletePost(e.target.dataset.id);
          });
        });

        // Funcion para editar publicaciones
        const btnEditHome = document.querySelectorAll('.btnEdit');
        btnEditHome.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const text = document.querySelector(`#textareaContentHo-${e.target.dataset.id}`);
            text.style.display = 'block';
            const parrafoPost = document.querySelector(`#postContentTextHo-${e.target.dataset.id}`);
            parrafoPost.style.display = 'none';
            const btnSave = document.querySelector(`#icontSaveHome-${e.target.dataset.id}`);
            btnSave.style.display = 'block';
            const btnEditPost = document.querySelector(`#iconEditHome-${e.target.dataset.id}`);
            btnEditPost.style.display = 'none';
            /* console.log(e.target.dataset.id); */
            /* await postEdit(e.target.dataset.id, { texto: text.value }); */
            /* const edition = await getPostEdit(e.target.dataset.id);
            const task = edition.data();
            console.log(task); */

            /* const textEdit = document.querySelector('#postContentText');
            textEdit.style.display = 'block';
            textEdit.value = dataContent.texto; */
          });
        });
      });
    });
  };
  getPosts();

  return sectionHome;
};

// Funcionalidad de menu hamburguesa
const navSlide = (element) => {
  const navToggle = element.querySelector('.navToggle');
  const navMenu = element.querySelector('.navMenu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('navMenuVisible');
  });
};

export const navigator = () => {
  observadorWatcher();
  const templateNavigator = `
  <header class="header">
    <nav class="nav">
      <a href="#/Home"><img src="./img/logoNav.png" class="imageLogo"></a>
      <button class="navToggle">
        <i class="fas fa-bars"></i>
      </button>
      <ul class="navMenu">
        <li class="navMenuItem"><a href="#/Home" class="navMenuLink navLink">Home</a></li>
        <li class="navMenuItem"><a href="#/Profile" class="navMenuLink navLink">Profile</a></li>
        <li class="navMenuItem"><a href="#/LogIn" class="navMenuLink navLink" id="btnLogout">LogOut</a></li>
      </ul>
    </nav>
  </header>
  `;
  const sectionNavigator = document.createElement('div');
  sectionNavigator.classList.add('navigator');
  sectionNavigator.innerHTML = templateNavigator;

  // Carga de Cerrar Sesión
  const btnCerrarSesion = sectionNavigator.querySelector('#btnLogout');
  btnCerrarSesion.addEventListener('click', logOutClick);

  navSlide(sectionNavigator);
  return sectionNavigator;
};
