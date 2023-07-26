const { Sequelize, DataTypes } = require('sequelize')
const { database, host, password, port } = require('../mysql/config')


const sequelize = new Sequelize(database, 'root', password, {
    dialect: 'mysql',
    host: host,
    port: port
})


const user = sequelize.define('user', {
    id: {
        type:DataTypes.BIGINT,
        unique:true,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    username: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(6),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate:{
            isEmail:true
        }
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    icon: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'localhost:3000/upload/userdefault100.png'
    },
    create_time: {
        type: DataTypes.DATE,
        allowNull: true,
    }

}, {
    timestamps: false
});



// 同步模型和数据库
user.sync({ force: false, alter: true }).then(() => {
    console.log('User model synced with database.');
}).catch(err => {
    console.error('Error syncing User model:', err);
})




module.exports = user