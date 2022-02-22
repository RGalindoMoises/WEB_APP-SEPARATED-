const mongoose = require('mongoose')
const { stringify } = require('querystring')

const usuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)