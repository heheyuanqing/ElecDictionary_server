//用户登录
const {getUsr} = require("../model/signIn");

module.export=async (ctx)=>{
    const param = ctx.requst.query;
    const {id} = param;
    if(!id){
        return ctx.body={
            status:400,
            msg:'缺少参数'
        }
    }
    await getUsr(id).then(async res=>{
        if(res.length>0){
            return ctx.body={
                status:200,
                msg:'用户已注册',
                data:res[0]
            }
        }
        return ctx.body={
            status:204,
            msg:'用户未注册'
        }
    },err=>{
        return ctx.body={
            status:400,
            msg:'查询出错'
        }
    })
}