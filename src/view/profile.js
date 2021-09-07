import { currentUser } from '../firebase/firebaseAuth.js';
import {
  postCollection, getCollection, deletePost, updatelike, updateDislike, postEdit,
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
      <h4 id="nameUser"></h4>
      <p id"statu">Viajera</p>
    </div>
    <!-- Escribir Publicación -->
    <div class="writePostContainer">
      <div class="divPost">
        <img src="../img/viajera1.png" class="imgPost"></img>
        <div class="post">
          <div class="postGroup">
            <textarea id="contentPost" cols="35" roes="5"autofocus placeholder="¿Cuál es tu próximo destino?" required></textarea>
          </div>
          <div class="btnPosts">
            <button id="postButton" type="submit"class="postButton">Publicar</button>
          </div>
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
    nameUser.textContent = localStorage.getItem('userEmail');
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
    const showName = localStorage.getItem('userEmail');
    console.log(showName);
    if (textContent.value !== '') {
      postCollection(showName, user.email, post, photo)
        .then(() => {
          textContent.value = '';
          console.log('agregando post');
        }).catch((error) => {
          console.log('no se agregó post', error);
        });
    } else {
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
        // console.log(dataContent);
        // eslint-disable-next-line eqeqeq
        if (dataContent.usuario == localStorage.getItem('userEmail')) {
          contentPosts.innerHTML += `
          <div class="postProfile">
            <div class="datoProfile">
              <img src="../img/viajera1.png" class="imgPost"></img>
              <div class="datoName">
                <p id="userName-${doc.id}">${dataContent.usuario}</p>
                <span id="time-${doc.id}">${dataContent.timePost.toDate().toDateString()}</span>
              </div>
            </div>
            <p class="textEdit" id="p-e-${doc.id}">${dataContent.texto}</p>
            <textarea class="" id="t-e-${doc.id}" cols="30" roes="5" style="display:none">${dataContent.texto}</textarea>
            <div class="divSave"><span><i class="fas fa-save btnSave" id="s-e-${doc.id}" style="display:none"></i></span></div>
            <div class="reactionPost" id="reactionPost-${doc.id}">
              <div id="likesContent">${dataContent.like}</div>
                <div><span><i class="fas fa-heart btnLike" data-id="${doc.id}"></i></span></div>
                <div><span><i class="fas fa-edit btnEdit" id="e-${doc.id}"></i></span></div>
                <div><span id="closeItem-${doc.id}"><i class="fas fa-trash btnDelete" data-id="${doc.id}"></i></span></div>
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
        }
        // Funcion para eliminar publicaciones
        const btnDelete = document.querySelectorAll('.btnDelete');
        const btnYes = document.querySelector('.btnYes');
        const btnNo = document.querySelector('.btnNo');
        const modalDelete = document.querySelector('.modalDeletePost');
        btnDelete.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            modalDelete.classList.add('showModal');
            btnYes.addEventListener('click', () => {
              contentPosts.innerHTML = '';
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

        // declarando id del boton de los likes
        const btnHeart = document.querySelectorAll('.btnLike');
        btnHeart.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const increment = 1;
            const decrement = -1;
            const idUser = localStorage.getItem('userId');
            const array = dataContent.array;
            console.log(array);
            if (array.includes(idUser)) {
              const index = array.indexOf(idUser);
              array.splice(index, 1);
              // console.log(e.target.dataset.id, decrement, array);
              await updateDislike(e.target.dataset.id, decrement, array);
            } else {
              // console.log(e.target.dataset.id, decrement, array);
              await updatelike(array, e.target.dataset.id, increment, idUser);
            }
          });
        });
      });
    });
  };
  getPosts();
  return sectionProfile;
};
