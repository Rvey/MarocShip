const express = require('express')
const admin = express.Router()
const { loginAdmin  } = require('../controllers/admin.controller')

admin.post('/login', loginAdmin);
module.exports = admin