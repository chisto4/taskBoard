'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.hasMany(models.Column, {
        foreignKey: 'columnId',
        onDelete: 'CASCADE',
      });
      Board.belongsToMany(models.User, {
        through: 'UserBoard',
        foreignKey: 'userId'
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