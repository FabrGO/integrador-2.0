const {DataTypes} = require('sequelize')

const db = require('../db/conn')
const UserProfile = require('./UserProfilr')

const App = db.define('App', {
  title: {
    type: DataTypes.STRING,
    allowNull:false,
    require:true
  }
})

//1 - N
App.belongsTo(UserProfile)
UserProfile.hasMany(App)

module.exports = App