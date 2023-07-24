const { registerValidate, loginValidate } = require('../validator/adminValidate')
const adminModel = require('../model/adminModel')


const register = async (ctx) => {

    // 1. 先进行数据校验，通过往下走
    registerValidate(ctx)
    // 2. 通过校验后，获取用户名和密码
    let { username, password } = ctx.request.body
    // 3. 判断数据库中有没有重名的
    let res = await adminModel.findAll({
        attributes: ['username'],
        where: {
            username: username
        }
    })
    console.log(res)

    if (res.length === 0) {
        await adminModel.create({
            username: username,
            password: password
        })

        console.log('用户创建成功')
        ctx.body = {
            message: '用户创建成功'
        }

    } else {
        console.log('用户已存在')
        ctx.body = {
            message: '用户已存在'
        }
    }


}



const login = (ctx)=>{
    
}







module.exports = {
    register,
    login
}