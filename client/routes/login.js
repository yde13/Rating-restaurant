var express = require('express')
var app = express()
var router = express.Router()

app.get("/"), function (req, res, next){
    res.send("./views/login.html")
}