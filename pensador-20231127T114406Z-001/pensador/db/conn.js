const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('tought','root', 'Sen@iDev77!.', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectado com sucesso')
}catch(err){
    console.log('Não foi possível conectar: '+err)
}

module.exports = sequelize