const express = require('express')
const admin = express.Router()
const { loginAdmin  } = require('../controllers/admin.controller');
const auth = require('../middleware/auth.middleware');

admin.post('/login', loginAdmin);
admin.get('/',auth, (req, res) => {
    res.send('Admin')
})

module.exports = admin