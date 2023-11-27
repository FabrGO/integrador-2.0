const {DataTypes} = require('sequelize')
// Arquivo que faz da API com o banco de dados
const db = require('../db/conn')

const User = db.define('Users', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
});

module.exports = User;