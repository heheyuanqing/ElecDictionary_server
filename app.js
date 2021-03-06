const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router/api.js')

const app = new Koa()

app.use(bodyParser({}))

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', `${ctx.request.header.origin}`)
  ctx.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  ctx.set(
    'Access-Control-Allow-Headers',
    'x-requested-with, accept, origin, content-type, authorization'
  )
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Max-Age', 300)

  if (ctx.request.method === 'OPTIONS') {
    ctx.body = {
      msg: 'preFlighted requested is ok!',
    }
    return
  }
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080, () => {
  console.log(`listening on http://localhost:8080`)
})