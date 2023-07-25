const { Sequelize, DataTypes } = require('sequelize')
const { database, host, password, port } = require('../mysql/config')


const sequelize = new Sequelize(database, 'root', password, {
    dialect: 'mysql',
    host: host,
    port: port
})


const user = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
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
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    create_time: {
        type: DataTypes.DATE,
        allowNull: true,
    }

}, {
    timestamps: false
});



// 同步模型和数据库
user.sync({ force: true,alter:true }).then(() => {
    console.log('User model synced with database.');
}).catch(err => {
    console.error('Error syncing User model:', err);
})




module.exports = user