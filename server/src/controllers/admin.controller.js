const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/admin.model')
const logger = require('../utils/logger')
const { comparePassword } = require('../helpers/JwtValidation')

const loginAdmin = async (req, res) => {

    const { email, password } = req.body

    try {
        const existingAdmin = await Admin.findOne({ email })

        if (!existingAdmin) return res.status(400).json({ message: "Admin not found" })

        comparePassword(password, existingAdmin, res)

        logger.info(`GAdmin - email: ${existingAdmin.email} logged in`)
        // return res.json({ role: existingAdmin.role, email: existingAdmin.email })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = { loginAdmin }