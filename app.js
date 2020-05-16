var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

// 루트에 config라는 하위폴더를 만들고 모듈로 만들어 exports했고
var dbconfig = require('./config/database.js')
// 이를 가지고 연결
var connection = mysql.createConnection(dbconfig)
connection.connect()

// 동기가 다 되고 나서 비동기가 시작된다.
app.listen(3000, function(){
    console.log("start!!! express server on port 3000")
});

// 동기 테스트
/*for(var i = 0; i< 100; i++){
console.log('end of server code...')
}*/

// static소스 위치 설정
app.use(express.static('public'))

// bodyParser 설정 ( json형태, 인코딩되서온 형태 처리 )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// view engine (template 설정)
app.set('view engine', 'ejs')

// url routing
app.get('/', function(req,res){
    // __dirname하면 절대경로를 알아서 표현해준다고함
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req,res){
    res.sendFile(__dirname + "/public/main.html")
})

app.post('/email_post',function(req,res){
    // 오브젝트 형태
    //console.log(req.body)

    // 이메일 정보
    //console.log(req.body.email)

    //res.send("<h1>welcome!</h1>" + req.body.email)
    // email.ejs를 찾아서 해당 데이터를 보내줌
    res.render('email.ejs',{'email' : req.body.email})

});

// ajax
app.post('/ajax_send_email',function(req,res){
    /*console.log(req.body.email)
    // 원래는 뒤에 처리전에 입력받은 값에 대한 체크를 해야함 => select or insert from DB
    var responseData = {'result': 'ok', 'email': req.body.email}
    res.json(responseData);*/

    var email = req.body.email;
    var responseData = {};

    var query = connection.query('select name from tbl_user where email="'+email+'"', function(err,rows){
        if(err) throw err;
        if(rows[0]) {
            //console.log(rows[0].name)
            responseData.result = "ok";
            responseData.name = rows[0].name;
        }else{
            responseData.result = "none";
            responseData.name = "";
            console.log('none : '+rows[0])
        }
        res.json(responseData)
    })
});