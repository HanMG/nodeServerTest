var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

router.get('/', function(req,res){
    console.log('form js loaded')
    res.sendFile(path.join(__dirname, "../public/form.html"))
})

module.exports = router;