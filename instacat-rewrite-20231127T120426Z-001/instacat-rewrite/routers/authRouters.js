const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)


module.exports = router