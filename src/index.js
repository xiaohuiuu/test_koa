const Koa = require('koa')
const index = require('./routes/index')
const user = require('./routes/user')
const bodyParse = require('koa-bodyparser')
const cors = require('@koa/cors')
const onError = require('koa-onerror')
const logger = require('koa-logger')
const _static = require('koa-static')

const app = new Koa()

app.use(bodyParse())
app.use(cors())
app.use(user.routes()).use(user.allowedMethods())
app.use(logger())
app.use(_static('./public'))
onError(app)









//全局错误
app.on('error',(error)=>{
    console.log('全局错误：',error)
})





app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000')
})