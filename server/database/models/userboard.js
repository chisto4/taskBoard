'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBoard extends Model {
    static associate(models) {
            // define association here
    }
  };
  UserBoard.init({
    userID: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER
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
//       model: User, // 'Movies' would also work
//       key: 'id'
//     }
//   },
//   boardId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Board, // 'Actors' would also work
//       key: 'id'
//     }
//   }
// });