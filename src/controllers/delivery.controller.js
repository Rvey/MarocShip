const Delivery = require('../models/delivery.model')


const index = (req, res) => {
    Delivery.find().then((result) => {
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ error: "No manager Found" })
        }
    }).catch((err) => {
        console.log(err)
    })
}

const show = async (req, res) => {
    let id = req.params.id;
    try {
        const result = await Delivery.findById(id)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

const store = async (req, res) => {
    const { delivery, method, price, destination } = req.body
    try {
        if (!delivery || !method || !price || !destination) return res.status(400).json({ message: "Please fill all the fields" })

        const newDelivery = await Delivery.create({ ...req.body })

        res.status(200).json(newDelivery)
    } catch (err) {
        res.status(400).json({ message: err })
    }

}



const destroy = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    try {
        const result = await Delivery.deleteOne(record)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

const update = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    const updatedData = { ...req.body }
    try {
        const result = await Delivery.updateOne(record, updatedData)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

module.exports = {
    index,
    show,
    store,
    destroy,
    update
}