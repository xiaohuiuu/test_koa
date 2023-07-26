const KoaRouter = require('@koa/router')
const md5 = require('md5')
const connect = require('../mysql/sql')
const {register,login} = require('../controller/userController')




const router = new KoaRouter()

router.prefix('/user')


// mysql2的链接方法
// router.get('/', async(ctx, next) => {  
//     let id = ctx.query.id
//     if(id){
//         let res = await connect.query(`select * from user where id = ${id}`)
//         ctx.body = JSON.stringify({
//             status:200,
//             data:res
//         })
//         connect.close()
//     }else{
//         let res = await connect.query(`select * from user`)
//         ctx.body = JSON.stringify({
//             status:200,
//             data:res
//         })
//         connect.close()
//     }
// })



//用户注册
router.post('/register',async (ctx, next) => {
    await register(ctx)
})



//用户登陆
router.post('/login', async (ctx, next) => {
    await login(ctx)
})




module.exports = router