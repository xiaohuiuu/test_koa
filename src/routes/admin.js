const KoaRouter = require('@koa/router')
//数据的验证
const {register} = require('../controller/adminController')
//



const router = new KoaRouter()


router.prefix('/admin')


router.post('/register',async(ctx,next)=>{
    await register(ctx)


    //ctx.body = 'adminRouter'
})















module.exports = router