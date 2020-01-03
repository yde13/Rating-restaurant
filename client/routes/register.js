var express = require('express')
var app = express()
var router = express.Router()
var bcrypt = require('bcrypt');
const initializePassport = require('../passport-config/passport-config');
const passport = require('passport');
initializePassport(passport);


var users = [];

router.get("/", checkNotAuthenticated, (req, res, next) =>{
    res.render("register");
});

router.post('/', checkNotAuthenticated ,async (req, res, next) => {
    try{

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword
          });
          res.redirect('/login')
    } catch{
        res.redirect('/register')
    }
    console.log(users)
});

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

module.exports = router;
