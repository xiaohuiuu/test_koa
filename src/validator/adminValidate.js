const bouncer = require('koa-bouncer')


//注册验证账号密码
const registerValidate = (ctx) => {
    try {
        ctx.validateBody('username')
            .required('用户名为必填选项')
            .isString()
            .trim()
            .isLength(4, 16, '用户名必须4-16个字符')
        ctx.validateBody('password')
            .required('密码为必填选项')
            .optional()
            .isString()
            .trim()
            .isLength(6, 20, '密码必须4-16个字符')

        console.log('校验通过')
        return true


    } catch (error) {
        if (error instanceof bouncer.ValidationError) {
            console.log('校验未通过')
            ctx.body = {
                status: 500,
                message: error.message
            }
            return false
        }
        throw error
    }

}


//登陆验证
const loginValidate = (ctx) => {
    console.log('我是admin的登陆的数据校验')
}



module.exports = {
    registerValidate,
    loginValidate
}