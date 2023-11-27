const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require("sequelize")

module.exports = class ToughtController{


 static async showToughts(req, res){

  let search = '';

  if(req.query.search){
    search = req.query.search
  }

  let order = 'DESC'

  if(req.query.order === 'old'){
    order = 'ASC'
  }else{
    order = 'DESC'
  }

  const toughtsData = await Tought.findAll({
    include:User,
    where:{
      title:{[Op.like]:`%${search}%`},
    },
    order:[['createdAt', order]]
  })

  const toughts = toughtsData.map((result)=>result.get({plain:true}))

  const toughtsQty = toughts.length

  return res.render('toughts/home' , {toughts, search, toughtsQty})//mostrando um view
 }

 static async dashboard(req, res){
    const userId = req.session.userId

const user = await User.findOne({
  where:{
    id:userId
  },
  include:Tought,
  plain:true
})
  if(!user){
    res.redirect('/login')
  }

  const toughts = user.Toughts.map((result)=> result.dataValues)

  return res.render('toughts/dashboard', {toughts})
 }

   static createTought(req, res){
    return res.render('toughts/create')
}
static async createToughtSave(req, res){

  const tought = {
    title: req.body.title,
    UserId:req.session.userId
  }

  try {
    await Tought.create(tought)
    req.flash('message', 'Pensamento criado')
    req.session.save(()=>{
      res.redirect('/toughts/dashboard')
    })
  } catch (err){
    console.log(err)
  }

}

static async removeTought(req, res){
  const id = req.body.id
  const userId = req.session.userId

try {
  await Tought.destroy({where: {id:id, UserId:userId}})

  req.flash('message', 'Pensamento removido ')
  req.session.save(()=>{
    res.redirect('/toughts/dashboard')
  })



}catch(err){
  console.log(`Aconteceu um erro`)
}


}

static async editTought(req, res){
  const id = req.params.id;
  const userId = req.session.userId
  const tought = await Tought.findOne({raw:true, where: {id: id, UserId:userId}})
  return res.render('toughts/edit', {tought})
}

static async updateTought(req, res){
  const id = req.body.id
  const userId = req.session.userId
  const tought = {
      title: req.body.title
  }
  try {
    await Tought.update(tought, {where: {id: id, UserId:userId}})
    req.flash('message', 'Pensamento Atualizado ')
    req.session.save(()=>{
      res.redirect('/toughts/dashboard')
    })
  } catch{
  console.log(`Aconteceu um erro`)
  }

}

static async toggleStatus(req, res){
  const id = req.body.id
  const tought = {
      done: req.body.done === "0" ? true : false
  }
  await Tought.update(tought, {where: {id:id}})
  return res.redirect('toughts/dashboard')

}



}