const KoaRouter = require('@koa/router')
const md5 = require('md5')
const connect= require('../mysql/sql')
const {findAll} = require('../controller/userController')



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



//sequelize的连接方法
router.get('/',async(ctx,next)=>{
    let data = await findAll()
    ctx.body = JSON.stringify({
        message:'success',
        data:data
    })
})

//
router.get('/test',(ctx,next)=>{
    
})




module.exports = router