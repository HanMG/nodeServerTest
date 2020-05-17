var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var main =  require('./router/main')
var form = require('./router/form')
var email = require('./router/email')



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

// router의 모듈화
app.use('/main', main) // /main으로 들어오면 main에 대한 라우터 정의를 쓰라고 함
app.use('/email', email)
app.use('/form', form)

// url routing
app.get('/', function(req,res){
    // __dirname하면 절대경로를 알아서 표현해준다고함
    res.sendFile(__dirname + "/public/main.html")
})