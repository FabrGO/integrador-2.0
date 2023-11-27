const express = require('express')
const router = express.Router()

//Importar o controlador de pensamentos tought
const ElderlyController = require('../controllers/ElderlyController')

router.get('/', ElderlyController.showApps)

//Exportar a rota
module.exports = router