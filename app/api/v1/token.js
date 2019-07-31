const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/token'
})
const {TokenValidator} = require('../../lib/validators/validator')
router.post('/',async (ctx)=>{
  const v = await new TokenValidator().validate(ctx)
})

module.exports = router