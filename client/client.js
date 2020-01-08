if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var port = 3000;
const bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
var db = require('./database/db');




const initializePassport = require('./passport-config/passport-config');
initializePassport(
    passport, 
    username => user.find(user => user.username === username),
    id => user.find(user => user.id === id)
);



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(flash())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var loginRouter = require("./routes/login");
var mainRouter = require("./routes/main");
var registerRouter = require("./routes/register");


app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use("/register", registerRouter);





server.listen(port, () => console.log(`App listening to port ${port}`));

