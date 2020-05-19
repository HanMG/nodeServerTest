var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
// 로그인을 위해
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy


// 루트에 config라는 하위폴더를 만들고 모듈로 만들어 exports했고
var dbconfig = require('../../config/database.js')
// 이를 가지고 연결
var connection = mysql.createConnection(dbconfig)
connection.connect()

router.get('/',function(req,res){
    console.log('get join')
    //res.sendFile(path.join(__dirname,'../../public/join.html'))
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('join.ejs',{'message':msg})
})

// 세션을 저장하는 처리
passport.serializeUser(function(user, done) {
    console.log('passport session save : ', user.id)
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    console.log('passport session get id : ', id)
    done(null, id)
})

// 이메일이 존재하는지 구분
passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
}, function(req, email, password, done){
   var query = connection.query('select * from tbl_user where email = ?', [email], function(err,rows){
        if(err) return done(err);
        if(rows.length){
            console.log('existed user')
            return done(null, false, {message: 'this email is already exist'})
        } else{
            var sql = {email: email, pw: password}
            var query = connection.query('insert into tbl_user set ?',sql,function(err,rows){
                return done(null, {'email': email, 'id': rows.insertId})
            })
        }
   })
}
))

// 성공, 실패시 리다이렉트
router.post('/',passport.authenticate('local-join',{
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true
}))

module.exports = router;