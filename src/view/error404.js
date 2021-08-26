export const error = () => {
  const sectionError = document.createElement('section');
  sectionError.classList.add('error404');
  const errorTemplate = `
  //Doing the moon
  <div class="moon"></div>
  <div class="crater crater1"></div>
  <div class="crater crater2"></div>
  <div class="crater crater3"></div>
  //Doing the stars
  <div class="star star1"></div>
  <div class="star star2"></div>
  <div class="star star3"></div>
  <div class="star star4"></div>
  <div class="star star5"></div>
  <div class="star star6"></div>

  <div class="error">
    <div class="title">404</div>
    <div class="subtitle">Ups...</div>
    <div class="decription"> Te desviaste del camino!</div>
  </div>
    `;
  sectionError.innerHTML = errorTemplate;
  return sectionError;
};
