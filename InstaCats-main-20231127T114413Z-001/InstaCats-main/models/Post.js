// Importando o ORM sequelize
const {DataTypes} = require('sequelize')
// Arquivo que faz da API com o banco de dados
const db = require('../db/conn')

const Post = db.define('Post', {
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
   
});

module.exports = Post;