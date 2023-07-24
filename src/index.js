const Koa = require('koa')
const index = require('./routes/index')
const user = require('./routes/user')
const bodyParse = require('koa-bodyparser')
const cors = require('@koa/cors')
const onError = require('koa-onerror')
const logger = require('koa-logger')
const _static = require('koa-static')
const adminRouter = require('./routes/admin')
const {errout} = require('./untils/errout')

const app = new Koa()

app.use(bodyParse())
app.use(cors())
app.use(logger())
app.use(_static('./public'))
onError(app)
app.use(user.routes()).use(user.allowedMethods())
app.use(adminRouter.routes()).use(adminRouter.allowedMethods())









//全局错误
app.on('error',(error)=>{
    errout(error)
    console.log('全局错误：',error)
})




app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000')
})