const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('Logged out');
    window.location.replace('index.html');
  });
});

const bracketSlots = document.querySelectorAll('.bracketSlot');

bracketSlots.forEach(element => {
  var num = Math.random() * 100;
  element.innerHTML = Math.trunc(num);
});
