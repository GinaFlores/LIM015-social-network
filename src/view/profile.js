import { currentUser } from '../firebase/firebaseAuth.js';
import {
  postCollection, getCollection, deletePost, updatelike, updateDislike, getPostEdit, postEdit,
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
    const showName = localStorage.getItem('userEmail');
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
        contentPosts.innerHTML += `
          <div class="postProfile">
            <div class="datoProfile">
              <img src="../img/viajera1.png" class="imgPost"></img>
              <div class="datoName">
                <p id="userName-${doc.id}">${dataContent.usuario}</p>
                <span id="time-${doc.id}">${dataContent.timePost.toDate().toDateString()}</span>
              </div>
            </div>
            <p class="textEdit" id="postContentText-${doc.id}">${dataContent.texto}</p>
            <textarea class="" id="textareaContent-${doc.id}" cols="30" roes="5" style="display:none">${dataContent.texto}</textarea>
            <div class="reactionPost" id="reactionPost-${doc.id}">
              <div id="likesContent">${dataContent.like}</div>
              <div><span><i class="fas fa-heart btnLike" data-id="${doc.id}"></i></span></div>
              <div><span><i class="fas fa-edit btnEdit" id="iconEdit-${doc.id}"></i></span></div>
              <div><span><i class="fas fa-save btnSave" id="icontSave-${doc.id}" style="display:none"></i></span></div>
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
          btn.addEventListener('click', async (e) => {
            const text = document.querySelector(`#textareaContent-${e.target.dataset.id}`);
            text.style.display = 'block';
            const parrafoPost = document.querySelector(`#postContentText-${e.target.dataset.id}`);
            parrafoPost.style.display = 'none';
            const btnSave = document.querySelector(`#icontSave-${e.target.dataset.id}`);
            btnSave.style.display = 'block';
            const btnEditPost = document.querySelector(`#iconEdit-${e.target.dataset.id}`);
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
        // declarando id del boton de los likes
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

  return sectionProfile;
};
