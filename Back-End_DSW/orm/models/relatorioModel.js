const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Relatorio extends Model {
  static associate(models){
    Relatorio.belongsTo('estufas', { foreignKey: 'estufa_id' });
 }
}

Relatorio.init(
  {
    estufa_id:{
      type: DataTypes.INTEGER,
    },
    data: {
      type: DataTypes.STRING,
    },
    hora: {
      type: DataTypes.TIME,
    },
    umidade: {
      type: DataTypes.DECIMAL,
    },
    temperatura: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    sequelize,
    modelName: "relatorios",
    timestamps: false 
  }
);

module.exports = Relatorio