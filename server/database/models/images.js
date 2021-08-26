'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.Images.belongsTo(models.user);
    }
  }
  Images.init(
    {
      wayImages: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Images",
    }
  );
  return Images;
};

// import Sequelize  from 'sequelize';

// const sequelize = new Sequelize('taskboard', 'nikolas', 'password', {host: 'localhost', dialect: 'postgres'});
// sequelize.sync().then(()=>{
// }).catch(err=>console.log(err))

// export const userImage = sequelize.define("image", {
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: true
//     },
//     pastName: {
//         type: Sequelize.STRING,
//         unique: true
//     }
// })

// user.hasMany(userImage)
// userImage.hasOne(user, {
//     foreignKey:{
// userIdentefication
// }
// })


// user_id: {
//     type: Sequelize.INTEGER,
//     references: {
//     model: ‘Users’,
//     key: ‘id’
//     }
//     },

//     models.User.hasOne(
//     models.Cart,
//     {
//     foreignKey: ‘user_id’,
//     as: ‘cart’
//     },
//     );


// export default userImage