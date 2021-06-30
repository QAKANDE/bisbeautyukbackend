const express = require('express')
const router = express.Router()
const appointmentModel = require('../Appointments/schema')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const nodemailer = require('nodemailer')

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
        const { customerName, customerEmail } = req.body
        if (newAppointment) {
            const msg = {
                to: customerEmail,
                from: 'bpolufade@hotmail.com',
                subject: 'New Appointment',
                html: `
                <div>
                Dear ${customerName},
                <p>You have paid an advance fee of £15 for ${serviceRequired}.</p>
                <p>Thank you for your patronage</p>
                <h2>BISBEAUTYUK</h2>
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

router.post('/feedback', async(req, res) => {
    try {
        const msg = {
            to: 'quadriomofolarinakande@gmail.com',
            from: 'bpolufade@hotmail.com',
            subject: 'New Appointment',
            html: `
            <div>
            Dear },
            <p>You have paid an advance fee of £15 for }.</p>
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
    } catch (error) {
        console.log(error)
    }
})

// router.get('/calender', async(req, res) => {
//     try {
//         const monday = []
//         const tuesday = []
//         const wednesday = []
//         const thursday = []
//         const friday = []
//         const saturday = []
//         const sunday = []
//         const currMonth = new Date().getMonth() + 1
//         const currentMonth = currMonth.toLocaleString('default', { month: 'long' })
//         const datesArray = []
//         const daysArray = []
//         const month = new Date().getMonth()
//         const year = new Date().getFullYear()
//         var date = new Date(year, month, 1)
//         var days = []
//         while (date.getMonth() === month) {
//             days.push(new Date(date))
//             date.setDate(date.getDate() + 1)
//         }

//         days.map((d) => {
//             return datesArray.push({
//                 number: d.getDate(),
//                 day: d.toLocaleString('en-us', { weekday: 'long' }),
//             })
//         })

//         const mon = datesArray.filter((d) => d.day === 'Monday')
//         const tues = datesArray.filter((d) => d.day === 'Tuesday')
//         const wed = datesArray.filter((d) => d.day === 'Wednesday')
//         const thurs = datesArray.filter((d) => d.day === 'Thursday')
//         const fri = datesArray.filter((d) => d.day === 'Friday')
//         const sat = datesArray.filter((d) => d.day === 'Saturday')
//         const sun = datesArray.filter((d) => d.day === 'Sunday')
//         mon.map((m) => {
//             return monday.push({
//                 number: m.number,
//             })
//         })
//         tues.map((m) => {
//             return tuesday.push({
//                 number: m.number,
//             })
//         })
//         wed.map((m) => {
//             return wednesday.push({
//                 number: m.number,
//             })
//         })
//         thurs.map((m) => {
//             return thursday.push({
//                 number: m.number,
//             })
//         })
//         fri.map((m) => {
//             return friday.push({
//                 number: m.number,
//             })
//         })
//         sat.map((m) => {
//             return saturday.push({
//                 number: m.number,
//             })
//         })
//         sun.map((m) => {
//             return sunday.push({
//                 number: m.number,
//             })
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

module.exports = router