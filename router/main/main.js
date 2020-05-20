var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

// main page는 login이 될 때만 ( 즉 세션값이 있을 경우에만 ) 접근이 가능하게 한다.
router.get('/', function(req,res){
    console.log('main js loaded', req.user)
    var id = req.user;
    if(!id) res.render('login.ejs')
     res.render('main.ejs',{'id':id})
})

module.exports = router;