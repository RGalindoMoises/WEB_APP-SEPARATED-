const { json } = require('body-parser')
const express = require('express')
const route = express.Router()
const Usuario = require('../models/Usuario')

const Joi = require('joi')

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(15)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

async function crearUsuario(body) {

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
    })
    return await usuario.save()
}

async function actualizarUsuario(email, body) {

    let usuario = await Usuario.findOneAndUpdate({ email: email }, {
        $set: {
            nombre: body.nombre,
            password: body.password
        }
    }, { new: true })
    return usuario
}

async function desactivarUsuario(email) {

    let usuario = await Usuario.findOneAndUpdate({ email: email }, {
        $set: {
            estado: false
        }
    }, { new: true })
    return usuario
}

async function consultarUsuario() {

    let usuario = await Usuario.find({
        "estado": true
    })

    return usuario
}

route.get('/', (req, res) => {
    let resultado = consultarUsuario()
    resultado.then(user => {
        res.json({
            valor: user
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
})

route.post('/', (req, res) => {
    let body = req.body

    const { error, value } = schema.validate({
        nombre: body.nombre,
        email: body.email,
        password: body.password
    })

    if (!error) {
        let resultado = crearUsuario(body)

        resultado.then(user => {
            res.json({
                valor: user
            })
        }).catch(err => {
            res.status(400).json({
                error: err
            })
        })
    } else {
        res.status(400).json({
            error: error
        })
    }
})

route.put('/:email', (req, res) => {

    const { error, value } = schema.validate({
        nombre: req.body.nombre,
        password: req.body.password
    })
    if (!error) {
        let resultado = actualizarUsuario(req.params.email, req.body)
        resultado.then(user => {
            res.json({
                valor: user
            })
        }).catch(err => {
            res.status(400).json({
                error: err
            })
        })
    } else {
        res.status(400).json({
            error: error
        })
    }
})

route.delete('/:email', (req, res) => {

    let resultado = desactivarUsuario(req.params.email)

    resultado.then(user => {
        res.json({
            valor: user
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
})

module.exports = route