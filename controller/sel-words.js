//个人词库操作
const selWordSql = require('../model/sel-words')

// 创建个人词库
const createSelWord = async ctx => {
  const {name} = ctx.request.body
  console.log('createSelWord '+name)
  await selWordSql({type:'create', name:name}).then(res => {
    return ctx.body={
       status:200,
       msg:'sucess'
    }  
  }, err => {
   console.log(err)
  return ctx.body={
     status:400,
     msg:'查询出错'
  }
 })
}

// 获取词库单词
const getAllSelWords = async ctx => {
 const {name} = ctx.request.query
 console.log('getAllSelwords'+name)
 await selWordSql({type:'get', name:name}).then(res => {
   //  console.log(res)
   return ctx.body={
       status:200,
       word:res
   }  
 }, err => {
  return ctx.body={
     status:400,
     msg:'查询出错'
  }
 })
}

// 添加单词
const addSelWord = async ctx => {
  const {word,name} = ctx.request.body
  console.log('addSelWord '+name)
  await selWordSql({type:'add', word, name:name}).then(res => {
    return ctx.body={
        status:200,
        msg:'添加成功'
    }  
  }, err => {
   return ctx.body={
      status:400,
      msg:'查询出错'
   }
  })
}

// 移除单词
const deleteSeleWord = async ctx => {
   const {en,name} = ctx.request.body
   console.log('deleteSeleWord '+name)
   await selWordSql({type:'delete', en, name:name}).then(res => {
     return ctx.body={
          status:200,
          msg:'ok'
       }
   }, err => {
    return ctx.body={
       status:400,
       msg:'查询出错'
    }
   })
 }

// 修改单词学习进度 
const updateStuProcess = async ctx => {
   const {word,name,process} = ctx.body
   console.log('updateStuProcess '+name)
   await selWordSql({type:'update-process',word,name,process}).then(res => {
      return ctx.body = {
         status:200,
         msg:'ok'
      },err => {
         return ctx.body = {
           status:400,
           msg:'查询出错'
         }
      }
   })
}

// 测试题
const  examSubject = async ctx => {
  const {name} = ctx.query
  await selWordSql({type:'test-word',name}).then(res => {
   return ctx.body = {
      status:200,
      msg:'ok',
      data:res
   }
  },err => {
     return ctx.body = {
        status:400,
        msg:'查询出错'
     }
  })
}

// 学习单词表
const  stuSubject = async ctx => {
   const {name} = ctx.query
   await selWordSql({type:'stu-word',name}).then(res => {
    return ctx.body = {
       status:200,
       msg:'ok',
       data:res
    }
   },err => {
      return ctx.body = {
         status:400,
         msg:'查询出错'
      }
   })
 }

const updateStuSelwords =async ctx => {
  const {name,words} = ctx.request.body
  console.log('update'+name)
  await selWordSql({type:'update-stu-process',word:words,name}).then(res => {
     return ctx.body = {
        status:200,
        msg:'ok',
        data:res
     }
  },err => {
     return ctx.body = {
        status:400,
        msg:'查询出错'
     }
  })
}

const updateTestSelwords =async ctx => {
   const {name,words} = ctx.request.body
   await selWordSql({type:'update-test-process',word:words,name:name}).then(res => {
      return ctx.body = {
         status:200,
         msg:'ok',
         data:res
      }
   },err => {
      return ctx.body = {
         status:400,
         msg:'查询出错'
      }
   })
 }

module.exports =  {
  deleteSeleWord,
  addSelWord,
  getAllSelWords,
  createSelWord,
  examSubject,
  stuSubject,
  updateStuSelwords,
  updateTestSelwords
}