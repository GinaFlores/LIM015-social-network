export const profile = () => {
  const sectionProfile = document.createElement('section');
  sectionProfile.classList.add('profile');
  const templateProfile = `
  <div class="containerProfile">
    <section>
      <div id="photoProfile>
      </div>
      <p id="nameProfile"></p>
    </section>
    <div class='posts'>
    <textarea name='post' id='postUser' class='postUser' placeholder='¿Qué estás pensando?'></textarea>
    <div class='btnPosts'>
      <button id='buttonImg' type='button' class='buttonImg'>&#xf009</button>
    </div>
    <div class='buttons'>
      <button id='buttonShare' type='submit' class='buttonShare'>Share</button>
    </div>
  </div>
  <section>
    <div class='postMessage'>
      <div>
        <p>Post by<span id='userNamePost'></span></p>
        <span id='closeItem'><i class="fas fa-times-circle"></i></span>
      </div>
      <div id='postContent'></div>
      <div id='reactionPost'>
        <span><i class="fas fa-heart"></i></span>
        <span><i class="fas fa-share-square"></i></span>
      </div>
    </div>
  </section>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
    <h1>Profile</h1>
  </div>
  `;
  sectionProfile.innerHTML = templateProfile;

  const auth = firebase.auth();
  const sigOutFunction = () => {
    auth.sigOut()
      .then(() => {
        window.location.assign('#/LogIn');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return sectionProfile;
};
