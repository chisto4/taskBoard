'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.hasMany(models.Column, {
        onDelete: 'CASCADE',
      });
      Board.belongsToMany(models.User, {
        through: 'UserBoard'
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