const User = require("../models/User")

const bcrypt = require('bcryptjs')

mudule.exports = class UserController {

    static register(req, res){
        return res.render('partials/register')
      }

    static async registerPost(req, res){
        // Passando dados no corpo da requisação
        const {name, email, password, confirmpassword} = req.body

    //1° - validação de senha - password math
    if(password != confirmpassword){
      //menssagem infromado o usuario ao problema e rederocionando o usuario ao uma rota
      req.flash('message', 'As senhas não conferem, tente novamente')
      res.render('home')
      return
    }

    //2° - validação de email -
    const checkedIfExists = await User.findOne({where:{email:email}})
    if(checkedIfExists){
        req.flash('message', 'O e-mail ja esta em uso, tente novamente')
      res.render('home')
      return
    }

    //3° - criptografia do password -
    // salt = quantidade de caracateres extras na cript.
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    //4° - criar usuário no banco
    const user = {
      name,
      email,
      password:hashedPassword
    }

    try {
      //5° - regra de negócio do app
      const createdUser = await User.create(user)
      req.flash('message', 'cadastro realizado com sucesso')
      req.session.userId = createdUser.id


      req.session.save(()=>{
        res.redirect('/')
      })
      // return

    }catch (error) {
      console.log(error)
    }

  }
    }