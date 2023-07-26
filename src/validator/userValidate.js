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
            .isString()
            .trim()
            .isLength(6, 20, '密码必须6-20个字符')
        ctx.validateBody('email')
            .required('邮箱为必填选项')
            .isString()
            .trim()
            .isEmail()
        ctx.validateBody('phone')
            .required('手机号为必填选项')
            .isString()
            .trim()
            .isLength(11, 11, '手机号必须11个字符')

        console.log('注册校验通过')
        return true


    } catch (error) {
        if (error instanceof bouncer.ValidationError) {
            console.log('注册校验未通过')
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
    try {
        ctx.validateBody('username')
            .optional()
            .isString()
            .trim()
            .isLength(4, 16, '用户名必须4-16个字符')
        ctx.validateBody('password')
            .required('密码为必填选项')
            .isString()
            .trim()
            .isLength(6, 20, '密码必须6-20个字符')
        ctx.validateBody('email')
            .optional()
            .isString()
            .trim()
            .isEmail()
        ctx.validateBody('phone')
            .optional()
            .isString()
            .trim()
            .isLength(11, 11, '手机号必须11个字符')

        console.log('登陆校验通过')
        return true


    } catch (error) {
        if (error instanceof bouncer.ValidationError) {
            console.log('登陆校验未通过')
            ctx.body = {
                status: 500,
                message: error.message
            }
            return false
        }
        throw error
    }
}



module.exports = {
    registerValidate,
    loginValidate
}