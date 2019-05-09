/** 
 * 基于用户的协同过滤算法（适用于用户比项目少的情况）
 * 例如：A收藏1，2，3；B收藏1；则A与B有相似的收藏单词，所以向B推荐2，3
 * 1.计算用户之间的相似度 --AB相同的收藏单词数/根号A的单词数*B的单词数
 * 2.计算用户对单词的兴趣度  --AB的相似度*B对目标单词的兴趣度（0/1）
 * 
*/
const getUsr = require("../model/usr")
const selWordSql = require('../model/sel-words')

const getSameTimes = (arr_a,arr_b) => {
  let times = 0
  if(arr_a.length < arr_b.length){
    arr_a.forEach(val => {
      for(let i=0;i<arr_b.length;i++){
        if(arr_b[i].word_id === val.word_id){
          times++
        }
      }
    })
  } else {
    arr_b.forEach(val => {
      for(let i=0;i<arr_a.length;i++){
        if(arr_a[i].word_id === val.word){
          times++
        }
      }
    });
  }
  return times
}

const promise1 = () => {
  return new Promise((resolved,rejected) => {
    getUsr({type:'recommend'}).then(res => {
      resolved(res)
    })
  })
}

const promise2 = (name)=> {
  return new Promise((resolved,rejected) => {
    selWordSql({type:'get', name:name}).then(res => {
      resolved(res)
      }, err => {
        return ;
      })
  })
}
const getTotal = async (name) => {
  let total = await promise2(name)
  return total
}
const recommend = async ctx => {
  const {name} = ctx.request.body
  console.log(name)
  const all_usrs = await promise1()
  let total = await promise2(name)
  let usrs = all_usrs.filter(node => {
    if(node.usr_no !== name){
      return node
    }
  })

  for(let i=0;i<usrs.length;i++){
    usrs[i].total = await promise2(usrs[i].usr_no)
  }  
  // 计算用户相似度
  usrs.map(node => {
    let times = getSameTimes(node.total,total)
    let level = times/Math.sqrt(total.length*node.total.length)
    console.log(level)
    node.sl = level
  })


  let recommend = []
  usrs.map(node => {
    if(node.sl > 0) {
      node.total.forEach(word => {
        let flag=0
        for(let i=0;i<total.length;i++){
          if(total[i].word_id === word.word_id){
            flag=1
          }
        }
        if(flag!==1){recommend.push({...word,same:0})}
      })
    }
  }) 

  //去重
  console.log(recommend)
  
  // 计算用户对单词的兴趣度
  recommend.forEach(word => {
    let same = 0 

    usrs.map(usr => {
      let r = 0
     
      for(let i=0;i<usr.total.length;i++){
        if(word.word_id === usr.total[i].word_id){
          r = 1
          break
        }
      }
      same += usr.sl * r
    })
    word.same += same
  })
   
  return ctx.body = {
    data:recommend
  }

}

module.exports = {recommend}