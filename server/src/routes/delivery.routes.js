const express = require('express')
const delivery = express.Router()
const { index , show , store , destroy , update, AcceptDelivery  } = require('../controllers/delivery.controller')
const deliveryManager = require('../middleware/deliveryManager.middleware')
const driverAuth = require('../middleware/driverAuth.middleware')
delivery.get('/', index);
delivery.get('/:id', show);
delivery.put('/acceptDelivery/:id',driverAuth, AcceptDelivery);
delivery.post('/',deliveryManager, store);
delivery.delete('/:id',deliveryManager, destroy);
delivery.put('/:id',deliveryManager, update)

module.exports = delivery