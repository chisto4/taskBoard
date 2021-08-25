'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pastName: {
        type: Sequelize.STRING,
        unique: true
      }
    },
      down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
      }
};