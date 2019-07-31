const Router = require('koa-router')
const router = new Router()
// 引入抛出异常工具类
const {HttpException} = require('../../../core/http-exception')
// 引入验证正整类
const { PositiveIntegerValidator } = require('../../lib/validators/validator')

router.post('/v1/:id/classic',async (ctx,next)=>{
  const v =await new PositiveIntegerValidator().validate(ctx)
  ctx.body = {
    name:"这里是classic"
  }
})

module.exports = router