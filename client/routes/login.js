var express = require('express')
var router = express.Router()
const passport = require('passport');
const methodOverride = require('method-override');



router.get("/",  checkNotAuthenticated, (req, res, next) => {
    res.render("login", {
      
    });
});

router.post('/', checkNotAuthenticated, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}



module.exports = router;
