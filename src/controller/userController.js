const user = require('../model/userModel')
//user的数据模型
const userModel = require('../model/userModel')
//user 相关的数据验证方法
const { registerValidate, loginValidate } = require('../validator/userValidate')
//jwt token生成
const jwt = require('koa-jsonwebtoken')
//




//查找所有的用户
const findAll = async function () {
    let Users = await user.findAll()
    return Users
}

//注册用户
const register = async (ctx) => {
    //1. 验证前端传过来的数据
    let validate = registerValidate(ctx)
    if (!validate) {  //如果验证未通过，不执行下面的代码
        return
    }
    //2. 验证通过，获取注册信息
    let { username, password, email, phone } = ctx.request.body
    //3. 判断数据库中有没有重名的
    let name = await userModel.findAll({
        attributes:['username'],
        where:{
            username:username
        }
    })
    if(name.length == 0){
        //用户的 创建时间  字段
        let now = new Date()
        console.log(now)
        userModel.create({
            username:username,
            password:password,
            email:email,
            phone:phone,
            create_time:now
        })
        ctx.body = {
            code:1,
            status:'success',
            message:'注册成功'
        }
        console.log('注册成功')
    }else{
        ctx.body = {
            code:2,
            status:'failed',
            message:'用户名重复，请换一个'
        }
        console.log('用户名重复，请换一个')
    }

}

//登陆   代码的逻辑
const login = async (ctx) => {
    //1. 验证数据
    let validate = loginValidate(ctx)
    if(!validate){  //如果验证不成功，不执行下面的代码
        return
    }
    //2. 取出登录的信息
    let userLoginInfo = ctx.request.body
    const {password} = ctx.request.body
    let keys = Object.keys(userLoginInfo)   //数组第一个是用户的登陆方式，如果是username，代表是用户名登陆，如果是email，代表是邮箱登陆，如果是phone，代表是手机号登陆
    let loginWay = keys[0]
    console.log(loginWay)
    
    //3. 判断登陆  第一步 先判断数据库是否有 输入的用户名
    let name = await userModel.findAll({
        attributes:[loginWay],
        where:{
            [loginWay]:userLoginInfo[loginWay]
        }
    })

    if(name.length == 0){   //如果name的length等于0，代表数据库没有找到 此登陆方式的手机号，用户名，email，
        ctx.body = {
            status:'failed',
            message:'未找到此用户'
        }
    }else{
        //进入到此分支，代表数据库找到了登陆方式   
        //现在判断密码是否正确
        let data_pwd = await userModel.findAll({     //取出数据库中的密码
            attributes:['password'],
            where:{
                [loginWay]:userLoginInfo[loginWay]
            }
        })
       
        if(password === data_pwd[0].password){  //此分支代表 用户输入的密码和 数据库中的密码相同
            //令牌
            const secret = 'xujinlong197413'
            //生成token
            let token = jwt.sign({
                data:name,       //不要存放敏感信息   密码
                exp:Math.floor(Date.now() /1000) + (60 * 60 * 24)  //24小时候令牌失效
            },secret)
            ctx.body = {
                status:'success',
                message:'登陆成功',
                token:token,
                effective_time:24
            }
            console.log('密码相同')
        }else{      //此分支代表密码输入的是错误的
            ctx.body = {
                status:'failed',
                message:'密码不正确'
            }
            console.log('密码不正确')
        }

    }
    
}





module.exports = {
    findAll,
    register,
    login
}