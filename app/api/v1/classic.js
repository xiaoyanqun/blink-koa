const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/classic'
})
const {Auth} = require('../../../middlewares/auth.js')
// 引入抛出异常工具类
const {HttpException} = require('../../../core/http-exception')
// 引入验证正整类
const { PositiveIntegerValidator } = require('../../lib/validators/validator')

router.get('/latest',new Auth().m ,async (ctx,next)=>{
  ctx.body = ctx.auth.uid
})

module.exports = router