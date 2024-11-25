const express = require('express')
const router = express.Router()
const sequelize = require('sequelize')
const medicos = require('../models/medicos')
const plantoes = require('../models/plantoes')

// 1ª Rota - Inserir dados na tabela de plantões
router.post('/inserir', async (req, res) => {
    const resultado = await plantoes.create({
        nome_medico: req.body.nome_medico,
        especialidade: req.body.especialidade,
        data: req.body.data,
        turno: req.body.turno,
    })
    if (resultado) {
        res.redirect('/')
    } else {
        res.json({ erro: "Não foi possível cadastrar" })
    }
})

//2ª rota - Exibir pagina raiz de funcionario
router.get('/show', (req,res)=>{
    res.render('plantoes/index')
})

//3ª Rota para exibir todos os plantões com dados dos médicos
router.get('/', async (req, res) => {
    const resultado = await plantoes.findAll({
        include: {
            model: medicos,
            as: 'medico', // Certifique-se de que o alias está correto no modelo
            attributes: ['nome', 'especialidade']
        }
    });
    res.render('plantoes/index', { dados: resultado });
});

// 4ª Rota - Deletar plantões
router.get('/deletar/:id', async (req, res) => {
    const resultado = await plantoes.destroy({
        where: {
            id:req.params.id
        }
    })
    res.redirect('/plantoes')
})

// 5ª Rota - Exibir o formulário de cadastro
router.get('/criar', async (req, res) => {
    const turnos = ['Manhã', 'Tarde', 'Noite']

    // Buscando médicos e especialidades únicas
    const listaMedicos = await medicos.findAll()
    const especialidades = await medicos.findAll({
        attributes: ['especialidade'],
        group: ['especialidade']
    })

    const medicosData = listaMedicos.map(medico => medico.dataValues)
    const especialidadesData = especialidades.map(e => e.dataValues.especialidade)

    res.render('plantoes/addPlantoes', {
        turnos,
        medicos: medicosData,
        especialidades: especialidadesData
    })
})

module.exports = router
