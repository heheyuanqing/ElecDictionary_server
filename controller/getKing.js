const cheerio = require("cheerio")
const http = require("http")
let url = "http://www.iciba.com/"

const jinshan = async ctx => {
  let {word} = ctx.query
  let data 
  console.log('getKing:'+word)
  data = await searchAPI(word)
  return ctx.body = {
    status:200,
    data
  }
}
const searchAPI = (word) => {
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
const getMore = (html,ctx) => {
    let sym = []
    let $ = cheerio.load(html)
    let base = $('.collins-section').find('.section-prep')
    for(let i=0;i<3;i++){
        let en = $($(base[i]).find('.prep-order').find('.text-sentence')[0]).find('.sentence-item').find('.family-english').find('span').html()
        let cn = $($(base[i]).find('.prep-order').find('.text-sentence')[0]).find('.sentence-item').find('.family-chinese').html()
        sym.push({en:en,cn:cn})
    }
    return sym
}
module.exports = {jinshan}