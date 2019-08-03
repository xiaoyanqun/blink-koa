const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/user'
})
const {User} = require('../../models/user')
const {RegisterValidator} =  require('../../lib/validators/validator')
const {Success} = require('../../../core/http-exception')
router.post('/register',async (ctx)=>{
  const v =await new RegisterValidator().validate(ctx)
  const user = {
    email:v.get('body.email'),
    password:v.get('body.password2'),
    nickname:v.get('body.nickname')
  }
  await User.create(user)
  // 用户信息保存到数据库成功返回信息
  throw new Success()
})

module.exports = router
