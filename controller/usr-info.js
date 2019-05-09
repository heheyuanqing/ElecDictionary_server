/** 
 * 用户信息
 *  */
const getUsr = require("../model/usr");

// 获取用户所有信息
const getUsrInfo = async ctx =>{
    const params = ctx.request.query;
    if(!params){
        return ctx.response.body={
            status:400,
            msg:'缺少参数'
        }
    }
    params.type="sign-in"
    await getUsr(params).then(res=>{
        if(!res){
          return ctx.response.body={
            status:204,
            msg:'不存在该用户'
          }
        }
        else {
          return ctx.response.body = {
            status:200,
            info:res[0]
          }
        }
        
    },err=>{
        return ctx.response.body={
            status:401,
            msg:'查询失败'
        }
    })
}

// 用户创建个人数据库
const setFlag = async ctx => {
  let val = ctx.request.body
  
  val.type="set-flag"
  console.log(val)
  await getUsr(val).then(res=>{
    return ctx.response.body = {
      status:200,
      msg:'sucess'
    } 
  },err=>{
    return ctx.response.body={
        status:401,
        msg:'查询失败'
    }
  })
}

module.exports ={
  getUsrInfo,
  setFlag
}