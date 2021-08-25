import Sequelize  from 'sequelize';

const sequelize = new Sequelize('taskboard', 'nikolas', 'password', {host: 'localhost', dialect: 'postgres'});
sequelize.sync().then(()=>{
}).catch(err=>console.log(err))

const userImage = sequelize.define("image", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

export default userImage