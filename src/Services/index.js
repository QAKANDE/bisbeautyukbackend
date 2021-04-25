const express = require('express')
const router = express.Router()
const servicesModel = require('../Services/schema')

router.get('/', async(req, res) => {
    try {
        const services = await servicesModel.find()
        res.send(services)
    } catch (error) {
        console.log(error)
    }
})
router.get('/get-by-service/:id', async(req, res) => {
    try {
        const serviceFound = await servicesModel.findById(req.params.id)
        res.send(serviceFound)
    } catch (error) {
        console.log(error)
    }
})

router.post('/new-service', async(req, res) => {
    try {
        const { url, serviceName, price, pricePerHour, desc, feature } = req.body
        const newFeatureArr = []
        const featureArr = feature.split(',')
        featureArr.map((feat) => {
            newFeatureArr.push({ text: feat })
        })

        let allServices = await servicesModel.find()
        const serviceFound = allServices.filter(
            (service) => service.serviceName === serviceName,
        )
        const serviceId = serviceFound[0]._id
        let serviceById = await servicesModel.findById(serviceId)

        if (serviceById && serviceFound.length !== 0) {
            serviceById.images.push({ url })
            serviceById = await serviceById.save()
            res.send('New service image added')
        } else {
            const newService = await servicesModel.create({
                serviceName,
                price,
                pricePerHour,
                desc,
                features: newFeatureArr,
                images: [{ url }],
            })
            return res.status(201).send(newService)
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/edit-service/:id', async(req, res) => {
    try {
        const servicesToBeEdited = await servicesModel.findByIdAndUpdate(
            req.params.id,
        )
        res.send(servicesModel)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router