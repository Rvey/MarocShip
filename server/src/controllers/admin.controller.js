const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/admin.model')

const loginAdmin = async (req, res) => {

    const { email, password } = req.body

    try {
        const existingAdmin = await Admin.findOne({ email })

        if (!existingAdmin) return res.status(400).json({ message: "Admin not found" })

        const isPasswordMatch = password === existingAdmin.password;

        if (!isPasswordMatch) return res.status(400).json({ message: "Password is incorrect" })

        const token = jwt.sign({ id: existingAdmin._id, email: existingAdmin.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })

        res.status(200).json({ existingAdmin, token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {loginAdmin}