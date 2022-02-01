const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/admin.model')
const logger = require('../utils/logger')
const { comparePassword } = require('../helpers/JwtValidation')

const loginAdmin = async (req, res) => {

    const { email, password } = req.body

    try {
        const existingAdmin = await Admin.findOne({ email })

        if (!existingAdmin) return res.status(404).json({ message: "Admin not found" })

        comparePassword(password, existingAdmin, res)

        logger.info(`GAdmin - email: ${existingAdmin.email} logged in`)
        // return res.status(200).json({ data: existingAdmin })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
module.exports = { loginAdmin }