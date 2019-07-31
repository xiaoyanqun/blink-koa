// require-directory自动导入路由工具类
const Router = require('koa-router')
const requireDirectory = require('require-directory')
class InitManager{
  static initCore(app){
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
  }
  static initLoadRouters(){
    // process.cwd()获取绝对路径
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module,apiDirectory,{
      visit:whenLoadModule
    })
    function whenLoadModule(obj){
      // 判断每一个对象的实例是不是Router，是的才注册路由
      if(obj instanceof Router){
        InitManager.app.use(obj.routes())
      }
    }
  }
}
module.exports = InitManager