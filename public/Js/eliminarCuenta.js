document.getElementById('cancelarCambio').addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('formEliminarUser').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nombre_usuario = document.getElementById('nombre_usuario').value.trim();
  const contrasenia = document.getElementById('contrasenia').value.trim();

  if (!nombre_usuario || !contrasenia) {
      mostrarMensaje('Complete todos los campos', true);
      return;
  }

  try {
      const response = await fetch('/eliminar', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre_usuario, contrasenia }),
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.removeItem('nombre_usuario');
          mostrarMensaje(data.mensaje, false);
          setTimeout(() => {
              window.location.href = 'index.html';
          }, 2000);
      } else {
          mostrarMensaje(data.mensaje, true);
      }
  } catch (error) {
      console.error('Error en la conexión:', error);
      mostrarMensaje('Error al eliminar la cuenta.', true);
  }
});

const mostrarMensaje = (mensaje, isError = true) => {
  const mensajeEl = document.querySelector('#mensaje');
  mensajeEl.classList.toggle('text-danger', isError);
  mensajeEl.classList.toggle('text-success', !isError);
  mensajeEl.innerHTML = mensaje;
  setTimeout(() => {
      mensajeEl.innerHTML = '';
  }, 2000);
};
