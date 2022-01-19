const express = require('express')
const manager = express.Router()
const { index , show , store , destroy , update , loginManager } = require('../controllers/manager.controller')
const adminAuth = require('../middleware/adminAuth.middleware')

manager.get('/',adminAuth, index);
manager.get('/:id',adminAuth, show);
manager.post('/',adminAuth, store);
manager.post('/login', loginManager);
manager.delete('/:id',adminAuth, destroy);
manager.put('/:id',adminAuth, update)

module.exports = manager