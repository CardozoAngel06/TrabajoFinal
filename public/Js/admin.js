const endpoint = 'productos';
let prodRecibidos = [];

fetch(endpoint)
  .then(respuesta => respuesta.json())
  .then(datos => {
    prodRecibidos = datos;
    mostrarProductos(datos);
});

const mostrarProductos = (productos) => {
  let productosHTML = `<div class="row g-4 justify-content-center">`;

  productos.forEach((dato) => {
    productosHTML += `
      <div class="card border border-1 border-dark d-flex flex-column align-items-center"
           style="width: 100%; max-width: 300px; margin:30px;">
        <img src="${dato.imagen}" class="card-img-top" alt="${dato.titulo}" 
             style="width: 100%; max-height: 200px; object-fit: contain;">
        <div class="card-body">
          <h4 class="text-center">${dato.titulo}</h4>
          <p class="card-text text-center">${dato.descripcion}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center w-100 mb-2 px-2 fs-5">
          <p class="card-text p-2 mb-0"><strong>$${dato.precio}</strong></p>
          <div class="d-flex ms-auto">
            <a class="btn btn-outline-primary me-2" onClick="editar(${dato.id})">
              <i class="bi bi-pencil"></i>
            </a>
            <a class="btn btn-outline-danger" onClick="eliminar(${dato.id})">
              <i class="bi bi-trash"></i>
            </a>
          </div>
        </div>
      </div>`;
  });

  productosHTML += `</div>`;
  const contenedor = document.querySelector("#contenedor");
  contenedor.className = "d-flex flex-wrap justify-content-center align-items-center min-vh-100";
  contenedor.innerHTML = productosHTML;
};

const añadir = () => {
  document.querySelector("#nuevoProd").style.display = 'block';
  const formulario = document.forms['formCrear'];

  formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    let titulo = formulario.titulo.value;
    let descripcion = formulario.desc.value;
    let precio = formulario.precio.value;
    let imagen = "imagenes/Camiseta Boca Juniors - Oficial.jpg";

    let newDatos = { titulo: titulo, imagen: imagen, descripcion: descripcion, precio: precio };

    if (!newDatos.titulo || !newDatos.descripcion || !newDatos.precio) {
      document.querySelector('#mensaje').innerHTML = 'Complete todos los campos';
      return;
    }
    document.querySelector('#mensaje').innerHTML = '';

    let nuevosDatosJson = JSON.stringify(newDatos);

    const enviarNewProducto = async () => {
      try {
        const enviarDatos = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: nuevosDatosJson,
        });
        
        const respuesta = await enviarDatos.json();
        console.log(respuesta);
        document.querySelector('#formCrear').style.display = 'none';
        mostrarMensaje(respuesta.mensaje);
        setTimeout(() => { location.reload(); }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    enviarNewProducto();
  });
};

const mostrarMensaje = (mensaje) => {
  document.querySelector('#mensajeBack').innerHTML = mensaje;
};

const editar = (id) => {
  document.querySelector("#editar").style.display = 'block';
  const formEditar = document.forms['form-editar'];
  formEditar.scrollIntoView({ behavior: "smooth", block: "start" });

  let prodEditar = prodRecibidos.find(prod => prod.id === id);

  if (prodEditar) {
      formEditar.id.value = prodEditar.id;
      formEditar.titulo.value = prodEditar.titulo;
      formEditar.desc.value = prodEditar.descripcion;
      formEditar.precio.value = prodEditar.precio;
  }

  formEditar.addEventListener('submit', (event) => {
      event.preventDefault();

      const nuevosDatos = {
          titulo: formEditar.titulo.value,
          descripcion: formEditar.desc.value,
          precio: formEditar.precio.value
      };

      if (!nuevosDatos.titulo || !nuevosDatos.descripcion || !nuevosDatos.precio) {
          document.querySelector('#mensajeEditar').innerHTML = 'Complete todos los campos';
          return;
      }

      document.querySelector('#mensajeEditar').innerHTML = '';

      const nuevosDatosJson = JSON.stringify(nuevosDatos);

      const enviarNuevosDatos = async () => {
          try {
              const enviarDatos = await fetch(endpoint + '/' + id, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: nuevosDatosJson
              });

              const respuesta = await enviarDatos.json();
              mostrarMensaje(respuesta.mensaje);
          } catch (error) {
              mostrarMensaje('Error al modificar datos');
          }

          setTimeout(() => { location.reload(); }, 1000);
      };

      enviarNuevosDatos();
  });
};

const eliminar = (id) => {
  if (confirm('¿Seguro que desea eliminar el producto?')) {
    const eliminarProd = async () => {
      try {
        const res = await fetch(endpoint + '/' + id, {
          method: 'DELETE'
        });
        const respuesta = await res.json();
        mostrarMensaje(respuesta.mensaje);
      } catch {
        mostrarMensaje('Error al eliminar producto :(');
      }
      setTimeout(() => { location.reload(); }, 1000);
    };
    eliminarProd();
  }
};

const cerrarFormulario = (id) => {
  document.getElementById(id).style.display = "none";
};
