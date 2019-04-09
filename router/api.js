const router =  require('kos-router')();
const {signin} = require('../controller/sign-in')

router.get('/signin',signin);