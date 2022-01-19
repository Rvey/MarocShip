const DeliveryManager = require('../models/deliveryManger.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const index = (req, res) => {
    DeliveryManager.find().then((result) => {
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ error: "No DeliveryManager Found" })
        }
    }).catch((err) => {
        console.log(err)
    })
}

const show = async (req, res) => {
    let id = req.params.id;
    try {
        const result = await DeliveryManager.findById(id)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}


const loginDeliveryManager = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingDeliveryManager = await DeliveryManager.findOne({ email })

        if (!existingDeliveryManager) return res.status(400).json({ message: "DeliveryManager not found" })

        const isPasswordMatch = await bcrypt.compare(password, existingDeliveryManager.password);

        if (!isPasswordMatch) return res.status(400).json({ message: "Password is incorrect" })

        const token = jwt.sign({ id: existingDeliveryManager._id, email: existingDeliveryManager.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })

        res.status(200).json({ existingDeliveryManager, token })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const store = async (req, res) => {
    const { email, firstName, lastName, password } = req.body
    try {
        if (!email || !firstName || !lastName || !password) return res.status(400).json({ message: "Please fill all the fields" })

        const existingDeliveryManager = await DeliveryManager.findOne({ email })

        if (existingDeliveryManager) return res.status(400).json({ message: "DeliveryManager already exists" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const newDeliveryManager = await DeliveryManager.create({ email, name: `${firstName} ${lastName}`, password: hashedPassword })

        const token = jwt.sign({ id: newDeliveryManager._id, email: newDeliveryManager.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })

        res.status(200).json({newDeliveryManager, token})

    } catch (err) {
        res.status(400).json({ message: err })
    }

}

const destroy = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    try {
        const result = await DeliveryManager.deleteOne(record)
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
        const result = await DeliveryManager.updateOne(record, updatedData , {
            new: true,
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

module.exports = {
    index,
    show,
    store,
    loginDeliveryManager,
    destroy,
    update
}