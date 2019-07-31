const Router = require('koa-router')
const router = new Router()
router.get('/v1/book',async (ctx,next)=>{
     ctx.body ={
      name:'如果'
    }
})

module.exports = router