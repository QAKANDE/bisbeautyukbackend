const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const services = require('../src/Services/index')
const appointments = require('../src/Appointments/index')

const server = express()

const environment = server.get('env')

const port = process.env.PORT || 3003

server.use(cors())
server.use(express.json())
server.use(logger('dev'))
server.use(bodyParser.json())
server.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
server.use(cookieParser())
server.use('/services', services)
server.use('/appointments', appointments)

if (environment === 'production') {
    server.use(function(err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: {},
        })
    })
} else {
    // development error handler
    // will print stacktrace
    server.use(function(err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err,
        })
    })
}

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