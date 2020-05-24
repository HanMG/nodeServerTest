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

router.get('/list',function(req,res){
    res.render('movie.ejs')
})

// 1. /movie , GET
router.get('/',function(req,res){
    var responseData = {};

        var query = connection.query('select title from movie', function(err,rows){
            if(err) throw err;
            if(rows.length) {
                console.log(rows);
                responseData.result = 1;
                responseData.data = rows;
            }else{
                responseData.result = 0;
            }
            res.json(responseData);
        })
})

// 2. /movie , POST
router.post('/',function(req,res){
    
})

module.exports = router