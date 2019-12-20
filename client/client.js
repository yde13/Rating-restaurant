var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');


var loginRouter = require("./routes/login");
var mainRouter = require("./routes/main");
// var Router = require("./routes/login");
// var uploadRouter = require("./routes/upload");
// var registerRouter = require("./routes/register");



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/main', mainRouter);
// app.use("/login", loginRouter);
// app.use("/upload", uploadRouter);
// app.use("/register", registerRouter);

server.listen(3000);
console.log("lyssnar på app: 3000")

module.exports = app;