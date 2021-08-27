import { currentUser } from '../firebase/firebaseAuth.js';
import { postCollection } from '../firebase/firebaseStore.js';

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

  const btnPost = sectionProfile.querySelector('#postButton');
  const nameUser = sectionProfile.querySelector('#nameUser');
  /* const textContent = sectionProfile.querySelector('#contentPost'); */
  const contentPosts = sectionProfile.querySelector('#containerPosts');

  // Mostrar nombre de usuaria
  if (localStorage.getItem('userName') == null) {
    nameUser.textContent = localStorage.getItem('userEmail');
  } else {
    nameUser.textContent = localStorage.getItem('userName');
  }

  // Añadiendo el template para los posts
  const postTemplate = `
    <div class="postProfile">
      <div class="profile">
        <div class="datoProfile">
          <div id="photoProfile" class="imgPost"></div>
          <h4 id="userName">Gigi Gonzales</h4>
          <span id="time">1 min.</span>
        </div>
        <textarea id="postContentText" cols="30" roes="5"></textarea>
      </div>
      <span id="closeItem"><i class="fas fa-trash"></i></span>
      <div id="postContent"></div>
      <div id="reactionPost">
      <span><i class="fas fa-heart"></i></span>
      <span><i class="fas fa-edit"></i></span>
      </div>
    </div>
  `;
  contentPosts.innerHTML = postTemplate;
  sectionProfile.appendChild(contentPosts);

  /*
  const getPosts = () => {
    showPosts((querySnapshot) => {
      const postContainer = sectionProfile.getElementById('postContentText');
      postContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const uidUser = localStorage.getItem('uid');
        if (uidUser =!null) {
          postContainer.innerHTML += `
          <div class="postProfile" data-idpost='${doc.id}'>
          <div class="profile">
            <div class="datoProfile">
              <div>
              <img id="photoProfile" class="imgPost" src='${doc.data().photo}'>
              </div>
              <h4 id="userName">${doc.data().name}</h4>
              <span id="time">${doc.data().day}</span>
            </div>
            // eslint-disable-next-line max-len
            <textarea id="postContent-${doc.id}" cols="30" roes="5">${doc.data().post}</textarea>
          </div>
          <span id="closeItem"><i class="fas fa-trash"></i></span>
          <div id="postContent"></div>
          <div id="reactionPost">
          <span><i class="fas fa-heart"></i></span>
          <span><i class="fas fa-edit"></i></span>
          </div>
        </div>
        `;
        }
      });
    });
  };
  */

  return sectionProfile;
};
