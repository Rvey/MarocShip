const express = require('express')
const driver = express.Router()
const { index, show, store, destroy, update, loginDriver, validateDriver } = require('../controllers/driver.controller')
const auth = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')

driver.get('/', index);
driver.get('/:id', show);
driver.post('/', upload, store);
driver.post('/login', loginDriver);
driver.delete('/:id', destroy);
driver.put('/validateDriver/:id', validateDriver);
driver.put('/:id', update)

module.exports = driver