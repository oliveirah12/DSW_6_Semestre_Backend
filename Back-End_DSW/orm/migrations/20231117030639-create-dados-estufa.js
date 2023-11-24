'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DadosEstufas', {
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
      temperatura: {
        type: Sequelize.DECIMAL
      },
      umidade: {
        type: Sequelize.DECIMAL
      },
      consumo_agua: {
        type: Sequelize.DECIMAL
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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DadosEstufas');
  }
};