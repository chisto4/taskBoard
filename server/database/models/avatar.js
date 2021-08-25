import Sequelize  from 'sequelize';

const sequelize = new Sequelize('taskboard', 'nikolas', 'password', {host: 'localhost', dialect: 'postgres'});
sequelize.sync().then(()=>{
}).catch(err=>console.log(err))

export const userImage = sequelize.define("image", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    pastName: {
        type: Sequelize.STRING,
        unique: true
    }
})

user.hasMany(userImage)
userImage.hasOne(user, {
    foreignKey:{
userIdentefication
}
})


export default userImage