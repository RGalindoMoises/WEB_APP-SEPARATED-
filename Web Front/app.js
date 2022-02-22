const express = require('express')
const app = express()
const port = process.env.port || 4000

const usuarios = require('./routes/usuarios')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/usuarios', usuarios)

app.set('view engine', 'ejs')
app.use(express.static('public'))

////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Server UP');
})
app.listen(port, () => {
    console.log(`Front Server Up ${port}`)
})
////////////////////////////////////////////