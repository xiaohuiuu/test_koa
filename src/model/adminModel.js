const { Sequelize, DataTypes } = require('sequelize')
const { database, host, password, port } = require('../mysql/config')


const sequelize = new Sequelize(database, 'root', password, {
    dialect: 'mysql',
    host: host,
    port: port
})

const admin = sequelize.define('Admin',{
    id:{
        type:DataTypes.BIGINT,
        unique:true,
        primaryKey:true,
        allowNull:false,
        len:[1,16],
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING(16),
        unique:true,
        allowNull:false,
        len:[4,16]
    },
    password:{
        type:DataTypes.STRING(20),
        len:[6,20]
    }
}, {
    timestamps: false
})


// 同步模型和数据库
admin.sync({ force: false,alter:true }).then(() => {
    console.log('User model synced with database.');
}).catch(err => {
    console.error('Error syncing User model:', err);
})


module.exports = admin