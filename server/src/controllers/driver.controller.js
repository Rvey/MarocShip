const Driver = require('../models/driver.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const index = (req, res) => {
    Driver.find().then((result) => {
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ error: "No driver Found" })
        }
    }).catch((err) => {
        console.log(err)
    })
}

const show = async (req, res) => {
    let id = req.params.id;
    try {
        const result = await Driver.findById(id)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}


const loginDriver = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingDriver = await Driver.findOne({ email })

        if (!existingDriver) return res.status(400).json({ message: "Driver not found" })

        const isPasswordMatch = await bcrypt.compare(password, existingDriver.password);

        if (!isPasswordMatch) return res.status(400).json({ message: "Password is incorrect" })

        const token = jwt.sign({ id: existingDriver._id, email: existingDriver.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })

        res.status(200).json({ existingDriver, token })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const store = async (req, res) => {
    const { email, firstName, lastName, password } = req.body
    try {
        if (!email || !firstName || !lastName || !password) return res.status(400).json({ message: "Please fill all the fields" })

        const existingDriver = await Driver.findOne({ email })

        if (existingDriver) return res.status(400).json({ message: "Driver already exists" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const newDriver = await Driver.create({ email, name: `${firstName} ${lastName}`, password: hashedPassword })

        const token = jwt.sign({ id: newDriver._id, email: newDriver.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })

        res.status(200).json({newDriver, token})

    } catch (err) {
        res.status(400).json({ message: err })
    }

}



const destroy = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    try {
        const result = await Driver.deleteOne(record)
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
        const result = await Driver.updateOne(record, updatedData , {
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
    loginDriver,
    destroy,
    update
}