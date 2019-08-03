// 密码加密插件
const bcrypt = require('bcryptjs')
// 数据库自动填写字段插件
const {Sequelize,Model} = require('sequelize')
// 相关配置文件
const {sequelize} = require('../../core/db')
const {NotFound,AuthFailed} = require('../../core/http-exception')
class User extends Model{
  // 验证数据库中是否有相应的邮箱，密码
  static async verifyEmailPassword(email,plainPassword){
    const user = await User.findOne({
      where:{
        email
      }
    })
    if(!user){
      throw new NotFound('用户名不存在')
    }
    const correct = bcrypt.compareSync(plainPassword,user.password)
    if(!correct){
      throw new AuthFailed('密码错误')
    }
    return user
  }
   // 查询是否存在 opendid 的小程序用户
  static async getUserByOpenid(openid){
    const user = User.findOne({
      where:{
        openid
      }
    })
    return user;
  }

   // 注册小程用户
   static async createUserByOpenid(openid){
    //  创建用户
     const user = User.create({
      openid
     })
     return user
   }
}
User.init({
  id:{
    type:Sequelize.INTEGER,    //整型
    primaryKey:true,       //是否设置为主键    主键:不能重复，不能为空
    autoIncrement:true    //是否自动增长
  },
  nickname:Sequelize.STRING,    //用户名：字符串
  email:{
    type:Sequelize.STRING(128),  
    unique:true    //是否开启不能重复
  }, 
  password:{
    type:Sequelize.STRING, 
    // set,只要接受到数据就会调用这个函数
    set(val){
      // 密码加密时计算机所消耗的成本，数字越大成本越大，加密程度越大
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val,salt)
      this.setDataValue('password',psw)
    }
  },
  openid:{
    type:Sequelize.STRING(64),  
    unique:true    //是否开启不能重复
  }
},{
  sequelize,
  tableName:'user'   //表格名
})
module.exports = {User}