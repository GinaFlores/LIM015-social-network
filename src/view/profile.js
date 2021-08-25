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
          <textarea id="content" class="content" cols="30" roes="5" placeholder="¿Cuál es tu próximo destino?" required></textarea>
        </div>
        <button id="postButton" type="submit"class="postButton">Publicar</button>
      </div>
    </div>
    <div class="postProfile">
      <div class="profile">
        <div class="datoProfile">
          <div id="photoProfile" class="imgPost"></div>
          <h4 id="userName">Gigi Gonzales</h4>
          <span id="time">1 min.</span>
        </div>
        <textarea cols="30" roes="5" placeholder="Hola chicas, mi próximo destino es Trujillo.💖😎✈"></textarea>
      </div>
      <div class="postMessage">
        <p>Post by<span id="userNamePost"></span></p>
        <span id="closeItem"><i class="fas fa-trash"></i></span>
      <div id="postContent"></div>
      <div id="reactionPost">
        <span><i class="fas fa-heart"></i></span>
        <span><i class="fas fa-edit"></i></span>
      </div>
    </div>
  </div>
  `;
  sectionProfile.innerHTML = templateProfile;

  /* const auth = firebase.auth();
  const sigOutFunction = () => {
    auth.sigOut()
      .then(() => {
        window.location.assign('#/LogIn');
      })
      .catch((error) => {
        console.error(error);
      });
  }; */

  return sectionProfile;
};
