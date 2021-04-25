const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const services = require('../src/Services/index')
const appointments = require('../src/Appointments/index')
const server = express()

const port = process.env.PORT || 3003

server.use(cors())
server.use(express.json())
server.use('/services', services)
server.use('/appointments', appointments)

mongoose
    .connect('mongodb://localhost:27017/bisbeautyuk', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(
        server.listen(port, () => {
            console.log('Server is running on port', port)
        }),
    )
    .catch((err) => console.log(err))