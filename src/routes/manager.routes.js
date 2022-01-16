const express = require('express')
const manager = express.Router()
const { index , show , store , destroy , update , loginManager } = require('../controllers/manager.controller')
const auth = require('../middleware/auth.middleware')

manager.get('/',auth, index);
manager.get('/:id', show);
manager.post('/', store);
manager.post('/login', loginManager);
manager.delete('/:id', destroy);
manager.put('/:id', update)

module.exports = manager