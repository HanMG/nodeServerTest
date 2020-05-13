var express = require('express')
var app = express()

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

// url routing
app.get('/', function(req,res){
    // __dirname하면 절대경로를 알아서 표현해준다고함
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req,res){
    res.sendFile(__dirname + "/public/main.html")
})