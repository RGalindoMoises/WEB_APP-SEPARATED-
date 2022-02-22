const axios = require('axios')
const { response } = require('express');

//mostrar
module.exports.mostrarUsuarios = async (req, res) => {
    const respuesta = await axios.get('http://localhost:3000/api/usuarios/')

    if (!respuesta) {
        return res.status(500).json({
            message: 'Error al mostrar'
        })
    }
    let usuarios = respuesta.data.valor

    return res.render('index', { usuarios: usuarios })
}

//crear
module.exports.crearUsuario = async (req, res) => {

    const { data } = await axios.post('http://localhost:3000/api/usuarios/', {

        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    res.redirect('/usuarios')
}

module.exports.actualizarUsuario = async (req, res) => {

    const { data } = await axios.put(`http://localhost:3000/api/usuarios/${req.body.email_editar}`, {

        nombre: req.body.nombre_editar,
        password: req.body.password_editar

    });

    res.redirect('/usuarios')
}

module.exports.eliminarUsuario = async (req, res) => {

    const { data } = await axios.delete(`http://localhost:3000/api/usuarios/${req.params.email}`);

    res.redirect('/usuarios')
}
