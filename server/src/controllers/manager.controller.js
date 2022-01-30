const Manager = require('../models/manager.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const managerEmail = require('../utils/managerEmail')
const { comparePassword } = require('../validation/validation')
const index = async (req, res) => {
    try {
        const result = await Manager.find()
        if (result) {
            return res.status(200).json(result)
        } else {
            return res.status(400).json({ message: "No managers found" })
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

        comparePassword(password, existingManager, res)

        logger.info(`Manager -  email: ${existingManager.email} logged in`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const store = async (req, res) => {
    const { email, firstName, lastName } = req.body
    try {
        if (!email || !firstName || !lastName) return res.status(400).json({ message: "Please fill all the fields" })

        const existingManager = await Manager.findOne({ email })

        if (existingManager) return res.status(400).json({ message: "Manager already exists" })

        let password = Math.random().toString(20).substring(2, 10)

        const hashedPassword = await bcrypt.hash(password, 10)

        const newManager = await Manager.create({ email, firstName, lastName, password: hashedPassword })

        managerEmail(email, firstName, lastName, password)

        logger.info(`Manager email: ${newManager.email} created By Admin`)
        res.status(200).json({ newManager })

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

const resetPassword = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const manager = await Manager.findOne({ email })
        if (manager == null) return res.status(400).json({ message: "Manager not found" })
        await Manager.updateOne({ _id: manager.id }, {
            $set: {
                password: await bcrypt.hash(password, 12)
            }
        })
        logger.info(`Manager with id: ${manager.id} updated his status`)
        res.status(200).json({ _id: manager.id })
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
    resetPassword,
    update
}