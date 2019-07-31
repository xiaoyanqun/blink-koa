const Sequelize = require('sequelize')
const { dbName,
 host,
 port,
 user,
 password} = require('../config/config').database
// Sequelize传入参数，dbName：数据库名  user：用名 password：密码  {配置对象}
 const sequelize = new Sequelize(dbName,user,password,{
   dialect:'mysql',   //使用mysql数据库
   host,   //路径 
   port,    //端口
   logging:true,
    timezone:'+08:00',   //使用时间是不是北京时间，必须加上
    define:{
      timestamps:true,
      paranoid:true,
      createdAt:'created_at',
      updatedAt:'updated_at',
      deletedAt:'deleted_at',
      underscored:true
    }
 })
 sequelize.sync({
   force:false
  })
 module.exports = {sequelize}