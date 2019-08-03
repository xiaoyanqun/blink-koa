const {LinValidator,Rule } = require('../../../core/lin-validator')
// 校验是否是整数
const {User} = require('../../models/user')
const {LoginType} = require('../enum.js')
class PositiveIntegerValidator extends LinValidator {
  constructor() {
      super()
      this.id = [
          new Rule('isInt', '需要正整数', {min: 1})
      ]
  }
}
// 校验注册信息
class RegisterValidator extends LinValidator{
  constructor() {
    super()
    this.email = [
        new Rule('isEmail','不符合Email规范')
    ]
    this.password1 = [
        new Rule('isLength','密码至少6个字符,最多32个字符',{
          min: 4,
          max: 32
        }),
        new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.nickname = [
        new Rule('isLength', '昵称长度不符合规范', {
          min: 4,
          max: 32
          })
    ]
}
  validatePassword(vals){
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if(psw1 !== psw2){
      throw new Error('两个密码必须相同')
    }
  }
  async validateEmail(vals){
    const email =  vals.body.email
    const user = await User.findOne({
      where:{
        email:email
      }
    })
    if(user){
        throw Error('email已存在')
    }
  }

}

// 校验登录信息
class TokenValidator extends LinValidator{
  constructor() {
    super()
    // 用户账号
    this.account = [
      new Rule('isLength','不符合校验规则',{min:4,max:32})
    ]
    // 密码，可以不传
    this.secret = [
      // 设置可以不传
      new Rule('isOptional'),
      // 如果传了就必须遵守定义的规则
      new Rule('isLength','至少6个字符',{
        min:6, max:128
      })
    ]
  }
  validateLoginType(vals){
    if(!vals.body.type){
      throw new Error('type是必须参数')
    }
    if(!LoginType.isThisType(vals.body.type)){
      throw new Error('type参数不合法')
    }
  }
}

module.exports = {PositiveIntegerValidator,RegisterValidator,TokenValidator}