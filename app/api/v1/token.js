const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/token'
})
const {TokenValidator} = require('../../lib/validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../../models/user')
const {ParameterException} = require('../../../core/http-exception')
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
// 登录接口
router.post('/',async (ctx)=>{
  console.log(ctx.request.body)
  // 验证登录参数是否正确
  const v = await new TokenValidator().validate(ctx)
  
  let token
  // 判断登录类型
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
        //验证数据库中用户名跟密码
       token = await emailLogin(v.get('body.account'),v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:   
      break;
    default:throw new ParameterException('没有相应的处理函数')
  }
 
  ctx.body = {
    token
  }
})
async function emailLogin(account,secret){
 const user = await User.verifyEmailPassword(account,secret)
//  返回一个token
 return token = generateToken(user.id,Auth.USER)
 
}

module.exports = router
