const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");



class DadosEstufa extends Model {
  static associate(models){
    DadosEstufa.belongsTo('estufas', { foreignKey: 'estufa_id' });
 }
}

DadosEstufa.init(
  {
    estufa_id:{
      type: DataTypes.INTEGER,
    },
    temperatura: {
      type: DataTypes.DECIMAL,
    },
    umidade: {
      type: DataTypes.DECIMAL,
    },
    consumo_agua: {
      type: DataTypes.DECIMAL,
    },
    timestamp: {
      type: DataTypes.TIME,
    },
  },
  {
    sequelize,
    modelName: "dadosEstufa",
    timestamps: false 
  }
);

module.exports = DadosEstufa