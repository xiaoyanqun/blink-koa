const {HttpException} = require('../core/http-exception')
const config = require('../config/config')
const catchError = async (ctx,next)=>{
  try {
    await next()
  } catch (error) {
    // 判断是否为开发环境，是就继续抛出错误
    const isDev = config.environment == 'dev'
    const isHttpException = error instanceof HttpException
    if(isDev && !isHttpException){
      throw error
    }
    if(isHttpException){
      ctx.body = {
        msg:error.msg,    //报错信息
        error_code:error.errorCode,     //报错状态码
        request:`${ctx.method} ${ctx.path}`  //请求方式和路径
      }
      ctx.status = error.code     //报错码
    }else{
      ctx.body = {
        msg:'服务器出现未知异常',    //报错信息
        error_code:999,     //报错状态码
        request:`${ctx.method} ${ctx.path}`  //请求方式和路径
      }
      ctx.status = 500
    }
  }
}
module.exports = catchError