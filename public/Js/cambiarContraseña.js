const mostrarMensaje = (mensaje, isError = true) => {
const mensajeEl = document.querySelector('#mensaje');
mensajeEl.classList.toggle('text-danger', isError);
mensajeEl.classList.toggle('text-success', !isError);
mensajeEl.innerHTML = mensaje;
setTimeout(() => { mensajeEl.innerHTML = ''; }, 5000);
      };
      document.getElementById('cancelarCambio').addEventListener('click', function () {
          window.location.href = 'index.html';
      });

      document.getElementById('formEditContraseña').addEventListener('submit', async (event) => {
          event.preventDefault();

          const nombre_usuario = document.getElementById('nombre_usuario').value.trim();
          const viejaContrasenia = document.getElementById('viejaContrasenia').value.trim();
          const nuevaContrasenia = document.getElementById('nuevaContrasenia').value.trim();

          if (!nombre_usuario || !viejaContrasenia || !nuevaContrasenia) {
              mostrarMensaje('Todos los campos son obligatorios.');
              return;
          }

          if (viejaContrasenia === nuevaContrasenia) {
              mostrarMensaje('La nueva contraseña debe ser diferente de la anterior.');
              return;
          }

          try {
              const response = await fetch('/editar', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ nombre_usuario, viejaContrasenia, nuevaContrasenia })
              });

              const data = await response.json();
              if (response.ok) {
                  mostrarMensaje('Contraseña actualizada exitosamente.', false);
                  setTimeout(() => window.location.href = 'index.html', 2000);
              } else {
                  mostrarMensaje(data.mensaje || 'Error al cambiar la contraseña.');
              }
          } catch (error) {
              console.error(error);
              mostrarMensaje('Error de conexión con el servidor.');
          }
      });