const database = require('./database'); // Importando o banco de dados
const medicos = require('./medicos'); // Importando a tabela medicos

//Criando a tabela de plantoes
const plantoes = database.sequelizeConfig.define(
    'plantoes', //Nome da tabela
    {
        nome_medico:{
            type: database.sequelizeDb.STRING,
            allowNull: false    
        },

        especialidade:{
            type: database.sequelizeDb.TEXT,
            allowNull: false
        },

        data:{
            type: database.sequelizeDb.DATE,
            allowNull: false
        },

        turno:{
            type: database.sequelizeDb.STRING,
            allowNull: false
        }

    }
)

//criando a chave estrangeira
//estamos dizendo que um medico pode ter muitos plantoes
medicos.hasMany(plantoes,{
    foreignKey: 'nome_medico',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

plantoes.belongsTo(medicos,{
    foreignKey: 'nome_medico',
})

//Sincronizando a tabela gravacoes com o banco de dados
plantoes.sync()
module.exports = plantoes