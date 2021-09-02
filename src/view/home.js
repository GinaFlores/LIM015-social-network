// eslint-disable-next-line import/named
import { logOutClick, observadorWatcher } from '../lib/index.js';

export const home = () => {
  const sectionHome = document.createElement('section');
  // const nodo = document.createElement('div');
  sectionHome.classList.add('iHome');
  sectionHome.innerHTML = `
  <!-- Inicio-->
  <div class="containerHome">
    <div class="container">
      <div><img src="../img/viajera1.png" alt="photo profile" class="photoUser"></img></div>
    </div>
    <div>Gina</div>
    <p>Viajera</p>
  </div>
  `;
  // sectionHome.appendChild(nodo);
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
