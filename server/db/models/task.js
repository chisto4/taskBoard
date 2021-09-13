'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Column, {
        foreignKey: 'columnId',
      });
    }
  };
  Task.init({
    title: DataTypes.STRING,
    position: DataTypes.INTEGER,
    description: DataTypes.STRING,
    priority: DataTypes.STRING,
    columnId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};