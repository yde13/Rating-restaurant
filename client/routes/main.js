var express = require('express')
var app = express()
var router = express.Router()
var mysqlConnection = require('../database/db');


router.get("/", checkAuthenticated, (req, res, next) => {
    mysqlConnection.query('SELECT * FROM restaurants.restaurants ORDER BY name', (error, rows, fields) => {
        mysqlConnection.query('SELECT * FROM restaurants.restaurants ORDER BY rating', (error, result, fields) => {
            if (!error) {
                res.render("main", { data: rows, result: result, username: req.body.username });
            } else {
                console.log(error);
            }
        });
    });

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

router.put('/edit/:id', (req, res) => {
    var id = req.params.id;
    mysqlConnection.query(`UPDATE restaurants.restaurants SET name=?, comment=?, rating=? where idrestaurants= ${id}`,


        [req.body.names, req.body.comments, req.body.ratings], (err, res) => {
            if (err) throw err;
        })
    res.redirect("/")
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    var sql = 'DELETE FROM `restaurants` WHERE `idrestaurants`=?';
    mysqlConnection.query(sql, [req.params.id], (error, results, fields) => {

    });
    res.json({
        data: 'done'
    })

});


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}



module.exports = router;
