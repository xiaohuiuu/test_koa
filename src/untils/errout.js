const fs = require('fs')


const errout = (error)=>{
    let now = new Date()
    let time1 = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    let time = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`
    let input = `[${time1}]     ${error}\n`
    let dir = `./src/log/error_log_${time}.txt`

    fs.writeFile(dir,input,{flag:'a'},function(error){
        if(error){
            throw new Error(error)
        }else{
            console.log('错误已经写入到日志文件中')
        }
    })
}







module.exports = {
    errout
}