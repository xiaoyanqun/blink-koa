module.exports = {
  // prod 生产环境          dev 开发环境
  environment:'dev',
  database:{
    dbName:'blink',
    host:'localhost',
    port:3306,
    user:'root',
    password:'root'
  },
  // token配置
  security:{
    secretKey:"zxcwan",
    expiresIn:60*60*24*30
  },
}