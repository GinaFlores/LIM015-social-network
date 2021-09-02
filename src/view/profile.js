import { currentUser } from '../firebase/firebaseAuth.js';
import {
  postCollection, getCollection, updatelike, updateDislike,
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
    console.log(showName);
    if (textContent.value !== '') {
      postCollection(showName, user.email, user.uid, post, photo)
        .then(() => {
          textContent.value = '';
          console.log('agregando post');
        }).catch((error) => {
          console.log('no se agregó post', error);
        });
    } else {
      alert('Ingrese su post');
    }
    console.log(showName, user.email, user.uid, post, photo);
  };
  btnPost.addEventListener('click', (writePost));

  // funcion de mostrar publicaciones
  const getPosts = () => {
    getCollection().onSnapshot((collection) => {
      contentPosts.innerHTML = '';
      collection.forEach((element) => {
        // console.log(element.data());
        const dataContent = element.data();
        console.log(dataContent);
        contentPosts.innerHTML += `
          <div class="postProfile">
            <div class="datoProfile">
              <img src="../img/viajera1.png" class="imgPost"></img>
              <div class="datoName">
                <p id="userName">${dataContent.usuario}</p>
                <span id="time">${dataContent.timePost.toDate().toDateString()}</span>
              </div>
            </div>
            <p class="postText" id="postContent">${dataContent.texto}</p>
            <textarea id="postContentText" cols="30" roes="5" style="display:none"></textarea>
            <div class="reactionPost" id="reactionPost">
              <div id="likesContent"></div>
              <div><span><i class="fas fa-heart"></i></span></div>
              <div><span><i class="fas fa-edit btnEdit dataId="${dataContent.identificador}"></i></span></div>
              <div><span id="closeItem"><i class="fas fa-trash"></i></span></div>
            </div>
          </div>
          `;
        const btnEdit = document.querySelectorAll('.btnEdit');
        btnEdit.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            console.log(e.target.dataset.uid);
          });
        });
      });
    });
  };
  getPosts();

  return sectionProfile;
};

// declarando id del boton de los likes


sectionProfile.addEventListener('click', async (e) => {
  const contentPosts = sectionProfile.querySelector('#containerPosts');
  const userUid = localStorage.getItem('uid');
  const uidGoogle = localStorage.getItem('uidGoogle');
  if (e.target.classList.contains('fa-heart')) {
    const posts = await getPost();
    posts.forEach(async (doc) => {
      const arrayIDLikes = doc.data().array;
      const postId = doc.data();
      postId.id = doc.id;
      if (postId.id === e.target.dataset.id) {
        if (arrayIDLikes.includes(userUid || uidGoogle)) {
          const index = arrayIDLikes.indexOf(userUid);
          const decrement = -1;
          arrayIDLikes.splice(index, 1);
          await updateDislike(e.target.dataset.id, decrement, arrayIDLikes);
          postSection.innerHTML = '';
          showAllPosts(postSection);
        } else {
          const increment = 1;
          await updatelike(arrayIDLikes, e.target.dataset.id, increment, userUid || uidGoogle);
          postSection.innerHTML = '';
          showAllPosts(postSection);
        }
      }
    });
  }
});