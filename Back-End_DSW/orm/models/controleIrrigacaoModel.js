const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/db");

  class ControleIrrigacao extends Model{
    static associate(models){
      ControleIrrigacao.belongsTo('estufas', { foreignKey: 'estufa_id' });
   }
  }

  ControleIrrigacao.init(
  {
    estufa_id:{
      type: DataTypes.INTEGER,
    },
    comando_bomba: {
      type: DataTypes.BOOLEAN,
    },
    comando_valvula: {
      type: DataTypes.BOOLEAN,
    },
    timestamp: {
      type: DataTypes.DATE
    },
  }, 
  {
    sequelize,
    modelName: 'ControleIrrigacao',
  }
);
module.exports = ControleIrrigacao
