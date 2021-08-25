import { currentUser } from '../firebase/firebaseAuth.js';
import { postCollection, catchPosts, actualPosts } from '../firebase/firebaseStore.js';

export const profile = () => {
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('profile');
  const templateProfile = `
  <!-- Perfil -->
  <div class="containerProfile">
    <div class="frontProfile"></div>
    <div class="container">
      <div class="photoUser"></div>
    </div>
    <div class="details">
      <h3>Gigi Gonzales</h3>
      <p>Lives in Lima, Perú works at Nestlé I´m a Psycologist</p>
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

  // añadiendo el template para los posts
  const containerPosts = sectionProfile.querySelector('#containerPosts');
  const postTemplate = `
    <div class="postProfile">
      <div class="profile">
        <div class="datoProfile">
          <div id="photoProfile" class="imgPost"></div>
          <h4 id="userName">Gigi Gonzales</h4>
          <span id="time">1 min.</span>
        </div>
        <textarea cols="30" roes="5" placeholder="Hola chicas, mi próximo destino es Trujillo.💖😎✈"></textarea>
      </div>
      <span id="closeItem"><i class="fas fa-trash"></i></span>
      <div id="postContent"></div>
      <div id="reactionPost">
      <span><i class="fas fa-heart"></i></span>
      <span><i class="fas fa-edit"></i></span>
      </div>
    </div>
  `;
  containerPosts.innerHTML = postTemplate;
  sectionProfile.appendChild(containerPosts);

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
  };
  btnPost.addEventListener('click', writePost);
  /*
  // funcion para visualizar los posts
  actualPosts(() => {
    containerPosts.innerHTML = '';
    // SNAPSHOT
    catchPosts().then((docRef) => {
      docRef.forEach((docAboutCollection) => {
        const idPost = docAboutCollection.ref.id;
        const existPost = docAboutCollection.exists;
        const pathPost = docAboutCollection.ref.path;
        const postInfo = docAboutCollection.data();
        // console.log(docAboutCollection);
        // console.log(idPost, existPost, pathPost);
        // console.log(docAboutCollection);
        // console.log(postInfo);
        // console.log(postInfo.post);
        containerPosts.innerHTML += `<section class='postMessage'>
          <div class='authorPost' name='${postInfo.id}'>
            <p>Publicado<span id='userNamePost' class='userNamePost' >${postInfo.mail}</span></p>
            <button id='${idPost}' class='btnDelete'>&#10062;</button>
          </div>
          <div class='sectionAboutPost'>
            <input name='${idPost}' disabled class='postContent' value='${postInfo.post}'>
            <div>
              <button id='${idPost}' class='btnEdit'>&#9997;</button>
              <button id='${idPost}' class='btnSave'>&#9989;</button>
          </div>
          </div>
          <div id='reactionPost' class='reactionPost'>
            <button id='${idPost}' class='btnLove'>&#x2764;&#xfe0f;</button>
            <span name='${idPost}'>${postInfo.likes}</span>
            <button id='${idPost}' class='btnDkislike'>&#128078;</button>
            <button id='${idPost}' class='btnComments'>&#128172;</button>
            <span>0</span>
          </div>
        </section>`;
      });
    })
      .catch((error) => {
        console.log(error);
      });
  });
*/
  return sectionProfile;
};
