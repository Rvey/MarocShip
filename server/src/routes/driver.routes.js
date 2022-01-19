const express = require('express')
const driver = express.Router()
const { index, show, store, destroy, update, loginDriver, validateDriver, driverBonus } = require('../controllers/driver.controller')
const deliveryManager = require('../middleware/deliveryManager.middleware')
const adminAuth = require('../middleware/adminAuth.middleware')
const driverAuth = require('../middleware/driverAuth.middleware')
const upload = require('../middleware/upload.middleware')

driver.get('/',deliveryManager, index);
driver.get('/:id',deliveryManager, show);
driver.post('/',upload, store);
driver.post('/login', loginDriver);
driver.delete('/:id',deliveryManager, destroy);
driver.put('/validateDriver/:id',adminAuth, validateDriver);
driver.put('/driverBonus/:id',driverAuth, driverBonus);
driver.put('/:id',deliveryManager, update)

module.exports = driver