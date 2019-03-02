const {addUsr} = require("../model/signUp");

module.exports = async (ctx)=>{
    const usr = ctx.body.query;
    let {id,psw,repsw} = usr;

    if(!id||!psw||!repsw){
        return ctx.body={
            status:400,
            msg:"参数不足"
        }
    }
    await addUsr(usr).then(res=>{
          return ctx.body={
              status:200,
              msg:"注册成功"
          }  
    },err=>{
        return ctx.body={
            status:400,
            msg:"注册失败"
        }
    })
}