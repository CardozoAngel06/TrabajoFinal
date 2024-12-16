document.addEventListener('DOMContentLoaded', () => {
  const btnIngresar = document.getElementById('btnIngresar');
  const btnSalir = document.getElementById('btnSalir');

  checkLoginStatus();

  btnIngresar.addEventListener('click', (ingresar) => {
    ingresar.preventDefault();

    localStorage.setItem('nombre_usuario', 'UsuarioEjemplo');

    checkLoginStatus();
  });

  btnSalir.addEventListener('click', (salir) => {
    salir.preventDefault();

    localStorage.removeItem('nombre_usuario');

    checkLoginStatus();

    window.location.href = 'login.html';
  });
});

function checkLoginStatus() {
  const nombre_usuario = localStorage.getItem('nombre_usuario');
  const btnIngresar = document.getElementById('btnIngresar');
  const btnSalir = document.getElementById('btnSalir');

  if (nombre_usuario) {
    btnIngresar.style.display = 'none';
    btnSalir.style.display = 'block';
  } else {
    btnIngresar.style.display = 'block';
    btnSalir.style.display = 'none';
  }
}