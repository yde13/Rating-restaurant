var express = require('express')
var app = express()
var router = express.Router()
var mysqlConnection = require('../database/db');

router.get("/", (req, res, next) => {
    mysqlConnection.query('SELECT * FROM restaurants.restaurants ORDER BY name', (error, rows, fields) => {
        mysqlConnection.query('SELECT * FROM restaurants.restaurants ORDER BY rating DESC LIMIT 5', (error, result, fields) => {
        if (!error) {
            res.render("main", { data: rows, result: result });
        } else {
            console.log(error);
        }
    });
});




    // 'SELECT AVG(ratings) FROM restaurants.restaurants'

    // SELECT MAX(ratings) FROM restaurants.restaurants;

    // SELECT idrestaurants, SUM(ratings) FROM restaurants.restaurants GROUP BY idrestaurants;
});

router.post('/add', (req, res, next) => {
    var sql = `INSERT INTO restaurants.restaurants (name, comment, rating) VALUES ?`;
    var restaurants = [
        [req.body.name, req.body.comment, req.body.rating], 
    ];

    console.log(restaurants);
    mysqlConnection.query(sql, [restaurants], (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.redirect('/');
      });
});

router.put('/edit', (req, res) => {
    var sql = 'UPDATE `restaurants.restaurants` SET `name`=?,`comment`=?,`rating`=? where `idrestaurants`=?'
    var restaurants = [
        [req.body.name, req.body.comment, req.body.rating], 
    ];
    connection.query(sql, [restaurants], (error, results, fields) => {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });


//rest api to delete record from mysql database
router.delete('/delete', (req, res) => {
    console.log(req.body);
    var sql = 'DELETE FROM `restaurants.restaurants` WHERE `idrestaurants`=?';
    connection.query(sql, [req.body.id], (error, results, fields) => {
       if (error) throw error;
       res.end('Record has been deleted!');
     });
 });
 

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}



module.exports = router;
