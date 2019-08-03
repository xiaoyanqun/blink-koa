module.exports = {
  // prod 生产环境          dev 开发环境
  environment: 'dev',
  database: {
    dbName: 'blink',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
  },
  // token配置
  security: {
    secretKey: "zxcwan",
    expiresIn: 60 * 60 * 24 * 30
  },
  // 微信登录配置
  wx: {
    appId: 'wxd2e0c5da046bc12e',
    appSecret: 'e4b11b262b491bc81ddce8e89fc2d972',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}