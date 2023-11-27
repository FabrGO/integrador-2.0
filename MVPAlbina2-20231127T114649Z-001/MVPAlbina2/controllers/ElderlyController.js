const App = require('../models/App')
const UserProfile = require('../models/UserProfilr')


module.exports = class ElderlyController  {
  static async showApps(req, res){
    return res.render('elderlis/home') //Mostrando uma view
  }
}