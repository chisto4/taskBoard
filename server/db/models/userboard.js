// const db = require('../models')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBoard extends Model {
    static associate(models) {
    }
  };
  UserBoard.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    boardId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Board',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'UserBoard',
  });
  return UserBoard;
};

// const UserBoard = sequelize.define('UserBoard', {
//   userId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User,
//       key: 'id'
//     }
//   },
//   boardId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Board,
//     }
//   }
// });