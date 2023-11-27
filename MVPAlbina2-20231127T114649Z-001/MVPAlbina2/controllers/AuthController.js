const User = require('../models/User')
const UserProfile = require('../models/UserProfilr')

//criptografia a senha
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
  static login(req, res){
    return res.render('auth/login')
  }

  static async loginPost(req, res){
    const {email, password} = req.body
    //1° Match user
    const user = await User.findOne({where:{email:email}})
    if(!user){
      req.flash('message', 'Usuario não encontrado')
      res.render('auth/login')
      return
    }

    //2° validar a senha do usuario
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if(!passwordMatch){
      req.flash('message', 'Senha não encontrado')
      res.render('auth/login')
      return
    }
    req.session.userId = user.id;

    req.flash('message', 'bem vindo')

    req.session.save(()=>{
      res.redirect('/')
    })


  }



  static register(req, res){
    return res.render('auth/register')
  }

  static async registerPost(req, res){
    const {name, email, password, confirmpassword} = req.body

    //1° - validação de senha - password math
    if(password != confirmpassword){
      //menssagem infromado o usuario ao problema e rederocionando o usuario ao uma rota
      req.flash('message', 'As senhas não conferem, tente novamente')
      res.render('auth/register')
      return
    }

    //2° - validação de email -
    const checkedIfExists = await User.findOne({where:{email:email}})
    if(checkedIfExists){
      req.flash('message', 'O e-mail ja esta em uso')
      res.render('auth/register')
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

      req.session.userId = createdUser.id

      req.flash('message', 'cadastro realizado com sucesso')

      req.session.save(()=>{
        res.redirect('/')
      })
      // return

    }catch (error) {
      console.log(error)
    }

  }

  static async logout(req, res){
    req.session.destroy()
    return res.redirect('/login')
  }
}