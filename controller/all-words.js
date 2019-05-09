//对系统词库的操作
const wordSql = require('../model/all-words')

const searchWord = async ctx => {
  const {word} = ctx.request.query
  if(!word){
    return ctx.body={
        status:401,
        msg:'缺少参数'
      }
  }
  await wordSql({type:'search',en:word}).then(res => {
    ctx.body = {
      status:200,
      msg: res[0]
    }
  }, err => {
    return ctx.body={
      status:400,
      msg:'查询出错'
    }
   })
}

const addWord = async ctx =>{
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


const deleteWord = async ctx => {
   const {word} = ctx.request.body
   await wordSql({...word, type:'delete'}).then(res => {
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
 
 const updateWord = async ctx => {
   const {word} = ctx.request.body
   await wordSql({...word, type:'update'}).then(res => {
     if(res.length > 0){
      return ctx.body={
          status:200,
          msg:'更新成功'
       }
     }
   }, err => {
    return ctx.body={
       status:400,
       msg:'查询出错'
    }
   })
 }
 const searchWordById = async ctx => {
  const {id} = ctx.request.query
  if(!id){
    return ctx.body={
        status:401,
        msg:'缺少参数'
      }
  }
  await wordSql({type:'search-by-id',id}).then(res => {
    ctx.body = {
      status:200,
      msg: res[0]
    }
  }, err => {
    return ctx.body={
      status:400,
      msg:'查询出错'
    }
   })
 }
module.exports = {
   addWord,
   deleteWord,
   updateWord,
   searchWord,
   searchWordById
}