const Post = require('../models/Post')
const User = require('../models/User')

const { Op } = require("sequelize")

module.exports = class PostController{


 static async showPost(req, res){


  return res.render('partials/section')//mostrando um view
 }
}