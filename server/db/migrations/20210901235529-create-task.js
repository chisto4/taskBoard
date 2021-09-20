'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      columnId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      userLogin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userPathImage: {
        type: Sequelize.STRING,
        allowNull: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};