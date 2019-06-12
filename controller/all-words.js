//对系统词库的操作
const wordSql = require('../model/all-words')
const cheerio = require("cheerio")
const http = require("http")
let url = "http://www.iciba.com/"

const searchByJinshan = async (word)=> {
   let msg 
   msg = await jinshanApi(word)
   return msg
}
const jinshanApi = word => {
  return new Promise((resolved,rejected) => {
    http.get(url + word,async function (res) {
      let html = ''
      res.on('data', function (data) {
        html += data
      })
      res.on('end', function () {
        symbol = getMore(html)
        resolved(symbol) 
      })
    }).on('error', function () {
      console.log("获取信息失败！")
      rejected('获取信息失败！')
    })
  })
}
const getMore = (html) => {
  let $ = cheerio.load(html);
  let word = $('.in-base-top').find('div').text().trim();
  let cn =$('.base-list')
  console.log(cn)
  return word||cn;
}
const sqlPromise = word => {
  return new Promise((resolved,rejected) => {
    wordSql({type:'search',en:word}).then(res => {
      let msg = res[0]
      if(!msg){
        msg =  searchByJinshan(word)
      } 
      resolved(msg)
    }, err => {
      rejected('查询出错')
     })
  })
}
const searchWord = async ctx => {
  const {word} = ctx.request.query
  if(!word){
    return ctx.body={
        status:401,
        msg:'缺少参数'
      }
  }
  let msg
  msg = await sqlPromise(word)
  if(typeof msg === 'string'){
    let cn = msg
    msg = {en:word,cn}
  }
  return ctx.body = {
    status:200,
    msg
  }
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