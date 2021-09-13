'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.hasMany(models.Column, {
        foreignKey: 'boardId',
        onDelete: 'CASCADE',
      });
      Board.belongsToMany(models.User, {
        through: 'UserBoard',
        foreignKey: 'boardId',
        as: 'Users'
      });
    }
  };
  Board.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};