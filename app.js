var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// 모든 routing 처리
var router = require('./router/index')


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

// router의 리팩토링
app.use(router)


