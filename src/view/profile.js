import { currentUser } from '../firebase/firebaseAuth.js';
import { postCollection, getCollection } from '../firebase/firebaseStore.js';

export const profile = () => {
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('profile');
  const templateProfile = `
  <!-- Perfil -->
  <div class="containerProfile">
    <div class="frontProfile"></div>
    <div class="container">
      <div><img src="../img/viajera1.png" alt="photoProfile" class="photoUser"></img></div>
    </div>
    <div class="details">
      <h3 id="nameUser"></h3>
      <p id"statu">Lives in Lima, Perú works at Nestlé I´m a Psycologist</p>
    </div>
    <!-- Escribir Publicación -->
    <div class="divPost">
      <div id="photoProfile" class="imgPost"></div>
      <div class="post">
        <div class="postGroup">
          <textarea id="contentPost" class="content" cols="30" roes="5"autofocus placeholder="¿Cuál es tu próximo destino?" required></textarea>
        </div>
        <button id="postButton" type="submit"class="postButton">Publicar</button>
      </div>
    </div>
    <div id="containerPosts"></div>
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
    const post = document.getElementById('contentPost').value;
    const user = currentUser();
    const photo = currentUser().photoURL;
    if (post !== '') {
      postCollection(user.email, user.displayName, user.uid, post, photo)
        .then(() => {
          document.getElementById('contentPost').value = '';
          console.log('agregando post');
        }).catch((error) => {
          console.log('no se agregó post', error);
        });
    } else {
      alert('Ingrese su post');
    }
    console.log(user.email, user.displayName, user.uid, post, photo);
  };
  btnPost.addEventListener('click', writePost);

  // funcion de mostrar publicaciones
  getCollection()
    .then((doc) => {
      doc.forEach((element) => {
        contentPosts.innerHTML += `
        <div class="postProfile">
          <div class="profile">
            <div class="datoProfile">
              <div id="photoProfile" class="imgPost"></div>
              <h4 id="userName"></h4>
              <span id="time">${doc.data().timePost}</span>
            </div>
            <textarea id="postContentText" cols="30" roes="5"></textarea>
          </div>
          <span id="closeItem"><i class="fas fa-trash"></i></span>
          <div id="postContent">${doc.data().texto}</div>
          <div id="reactionPost">
          <span><i class="fas fa-heart"></i></span>
          <span><i class="fas fa-edit"></i></span>
          </div>
        </div>
        `;
        console.log(element.data());
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return sectionProfile;
};
