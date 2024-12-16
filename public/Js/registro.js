const endpoint = '/registro'
    const formulario = document.forms['formCrearUser']
    console.log(formulario)
    formulario.addEventListener('submit', (event) => {
      event.preventDefault();
    
      let nombre_usuario = formulario.nombre_usuario.value
      let contrasenia = formulario.contrasenia.value
      let newDatos = { nombre_usuario: nombre_usuario, contrasenia: contrasenia}
      if (!newDatos.nombre_usuario || !newDatos.contrasenia) {
        document.querySelector('#mensaje').innerHTML = 'Complete todos los campos'
        return
      }
        document.querySelector('#mensaje').innerHTML = ''
    
      let nuevosDatosJson = JSON.stringify(newDatos)
      console.log(nuevosDatosJson)
      const enviarNewDatos = async() =>{ 
        try{
          const enviarDatos = await fetch(endpoint, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: nuevosDatosJson
          })
          const respuesta = await enviarDatos.json()
          console.log(respuesta)
          mostrarMensaje(respuesta.mensaje) 
          setTimeout(()=> {location.reload();},1000) 
        }
        catch(error){
          console.log(error)
        }
      }
      enviarNewDatos()
    })
    mostrarMensaje = (mensaje) => {
      document.querySelector('#mensajeBack').innerHTML = mensaje
    }