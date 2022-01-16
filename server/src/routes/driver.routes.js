const express = require('express')
const driver = express.Router()
const { index , show , store , destroy , update , loginDriver } = require('../controllers/driver.controller')
const auth = require('../middleware/auth.middleware')

driver.get('/', index);
driver.get('/:id', show);
driver.post('/', store);
driver.post('/login', loginDriver);
driver.delete('/:id', destroy);
driver.put('/:id', update)

module.exports = driver