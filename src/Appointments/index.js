const express = require('express')
const router = express.Router()
const appointmentModel = require('../Appointments/schema')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.get('/', async(req, res) => {
    try {
        const appointments = await appointmentModel.find()
        res.send(appointments)
    } catch (error) {
        console.log(error)
    }
})

router.get('/get-by-name', async(req, res) => {
    try {
        const { customerName } = req.body
        const allAppointments = await appointmentModel.find()
        const findCustomer = allAppointments.filter(
            (appointment) => appointment.customerName === customerName,
        )
        if (findCustomer.length !== 0) {
            res.json({
                appointmentFound: findCustomer,
            })
        } else {
            res.send('No customer found')
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/new-appointment', async(req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerNumber,
            customerAddress,
            appointmentDate,
            appointmentTime,
            serviceRequired,
            info,
        } = req.body
        const newAppointment = await appointmentModel.create({
            customerName,
            customerEmail,
            customerNumber,
            customerAddress,
            appointmentDate,
            appointmentTime,
            serviceRequired,
            info,
        })
        if (newAppointment) {
            const msg = {
                to: 'quadriomofolarinakande@gmail.com',
                from: 'u1945140@uel.ac.uk',
                subject: 'New Appointment',
                html: `
                <div>
                Hello Bisola Olufade, you have a new appointment, please find details below;
                <p>From: ${customerName}</p>
                <p>Customer's email: ${customerEmail}</p>
                <p>Customer's number: ${customerNumber}</p>
                <p>Customer's address: ${customerAddress}</p>
                <p>Appointment date: ${appointmentDate}</p>
                <p>Appointment time: ${appointmentTime}</p>
                <p>Service Required: ${serviceRequired}</p>
                <p>Other Info: ${info}</p>
                </div>
                `,
            }
            sgMail
                .send(msg)
                .then(async() => {
                    res.json({
                        message: 'Appointment Details Sent',
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router