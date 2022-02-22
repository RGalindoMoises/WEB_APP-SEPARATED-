const express = require('express')
const mongoose = require('mongoose')
const url = 

const app = express()
const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Back server UP ${port}`)
})

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB failed connection'))
db.once('open', function callback() {

    console.log('DB successful connection')

})
///////////////////////////////////////////////////////////

const usuarios = require('./routes/usuarios')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/usuarios', usuarios)

///////////////////////////////////////////////////////////

module.exports = db
