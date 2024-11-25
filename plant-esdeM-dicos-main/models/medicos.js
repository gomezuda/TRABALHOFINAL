const {sequelizeDb, sequelizeConfig} = require('./database')//Importando o banco de dados

const medicos = sequelizeConfig.define(
    'medicos',// o nome da tabela
    {
        nome:{
            type:sequelizeDb.STRING,
            allowNull: false
        },
        especialidade:{
            type:sequelizeDb.TEXT,
            allowNull: false
        },
        contato:{
            type:sequelizeDb.STRING,
            allowNull: false
        },
        email:{
            type:sequelizeDb.STRING,
            allowNull: false
        }
    }
)
medicos.sync()
module.exports = medicos




