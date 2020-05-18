var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// 루트에 config라는 하위폴더를 만들고 모듈로 만들어 exports했고
var dbconfig = require('../../config/database.js')
// 이를 가지고 연결
var connection = mysql.createConnection(dbconfig)
connection.connect()

router.get('/',function(req,res){
    console.log('get join')
    res.sendFile(path.join(__dirname,'../../public/join.html'))
})

router.post('/',function(req,res){
    console.log('post join');
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.password;

    // Escaping
    var sql = {email: email, name: name, pw: passwd};
    var query = connection.query('insert into tbl_user set ?',sql,function(err,rows){
        if (err) {throw err;}
        //console.log("ok db insert => ", "번호 : "+rows.insertId, "/ 이름 : "+name);
        else res.render('welcome.ejs', {'name': name, 'id':rows.insertId} )
    })
})

module.exports = router;