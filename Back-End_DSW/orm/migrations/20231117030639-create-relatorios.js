'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Relatorios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estufa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estufas', // Nome da tabela referenciada
          key: 'id' // Nome da coluna referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Relatorios');
  }
};