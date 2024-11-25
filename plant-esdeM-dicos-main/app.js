//Carregando modulos
const express = require('express');
const handlebars = require('express-handlebars')

const app = express()
const porta = 4000 

//configurar express para receber os dados do formulario
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//configurando handlebars
app.engine('handlebars', handlebars.engine({extended:true}))
app.set('view engine', 'handlebars')//definindo o handlebars como mecanismo de visualização padrão

//carregando rotas 
const medicosRouter = require('./routes/medicos')
const plantoesRouter = require('./routes/plantoes')

//ultilizando rotas 
app.use('/medicos',medicosRouter)
app.use('/plantoes',plantoesRouter)


// EXIBINDO INFORMAÇÕES NA TELA
app.get("/",(req, res)=>{
    //res.send("<h1>Tudo Funcionando</h1>")
    res.render('home')
})



//EXECUTANDO O SERVIDOR
app.listen(porta, ()=>{
    console.log("Servidor executando na porta ", porta)
})