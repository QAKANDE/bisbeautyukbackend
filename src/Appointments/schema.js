const { model, Schema } = require('mongoose')

const appointmentSchema = new Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerNumber: { type: String, required: true },
    customerAddress: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    serviceRequired: { type: String, required: true },
    info: { type: String },
})

const appointmentModel = model('appointments', appointmentSchema)

module.exports = appointmentModel