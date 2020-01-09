var express = require('express')
var app = express()
var router = express.Router()
var mysqlConnection = require('../database/db');


router.get("/", checkAuthenticated, (req, res, next) => {
    mysqlConnection.query('SELECT * FROM restaurants.restaurants ORDER BY name', (error, rows, fields) => {
        mysqlConnection.query('SELECT * FROM restaurants.reviews', (error, result, fields) => {
            mysqlConnection.query('SELECT AVG(rating) FROM restaurants.reviews ', (error, avg, fields) => {

            console.log(avg)
            if (!error) {
                res.render("main", { data: rows, review: result, avg: avg });
                console.log()
            } else {
                console.log(error);
            }
        });
        });
    });

});

router.post('/add', (req, res, next) => {
    // ta bort comment och rating, ändrar databas
    var restaurants = { name: req.body.name, comment: req.body.comment, rating: req.body.rating };
    var sql = `INSERT INTO restaurants.restaurants SET ?`;

    console.log(restaurants);
    mysqlConnection.query(sql, restaurants, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });

});

router.post("/review/:id", (req, res) => {
    const newReview = { idrestaurants: req.params.id, comment: req.body.newComment, rating: req.body.newRating };
    mysqlConnection.query('INSERT INTO restaurants.reviews SET ?', newReview, (err, rows) => {

        if (err) throw err;
        console.log(newReview);
        res.redirect("/");
    });
});

router.put('/edit/:id', (req, res) => {
    var id = req.params.id;
    //ändra query så man editar i restaurants.reviews
    mysqlConnection.query(`UPDATE restaurants.reviews SET comment=?, rating=? where idrestaurants= ${id}`,
        [req.body.comments, req.body.ratings], (err, res) => {
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
