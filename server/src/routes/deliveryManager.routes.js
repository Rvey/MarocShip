const express = require('express')
const deliveryManager = express.Router()
const { index , show , store , destroy , update , loginDeliveryManager, resetPassword } = require('../controllers/deliveryManager.controller')

const managerAuth = require('../middleware/managerAuth.middleware')

deliveryManager.get('/',managerAuth, index);
deliveryManager.get('/:id',managerAuth, show);
deliveryManager.post('/',managerAuth, store);
deliveryManager.post('/login', loginDeliveryManager);
deliveryManager.delete('/:id',managerAuth, destroy);
deliveryManager.put('/:id',managerAuth, update)
deliveryManager.post('/resetPassword', resetPassword)
module.exports = deliveryManager