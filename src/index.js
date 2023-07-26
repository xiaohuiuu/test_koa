const Koa = require('koa')
const bodyParse = require('koa-bodyparser')
const bouncer = require('koa-bouncer')
const cors = require('@koa/cors')
const onError = require('koa-onerror')
const logger = require('koa-logger')
const _static = require('koa-static')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const {errout} = require('./untils/errout')
const uploadRouter = require('./routes/uploadRouter')


const app = new Koa()

app.use(bouncer.middleware())
app.use(bodyParse())
app.use(cors())
app.use(logger())
app.use(_static('./public'))
onError(app)
app.use(uploadRouter.routes()).use(uploadRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(adminRouter.routes()).use(adminRouter.allowedMethods())









//全局错误
app.on('error',(error)=>{
    errout(error)
    console.log('全局错误：',error)
})




app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000')
})