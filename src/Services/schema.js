const { model, Schema } = require('mongoose')

const servicesSchema = new Schema({
    serviceName: { type: String, required: true },
    price: { type: String, required: true },
    pricePerHour: { type: String, required: true },
    desc: { type: String, required: true },
    features: [{
        text: { type: String, required: true },
    }, ],
    images: [{
        url: { type: String, required: true },
    }, ],
})

const servicesModel = model('services', servicesSchema)

module.exports = servicesModel