const express = require('express')
const router = express.Router()

//Importar o controlador de pensamentos tought
const PostController = require('../controllers/PostController')




router.get('/register', PostController.showPost)



//exportar a rota
module.exports = router