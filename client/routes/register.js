var express = require('express')
var app = express()
var router = express.Router()
var bcrypt = require('bcrypt');
const initializePassport = require('../passport-config/passport-config');
const passport = require('passport');
var db = require('../database/db');
initializePassport(passport);


router.get("/", checkNotAuthenticated, (req, res, next) => {
  res.render("register");
});

router.post('/', checkNotAuthenticated, async (req, res, next) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    var sql = `INSERT INTO restaurants.users (username, password) VALUES ?`;
    var values = [
      [req.body.username, hashedPassword],
    ];
    db.query(sql, [values], (err, result) => {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);

    });

    res.redirect('/login')
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
