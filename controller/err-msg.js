//对系统词库的操作
const erroMsgSql = require('../model/post-erro.js')

const getErroMsg = async ctx => {
  await erroMsgSql({type:'search'}).then(res => {
    ctx.body = {
      status:200,
      msg: res
    }
  }, err => {
    return ctx.body={
      status:400,
      msg:'查询出错'
    }
   })
}

const addErroMsg = async ctx =>{
  const {word} = ctx.request.body
  await wordSql({...word, type:'insert'}).then(res => {
   if(res){
      return ctx.body={
         status:200,
         msg:'添加成功'
      }
    }
  }, err => {
   return ctx.body={
      status:400,
      msg:'添加出错'
   }
  })
}


const deleteErroMsg = async ctx => {
   const {word} = ctx.request.body
   await wordSql({en:word, type:'delete'}).then(res => {
     if(res){
      return ctx.body={
          status:200,
          msg:'删除成功'
       }
     }
   }, err => {
    return ctx.body={
       status:400,
       msg:'查询出错'
    }
   })
 }
 
module.exports = {
   addErroMsg,
   deleteErroMsg,
   getErroMsg
}