var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var main =  require('./main/main')
var form = require('./form/form')
var email = require('./email/email')
var join = require('./join/index')
var login = require('./login/index')
var logout = require('./logout/index')
var movie = require('./movie/index')

// url routing
router.get('/', function(req,res){
    // __dirname하면 절대경로를 알아서 표현해준다고함
    res.sendFile(path.join(__dirname,"../public/main.html"))
})

router.use('/main', main)// /main으로 들어오면 main에 대한 라우터 정의를 쓰라고 함
router.use('/email', email)
router.use('/form', form)
router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)
router.use('/movie', movie)

module.exports = router;