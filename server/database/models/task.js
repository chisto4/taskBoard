'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Column, {
      });
    }
  };
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.STRING,
    position: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};