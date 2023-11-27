const {Sequelize} = require('sequelize')

// nome banco/ nome usuário/ senha
const sequelize = new Sequelize('elderly','root','Sen@iDev77!.',{
    host:'127.0.0.1',
    port:3306,
    dialect:'mysql'
})
try{
    sequelize.authenticate()
    console.log('Conectado ao   MySQL!')
}catch(err){
    console.log('Não foi posivel conectar com o banco:' +error)
}

module.exports = sequelize