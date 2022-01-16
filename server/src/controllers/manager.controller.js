const Manager = require('../models/manager.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const index = (req, res) => {
    Manager.find().then((result) => {
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
        const result = await Manager.findById(id)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}


const loginManager = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingManager = await Manager.findOne({ email })

        if (!existingManager) return res.status(400).json({ message: "Manager not found" })

        const isPasswordMatch = await bcrypt.compare(password, existingManager.password);

        if (!isPasswordMatch) return res.status(400).json({ message: "Password is incorrect" })

        const token = jwt.sign({ id: existingManager._id, email: existingManager.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })

        res.status(200).json({ existingManager, token })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const store = async (req, res) => {
    const { email, firstName, lastName, password } = req.body
    try {
        if (!email || !firstName || !lastName || !password) return res.status(400).json({ message: "Please fill all the fields" })

        const existingManager = await Manager.findOne({ email })

        if (existingManager) return res.status(400).json({ message: "Manager already exists" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const newManager = await Manager.create({ email, name: `${firstName} ${lastName}`, password: hashedPassword })

        const token = jwt.sign({ id: newManager._id, email: newManager.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })

        res.status(200).json({newManager, token})

    } catch (err) {
        res.status(400).json({ message: err })
    }

}



const destroy = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    try {
        const result = await Manager.deleteOne(record)
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
        const result = await Manager.updateOne(record, updatedData)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

module.exports = {
    index,
    show,
    store,
    loginManager,
    destroy,
    update
}