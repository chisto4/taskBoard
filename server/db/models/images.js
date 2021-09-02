'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      Images.belongsTo(models.User, {
        foreignKey: 'userId',
      }); 
    }
  };
  Images.init({
    pathImages: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};