const registerForm = document.querySelector('#registerForm');

registerForm.addEventListener('submit', e => {
  e.preventDefault();

  const userName = registerForm['username'].value;
  const password = registerForm['password'].value;

  auth.createUserWithEmailAndPassword(userName, password).then(cred => {
    registerForm.reset();
    window.location.replace('dashboard.html');
  });
});
