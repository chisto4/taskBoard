'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    static associate(models) {
      Column.hasMany(models.Task, {
        foreignKey: 'columnId',
        onDelete: 'CASCADE',
      });
      Column.belongsTo(models.Board, {
      });

    }
  };
  Column.init({
    title: DataTypes.STRING,
    position: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Column',
  });
  return Column;
};