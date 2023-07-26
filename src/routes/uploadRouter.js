const KoaRouter = require('@koa/router')
const upload = require('../untils/upload')
const router = new KoaRouter()



router.post('/upload',upload.single('icon'),(ctx,next)=>{
    console.log('ctx.request.body: ',ctx.request.body)
    console.log('ctx.request.file: ',ctx.request.file)
    console.log('ctx.file: ',ctx.file)
    ctx.body = JSON.stringify({
        status:200,
        message:'上传成功'
    })
})





module.exports =  router