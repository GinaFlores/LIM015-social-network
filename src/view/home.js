// eslint-disable-next-line import/named
import { logOutClick, observadorWatcher } from '../lib/index.js';
import { currentUser } from '../firebase/firebaseAuth.js';
import {
  postCollection, getCollection, deletePost, updatelike, updateDislike, postEdit,
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
      <p id="nameUserHom"></p>
      <p>Viajera</p>
    </div>
    <!-- Escribir Publicación -->
    <div class="writePostContainer">
      <div class="divPostHome">
        <img src="../img/viajera1.png" class="imgPost"></img>
        <div class="post">
          <div class="postGroup">
            <textarea id="contentPostHom" cols="35" roes="5"autofocus placeholder="¿Cuál es tu próximo destino?" required></textarea>
          </div>
          <div class="btnPosts">
            <button id="postButtonHom" type="submit"class="postButton">Publicar</button>
          </div>
        </div>
      </div>
      <div id="containerPostsHom"></div>
    </div>
  </div>
  `;
  sectionHome.innerHTML = templateHome;

  // declarando variables globales
  const btnPostHom = sectionHome.querySelector('#postButtonHom');
  const nameUser = sectionHome.querySelector('#nameUserHom');
  const textContentHom = sectionHome.querySelector('#contentPostHom');
  const contentPostsHom = sectionHome.querySelector('#containerPostsHom');

  // funcion para mostrar el nombre de usuaria
  if (localStorage.getItem('userName') == null) {
    nameUser.textContent = localStorage.getItem('userEmail');
  } else {
    nameUser.textContent = localStorage.getItem('userName');
  }

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
          <div class="postProfileHome">
            <div class="datoProfile">
              <img src="../img/viajera1.png" class="imgPost"></img>
              <div class="datoName">
                <p id="userNameHome-${doc.id}">${dataContent.usuario}</p>
                <span id="timeHome-${doc.id}">${dataContent.timePost.toDate().toDateString()}</span>
              </div>
            </div>
            <p class="textEdit" id="p-e-${doc.id}">${dataContent.texto}</p>
            <textarea id="t-e-${doc.id}" cols="35" roes="5" style="display:none">${dataContent.texto}</textarea>
            <div class="divSave"><span><i class="fas fa-save btnSave" id="s-e-${doc.id}" style="display:none"></i></span></div>
            <div class="reactionPost" id="reactionPostHom-${doc.id}">
              <div id="likesContentHome">${dataContent.like}</div>
                <div><span><i class="fas fa-heart btnLike" data-id="${doc.id}"></i></span></div>
                <div><span><i class="fas fa-edit btnEdit" id="e-${doc.id}"></i></span></div>
                <div><span id="closeItemHome-${doc.id}"><i class="fas fa-trash btnDelete" data-id="${doc.id}"></i></span></div>
            </div>
            <!--modalDelete-->
            <div class="modalDeletePost">
              <div class="modalContent">
              <h1 class="alertText"> Stop!</h1>
              <div class="modalText">
              <p class="alert">¿Segura que deseas eliminar este post?</p>
              </div>
              <div class="modalBotones">
                <button class="btnYes">Si</button>
                <button class="btnNo">No</button>
              </div>
              </div>
            </div>
          </div>
          `;
        // Funcion para eliminar publicaciones
        const btnDelete = document.querySelectorAll('.btnDelete');
        const btnYes = document.querySelector('.btnYes');
        const btnNo = document.querySelector('.btnNo');
        const modalDelete = document.querySelector('.modalDeletePost');
        btnDelete.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            modalDelete.classList.add('showModal');
            btnYes.addEventListener('click', () => {
              contentPostsHom.innerHTML = '';
              deletePost(e.target.dataset.id);
              modalDelete.classList.remove('showModal');
            });
            btnNo.addEventListener('click', () => {
              modalDelete.classList.remove('showModal');
            });
          });
        });

        // Funcion para editar publicaciones
        const btnEdit = document.querySelectorAll('.btnEdit');
        btnEdit.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            // console.log(e.target.id);
            const text = document.querySelector(`#t-${e.target.id}`);
            text.style.display = 'block';
            const parrafoPost = document.querySelector(`#p-${e.target.id}`);
            parrafoPost.style.display = 'none';
            const btnEditPost = document.querySelector(`#${e.target.id}`);
            btnEditPost.style.display = 'none';
            const btnSave = document.querySelector(`#s-${e.target.id}`);
            btnSave.style.display = 'block';
          });
        });

        // Funcion para guardar publicaciones
        const btnsSave = document.querySelectorAll('.btnSave');
        btnsSave.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const idBtn = e.target.id;
            const idNewBtn = idBtn.substring(4);
            // console.log(idBtn);
            // console.log(idNewBtn);
            const text = document.querySelector(`#t-e-${idNewBtn}`);
            text.style.display = 'none';
            const parrafoPost = document.querySelector(`#p-e-${idNewBtn}`);
            parrafoPost.style.display = 'block';
            const btnEditPost = document.querySelector(`#e-${idNewBtn}`);
            btnEditPost.style.display = 'block';
            const btnSave = document.querySelector(`#s-e-${idNewBtn}`);
            btnSave.style.display = 'none';
            await postEdit(idNewBtn, { texto: text.value });
          });
        });

        // Funcion de dar like y quitar like
        const btnHeart = document.querySelectorAll('.btnLike');
        btnHeart.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const increment = 1;
            const decrement = -1;
            const idUser = localStorage.getItem('userId');
            const array = dataContent.array;
            if (array.includes(idUser)) {
              const index = array.indexOf(idUser);
              array.splice(index, 1);
              await updateDislike(e.target.dataset.id, decrement, array);
            } else {
              await updatelike(array, e.target.dataset.id, increment, idUser);
            }
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
