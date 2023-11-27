const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const Filestore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//Models import
const App = require('./models/App')
const User = require('./models/User')
const UserProfile = require('./models/UserProfilr')

//Importar rotas
const elderlyRoutes = require('./routes/elderlyRoutes')
const authRoutes = require('./routes/authRoutes')

//Importar controlador responsavel pela home
const ElderlyController = require('./controllers/ElderlyController')

//Import Engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Import json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Import middleware para controle de sessões
app.use(session({
  name: "session",
  secret: "nosso_segredo",
  resave: false,
  saveUninitialized: false,
  store: new Filestore({
    logFn: function () { },
    path: require('path').join(require('os').tmpdir(), 'sessions')
  }),
  cookie: {
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true
  }
}))

//Import as flash messagens
app.use(flash())

//import static files
app.use(express.static('public'))

//Middleware para armazenar sessões na resposta
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session
  }
  next()
})



//Rotas
app.use('/elderly', elderlyRoutes)
app.use('/', authRoutes)

app.get('/', ElderlyController.showApps)

conn
  .sync()
  .then(() => {
    app.listen(3333)
    console.log(`Servidor Ativo`)
  })
  .catch((err) => console.log(`erro no servidor`))