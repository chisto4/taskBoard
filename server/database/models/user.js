import Sequelize  from 'sequelize';

const sequelize = new Sequelize('taskboard', 'nikolas', 'password', {host: 'localhost', dialect: 'postgres'});
sequelize.sync().then(()=>{
}).catch(err=>console.log(err))

const user = sequelize.define("user", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

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

export default user