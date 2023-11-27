//importações de dependencias e frameworks
const express = require("express")
const handlebars = require("express-handlebars")
//inicialização do express
const app = express()
//arquivo que tem a conexão com o banco de dados
const conn = require("./db/conn")

//cofigurações do handlebars
const hbs = handlebars.create({
    partialsDir: ["views/partials"]
})

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")

//configuração para o envio de dados
app.use(express.urlencoded({ extended:true }))
app.use(express.json())


app.get("/", (req, res) => {
    res.render("publications/home")
})

conn
  .sync()
  .then(() => {
    app.listen(3333)
    console.log(`Servidor Ativo`)
  })
  .catch((err) => console.log(`erro no servidor`))