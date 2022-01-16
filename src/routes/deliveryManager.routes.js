const express = require('express')
const deliveryManager = express.Router()
const { index , show , store , destroy , update , loginDeliveryManager } = require('../controllers/deliveryManager.controller')
const auth = require('../middleware/auth.middleware')

deliveryManager.get('/', index);
deliveryManager.get('/:id', show);
deliveryManager.post('/', store);
deliveryManager.post('/login', loginDeliveryManager);
deliveryManager.delete('/:id', destroy);
deliveryManager.put('/:id', update)

module.exports = deliveryManager