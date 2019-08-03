// node提供的核心模块，格式化字符串
const util = require('util')
const axios = require('axios')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')
const {wx} = require('../../config/config')
const  {AuthFailed} = require('../../core/http-exception.js')

class WXManager{
  static async codeToToken(code){
    // 拼接请求微信接口路径
    const url = util.format(wx.loginUrl,wx.appId,wx.appSecret,code)
    const res = await axios.get(url)
    if(res.status !== 200){
      throw new AuthFailed('openid获取失败')
    }
    if(res.data.errcode !==0){
      throw new AuthFailed('code不合法'+res.data.errmsg)
    }
     // 建立档案 user uid
      //  查询数据库是否存在微信用户
    let user = await User.getUserByOpenid(res.data.openid)
    // 判断是否存在
    if(!user){
      // 创建用户
      user = await User.createUserByOpenid(res.data.openid)
    }
    // 走到这里说明code是合法的，返回token
   return token = generateToken(user.id,Auth.USER)
  }
}

module.exports = {WXManager}