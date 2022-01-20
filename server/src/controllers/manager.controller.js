const Manager = require('../models/manager.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

const index = async (req, res) => {
    try {
        const result = await Manager.find()
        if (result) {
          return  res.status(200).json(result)
        } else {
          return  res.status(400).json({ message: "No managers found" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const show = async (req, res) => {
    let id = req.params.id;
    try {
        const result = await Manager.findById(id)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
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

        res.cookie('jwt', token, { httpOnly: true })
        res.cookie('role', existingManager.role, { httpOnly: true })
        res.cookie('id', existingManager._id, { httpOnly: true })
        logger.info(`Manager email: ${existingManager.email} logged in`)
        res.status(200).json({ existingManager, token })

    } catch (error) {
        res.status(500).json({ error: err.message })
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
        logger.info(`Manager email: ${newManager.email} created By Admin`)
        res.status(200).json({ newManager, token })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}



const destroy = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    try {
        const result = await Manager.deleteOne(record)
        logger.info(`Manager with id: ${id} deleted by Admin`)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const update = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    const updatedData = { ...req.body }
    try {
        const result = await Manager.updateOne(record, updatedData)
        logger.info(`Manager with id: ${id} updated by Admin`)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
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