const mysql = require('mysql2')
const config  = require('./config')

class SQL{
    constructor(){
        //this.connect()
    }
    connect(){
        this.connection = mysql.createConnection(config)
        console.log('数据库连接成功')
    }
    query(sql){
        this.connect()
        return new Promise((resolve,reject)=>{
            this.connection.query(sql,(error,result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }
    close(){
        this.connection.end()
        console.log('数据库已关闭')
    }
}


module.exports = new SQL()