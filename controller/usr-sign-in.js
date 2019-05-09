/** 
 * 用户登录
 *  */
const getUsr = require("../model/usr");

const signin = async ctx =>{
    const params = ctx.request.body;
    if(!params){
        return ctx.response.body={
            status:400,
            msg:'缺少参数'
        }
    }
    params.type="sign-in"
    await getUsr(params).then(async res=>{
        if(!res){
          return ctx.response.body={
            status:204,
            msg:'用户未注册'
          }
        }
        else {
          if(params.name === 'heyuanqing'){
            return ctx.response.body = {
              flag:0,
              status:200,
              msg:'登录成功',
              data:res[0]
            }
          }
          return ctx.response.body = {
            flag:1,
            status:200,
            msg:'登录成功',
            data:res[0]
          }
        }
        
    },err=>{
        return ctx.response.body={
            status:401,
            msg:'查询失败'
        }
    })
}

module.exports =  signin 