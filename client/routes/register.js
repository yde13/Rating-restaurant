var express = require('express')
var app = express()
var router = express.Router()
var bcrypt = require('bcrypt');
const passport = require('passport');
var db = require('../database/db');


router.get("/", checkNotAuthenticated, (req, res, next) => {
  res.render("register");
});

router.post('/', checkNotAuthenticated, async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password ) {
    console.log('åhnej');

    errors.push();
  }
  
  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    var sql = `INSERT INTO restaurants.users (username, password) VALUES ?`;
    const values = [
      [username, hashedPassword],
    ];
    db.query(sql, [values], (err, result) => {
      if (err)  throw err;
    });

    res.render('login', {
      username: req.body.username,
      password: hashedPassword,
    })
  } catch{
    res.redirect('/register')
  }
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = router;
