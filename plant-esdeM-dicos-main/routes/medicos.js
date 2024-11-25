const express = require('express')
const router = express.Router()//modulo  que irá operar com as rotas

const medicos = require('../models/medicos')
const plantoes = require('../models/plantoes')
const {where} = require('sequelize')

//criando rotas
//1ª rota - inserir dados na tabela

router.post('/store', async (req, res) => {
    const produto = await medicos.create({
        nome: req.body.nome,
        especialidade: req.body.especialidade,
        contato: req.body.contato,
        email: req.body.email

    })

    if(produto){
        res.redirect('/')
    }
    else{
        res.json({erro:"Não foi possível cadastrar"})
    }
})

//2ª rota - mostrar pagina raiz
router.get('/show', async (req, res)=>{
    res.render('medicos/index')
})

//3ª rota - consultar dados a tabela
router.get('/', async(req,res)=>{
    let produto = await medicos.findAll()
    if(produto){
        console.log(produto)
        res.render('medicos/index',{dados:produto})
    }
    else{
        res.json({erro:"Não foi possível carregar dados"})
    }
})

//4ª rota - deletar dados da tabela por id
router.get('/destroy/:id', async(req,res)=>{
    const produto = await medicos.destroy({
        where:{
            id:req.params.id
        }
    })
    res.redirect('/medicos')
})

//5ª - exibir formulario de cadastro
router.get('/create',async(req, res) => {
    let produto = await medicos.findAll()
    if(produto){
        console.log(produto)
        res.render('medicos/addMedicos',{dados:produto})
    }
    else{
        console.log("Não foi possivel exibir os dados")
        res.redirect('/')
    }
})
module.exports = router