const endpoint = '/login';
const formulario = document.forms['formIniciarUser'];

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    let nombre_usuario = formulario.nombre_usuario.value;
    let contrasenia = formulario.contrasenia.value;
    let newDatos = { nombre_usuario: nombre_usuario, contrasenia: contrasenia };

    if (!newDatos.nombre_usuario || !newDatos.contrasenia) {
        document.querySelector('#mensaje').innerHTML = 'Complete todos los campos';
        return;
    }

    document.querySelector('#mensaje').innerHTML = '';

    let nuevosDatosJson = JSON.stringify(newDatos);
    console.log(nuevosDatosJson);

    const enviarNewDatos = async () => { 
        try {
            const enviarDatos = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: nuevosDatosJson
            });

            const respuesta = await enviarDatos.json();
            console.log(respuesta);
            if (respuesta.mensaje) {
                mostrarMensaje(respuesta.mensaje, 'error');
                return;
            }

            if (respuesta.success) {
                localStorage.setItem('nombre_usuario', respuesta.usuario.nombre_usuario);
                mostrarMensaje(respuesta.success, 'success');
                setTimeout(() => {
                    window.location.href = './index.html'; 
                }, 1000);
            }

        } catch (error) {
            console.log(error);
        }
    };
    enviarNewDatos();
});

function mostrarMensaje(mensaje, tipo = 'success') {
    const mensajeBack = document.querySelector('#mensajeBack');
    mensajeBack.innerHTML = mensaje;

    if (tipo === 'error') {
        mensajeBack.style.color = 'red';
    } else {
        mensajeBack.style.color = 'green';
    }
}
