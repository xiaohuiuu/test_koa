const KoaRouter = require('@koa/router')



const router = new KoaRouter()


router.prefix('admin')


router.post('/register',(ctx,next)=>{
    // 1. 拿到用户传过来的数据，进行数据校验
    // 2. 
})