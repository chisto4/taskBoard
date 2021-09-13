'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Images, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.belongsToMany(models.Board, {
        through: 'UserBoard',
        foreignKey: 'userId',
        as: 'Boards'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dob: DataTypes.STRING,
    avatarId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};