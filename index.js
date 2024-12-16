//modulos
const express = require('express');
const env = require('dotenv/config')
const db = require('./db/conexion') // requiere la funcion conexion, no es el archivo js
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const cors = require('cors')
const app = express();
const port = process.env.MYSQL_ADDON_PORT || 2006;

//Middleware
app.use(express.json())
app.use(express.static('./public')) //Ejecuta directamente el front al correr el servidor
app.use(cors())

app.get('/productos', (req, res) => {
    // res.send('Listado de productos')
    const sql = "SELECT * FROM productos"
    db.query(sql, (err, result) => {
     if(err){
         console.error('Error de lectura de productos')
         return;
     }
     console.log(result)
     res.json(result)
    })
 })

 app.post('/editar', (req, res) => {
    const { nombre_usuario, nuevaContrasenia } = req.body;
    const sqlSelect = 'SELECT contrasenia FROM usuarios WHERE nombre_usuario = ?';
    db.query(sqlSelect, [nombre_usuario], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: "Error en el servidor." });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado." });
        }
        const sqlUpdate = 'UPDATE usuarios SET contrasenia = ? WHERE nombre_usuario = ?';
        db.query(sqlUpdate, [nuevaContrasenia, nombre_usuario], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ mensaje: "Error al actualizar la contraseña." });
            }
            res.status(200).json({ mensaje: "Contraseña actualizada exitosamente." });
        });
    });
});
 
app.get('/productos/:id', (req, res) => {
    //res.send('Buscar producto por ID')
    const datos = leerDatos();
    const prodEncontrado= datos.productos.find ((p) => p.id == req.params.id)
    if (!prodEncontrado) {
        return res.status(404).json(`No se encuentra el producto`)
    }
    res.json({
        mensaje: "producto encontrado",
        producto: prodEncontrado
    })
})

app.post('/productos', (req, res) => {
    //res.send('Guardando nuevo producto')
    console.log(Object.values(req.body))
    const values = Object.values(req.body)
    const sql = "INSERT INTO productos (titulo, imagen, descripcion, precio) values (?,?,?,?)"
    db.query(sql, values, (err, result) => {
        if(err){
            console.error("Error al guardar")
        }
        console.log(result)
        res.json({mensaje:"Producto agregado correctamente"})
       
    })
})

app.post('/eliminar', (req, res) => {
    const { nombre_usuario, contrasenia } = req.body;
    const sql = 'DELETE FROM usuarios WHERE nombre_usuario = ? AND contrasenia = ?';
    db.query(sql, [nombre_usuario, contrasenia], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error interno del servidor.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario o contraseña incorrectos.' });
        }
        res.status(200).json({ mensaje: 'Cuenta eliminada exitosamente.' });
    });
});

app.put('/productos/:id', (req, res) => {
    const { id } = req.params; 
    const { titulo, imagen, descripcion, precio } = req.body;
    const valores = [titulo, imagen, descripcion, precio, id];
    const sql = "UPDATE productos SET titulo = ?, imagen = ?, descripcion = ?, precio = ? WHERE id = ?";
    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error('Error al modificar el producto', err);
            return res.status(500).json({ mensaje: 'Error al modificar el producto' });
        }
        res.json({ mensaje: 'Producto actualizado correctamente', data: result });
    });
});

app.delete('/productos/:id', (req, res) => {
    // res.send('Eliminando Producto')
    const id=req.params.id;
    const sql = "DELETE FROM productos WHERE id=?"
    db.query(sql, [id], (err, result) => {
        if(err){
            console.error("Error al eliminar")
        }
        console.log(result)
        res.json({mensaje:"Producto eliminado correctamente"})
    })
})

app.post('/registro', (req, res) => {
    const values = Object.values(req.body);
    const sql = "INSERT INTO usuarios (nombre_usuario, contrasenia) values (?,?)";
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al guardar");
        }
        console.log(result);
        res.json({ mensaje: "Registro agregado correctamente" });
    });
});

app.post('/login', (req, res) => {
    const { nombre_usuario, contrasenia } = req.body;
    const sql = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasenia = ?";
    const values = [nombre_usuario, contrasenia];

    db.query(sql, values, (err, result) => {
        if (result.length > 0) {
            res.json({ success: 'Inicio de sesión correctamente', usuario: result[0] });
        } else {
            res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }
    });
});
 app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM usuarios WHERE id=?";
    db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error al eliminar usuario', err);
                return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
            }
            console.log(result);
            res.json({ success: "Usuario eliminado correctamente" });
        });
    });
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});