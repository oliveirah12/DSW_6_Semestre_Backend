'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ControleIrrigacaos', {
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
      comando_bomba: {
        type: Sequelize.BOOLEAN
      },
      comando_valvula: {
        type: Sequelize.BOOLEAN
      },
      timestamp: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ControleIrrigacaos');
  }
};