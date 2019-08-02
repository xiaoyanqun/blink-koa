class HttpException extends Error{
  constructor(msg="服务器异常",errorCode = 10000,code=400){
    super()
    this.errorCode = errorCode
    this.msg = msg
    this.code = code
  }
}
class ParameterException extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 1000
  }
}
class Success extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 201
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}
// 验证登录时账号是否存在
class NotFound extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 404
    this.msg = msg || '资源未找到'
    this.errorCode = errorCode || 10000
  }
}
// 验证登录时账号和密码是否正确
class AuthFailed extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10004
  }
}
// 验证token的合法性
class Forbbiden extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
  }
}

module.exports = {HttpException,ParameterException,Success,NotFound,AuthFailed,Forbbiden}