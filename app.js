const Koa = require('koa')
// 引入require-directory自动导入路由工具类
const InitManager = require('./core/init')
// 引入全局异常拦截器
const catchError = require('./middlewares/exception')
// 引入bodyparser中间件
const bodyParser = require('koa-bodyparser')
// 引入用户模块

const app = new Koa()
// 注册全局异常拦截器
app.use(catchError)
// 注册bodyParser中间件
app.use(bodyParser())

// 调用自动导入路由工具类里的入口方法，并传入app
InitManager.initCore(app)





app.listen(3000,()=>{
  console.log("http://127.0.0.1:3000")
})