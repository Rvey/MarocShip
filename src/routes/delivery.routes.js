const express = require('express')
const delivery = express.Router()
const { index , show , store , destroy , update  } = require('../controllers/delivery.controller')
const auth = require('../middleware/auth.middleware')

delivery.get('/', index);
delivery.get('/:id', show);
delivery.post('/', store);
delivery.delete('/:id', destroy);
delivery.put('/:id', update)

module.exports = delivery