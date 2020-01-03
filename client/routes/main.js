var express = require('express')
var app = express()
var router = express.Router()
var mysqlConnection = require('../database/db');

router.get("/",  (req, res, next) => {
    mysqlConnection.query('SELECT * FROM restaurants.restaurants',( error, rows, fields) => {
        if (!error){
            // console.log(rows);
            res.render("main", {data: rows});
        } else {
            console.log(error);
        }
    });
    

});

router.post('/', (req, res, next) => {
    
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }

  

module.exports = router;
