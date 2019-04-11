//个人词库操作
const {selWordSql} = require('../model/all-words')

function addWord(id){
  await selWordSql({type:'insert',en:id}).then(res => {
    if(res.length > 0){
      ctx.body={
         status:200,
         msg:'ok'
      }
    }
    return ctx.body={
       status:400,
       msg:'出错了'
    }
  }, err => {
   return ctx.body={
      status:400,
      msg:'查询出错'
   }
  })
}


function deleteWord(id){
   await selWordSql({type:'delete',en:id}).then(res => {
     if(res.length > 0){
       ctx.body={
          status:200,
          msg:'ok'
       }
     }
     return ctx.body={
        status:400,
        msg:'出错了'
     }
   }, err => {
    return ctx.body={
       status:400,
       msg:'查询出错'
    }
   })
 }
 
 function update(id){
   await selWordSql({type:'delete',en:id}).then(res => {
     if(res.length > 0){
       ctx.body={
          status:200,
          msg:'ok'
       }
     }
     return ctx.body={
        status:400,
        msg:'出错了'
     }
   }, err => {
    return ctx.body={
       status:400,
       msg:'查询出错'
    }
   })
 }
 
 const handleSelWord =  async  ctx => {
   const { action ,id} = ctx.body.query

   switch(action){
      case 'add':addWord(id);break;
      case 'delete':deleteWord(id);break;
      case 'update':updateWord(id);break;
      default: ctx.body={
         status:400,
         msg:"操作失败"
      };break;
   }
}
module.exports = { handleSelWord }