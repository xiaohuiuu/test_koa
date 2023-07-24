const KoaRouter = require('@koa/router')


const router = new KoaRouter()



router.get('/user',(ctx,next)=>{
    ctx.body = 'body'
})

module.exports = router