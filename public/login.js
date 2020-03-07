const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const userName = loginForm['username'].value;
  const password = loginForm['password'].value;

  auth.signInWithEmailAndPassword(userName, password).then(cred => {
    window.location.replace('dashboard.html');
  });
});
