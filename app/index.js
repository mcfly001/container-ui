const Koa = require('koa2')
const config = require('./config')
const static = require('koa-static')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticPath = './public'
const app = new Koa()

app.use(bodyParser())

// 静态资源存放
app.use(static(
  path.join(__dirname, staticPath)
))

app.listen(config.PORT)