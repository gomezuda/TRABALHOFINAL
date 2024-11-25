const {sequelizeDb, sequelizeConfig} = require('./database')

const medicos = sequelizeConfig.define(
    'medicos',
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




