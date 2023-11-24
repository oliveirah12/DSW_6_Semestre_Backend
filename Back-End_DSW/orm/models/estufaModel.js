const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const DadosEstufa = require('../../orm/models/dadosEstufaModel');
const Relatorios = require('../../orm/models/relatorioModel');


class Estufa extends Model {
  
}

Estufa.init(
  {
    nome: {
      type: DataTypes.STRING,
    },
    localizacao: {
      type: DataTypes.STRING,
    },
    capacidade: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    sequelize,
    modelName: "estufas",
    timestamps: false 
  },
  
);

Estufa.hasOne(DadosEstufa, { foreignKey: 'estufa_id' })
DadosEstufa.belongsTo(Estufa, { foreignKey: 'estufa_id' })
Relatorios.belongsTo(Estufa, { foreignKey: 'estufa_id' });

module.exports = Estufa