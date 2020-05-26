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
    var title = req.body.title;
    var type = req.body.type;
    var grade = req.body.grade;
    var actor = req.body.actor;

    //console.log(title+" "+type+" "+grade+" "+actor);
    var query = connection.query('select * from movie where title = ?', [title], function(err,rows){
            if(err) return done(err);
            if(rows.length){
                console.log('existed title')
                return res.json({'result':0})
            } else{
                var sql = {title, type, grade, actor}
                var query = connection.query('insert into movie set ?',sql,function(err,rows){
                    if(err) throw err
                    return res.json({'result':1})
                })
            }
       })

})

// 3. /movie/:title, GET
router.get('/:title',function(req,res){
    var title = req.params.title;
    console.log("title : ", title);

    var responseData = {};

        var query = connection.query('select * from movie where title = ?',[title],function(err,rows){
            if(err) throw err;
            if(rows[0]) {
                console.log(rows);
                responseData.result = 1;
                responseData.data = rows;
            }else{
                responseData.result = 0;
            }
            res.json(responseData);
        })
})

// 4. /movie:title , DELETE
router.delete('/:title',function(req,res){
    var title = req.params.title;
    console.log("title : ", title);

    var responseData = {};

        var query = connection.query('delete from movie where title = ?',[title],function(err,rows){
            if(err) throw err;
            console.log("rows is ->", rows);
            if(rows.affectedRows > 0) {
                console.log(rows);
                responseData.result = 1;
                responseData.data = title;
            }else{
                responseData.result = 0;
            }
            res.json(responseData);
        })
})

// 5. /movie:title , PUT
router.put('/:title',function(req,res){
    var title = req.body.title;
    var type = req.body.type;
    var grade = req.body.grade;
    var actor = req.body.actor;
    console.log("title : ", title);

    var responseData = {};
        var sql = 'UPDATE movie SET type = ?, actor = ? where title = ?';
        console.log(sql);
        var query = connection.query(sql,[type, actor, title],function(err,rows){
            if(err) throw err;
            console.log("rows is ->", rows);
            if(rows.affectedRows > 0) {
                console.log(rows);
                responseData.result = 1;
                responseData.data = title;
            }else{
                responseData.result = 0;
            }
            res.json(responseData);
        })
})
module.exports = router