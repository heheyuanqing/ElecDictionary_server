const router =  require('koa-router')();
const { signIn } = require('../controller/usr-sign-in')
const { signUp } = require('../controller/usr-sign-up')
const { handleSelWord } = require('../controller/sel-words')
const { handleWord } = require('../controller/all-words')

const routers =  router.get('/signin',signIn)
                       .post('/signup',signUp)
                       .get('/selword',handleSelWord)
                       .get('/word',handleWord)

module.exports = routers