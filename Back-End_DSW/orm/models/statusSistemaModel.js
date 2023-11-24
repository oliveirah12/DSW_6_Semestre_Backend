'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusSistema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StatusSistema.init({
    estufa_id: DataTypes.INTEGER,
    bomba_ligada: DataTypes.BOOLEAN,
    valvula_aberta: DataTypes.BOOLEAN,
    modo_operacao: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'StatusSistema',
  });
  return StatusSistema;
};