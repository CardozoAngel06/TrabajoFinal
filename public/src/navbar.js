const navbar = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary p-0">
    <div class="container-fluid bg-dark">
      <h3 class="navbar-brand text-light fs-3">Tienda Online</h3>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <h4><a class="nav-link active text-warning" aria-current="page" href="index.html">Inicio</a></h4>
          </li>
          <li class="nav-item">
            <h4><a class="nav-link active text-warning" aria-current="page" href="productos.html">Productos</a></h4>
          </li>
          <li class="nav-item">
            <h4><a class="nav-link active text-warning" aria-current="page" href="contacto.html">Contactos</a></h4>
          </li>
        </ul>
        <form class="d-flex text-light" role="search">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle text-light fs-5"> 
                  ${localStorage.getItem('nombre_usuario') === 'Administrador' ? 'Administrador' : (localStorage.getItem('nombre_usuario') || 'Usuario')}
                </i>
              </a>

              <ul class="dropdown-menu bg-dark fs-5">
                <li><a class="dropdown-item text-warning" id="btnCambiarContrasena" onClick="window.location.href='cambiarContraseña.html'">Cambiar Contraseña</a></li>
                <li><a class="dropdown-item text-warning" onClick="window.location.href='eliminarCuenta.html'">Eliminar Cuenta</a></li>
              </ul>
            </li>
          </ul>
        </form>
        <button class="btn btn-primary btn-lg" type="button" id="btnIngresar" style="width: 100px;" onClick="window.location.href='login.html'">Ingresar</button>
        <!-- Botón de Salir (invisible al principio) -->
        <button class="btn btn-primary btn-lg" type="button" id="btnSalir" style="width: 100px; display:none;">Salir</button>
      </div>
    </div>
  </nav>
`;

export { navbar };
