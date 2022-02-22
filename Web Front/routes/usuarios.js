const { json } = require('body-parser')
const express = require('express')

const usuarioHelper = require('../helpers/usuarioHelper')

const route = express.Router()

route.get('/', usuarioHelper.mostrarUsuarios)

route.post('/crear', usuarioHelper.crearUsuario)

route.post('/editar', usuarioHelper.actualizarUsuario)

route.get('/borrar/:email', usuarioHelper.eliminarUsuario)

module.exports = route

