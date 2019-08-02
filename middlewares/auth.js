// 解码token插件bs64
const basicAuthd = require("basic-auth")
const {Forbbiden} = require('../core/http-exception')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../config/config').security

/**
 * 验证token中间件
 */
class Auth{
  constructor(level){
    // level Api接口权限
    this.level = level || 1
    // 用户权限
    Auth.USER = 8,
    Auth.ADMIN = 16,
    Auth.SUPER_ADMIN = 32
  }
  get m(){
    return async (ctx,next)=>{
      let errorMsg = 'token不合法'
      // token检测
      const userToken = basicAuthd(ctx.req)
      if(!userToken || !userToken.name){
        throw new Forbbiden(errorMsg)
      }
      try {
         var decode = jwt.verify(userToken.name,secretKey)
      } catch (error) {
        if(error.name === 'TokenExpiredError'){
          errorMsg = 'token已过期'
        }
        throw new Forbbiden(errorMsg)
      }
      if(decode.scope<this.level){
        errorMsg = '权限不足'
        throw new Forbbiden(errorMsg)
      }
      ctx.auth = {
        uid:decode.uid,
        scope:decode.scope
      }
      await next()
    }
  }
}

module.exports = {Auth}