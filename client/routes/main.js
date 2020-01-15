var express = require('express')
var app = express()
var router = express.Router()
var mysqlConnection = require('../database/db');


router.get("/", checkAuthenticated, (req, res, next) => {
    mysqlConnection.query('SELECT * FROM philip.restaurants ORDER BY name', (error, rows, fields) => {
        mysqlConnection.query('SELECT * FROM philip.reviews', (error, result, fields) => {
            mysqlConnection.query('SELECT AVG(rating) FROM philip.reviews ', (error, avg, fields) => {
                //försöker fixa average av rating beroende på id, men hur? och sen skriva det på korten under restaurangens namn
                
            // console.log(avg)
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
    var restaurants = { name: req.body.name, comment: req.body.comment, rating: req.body.rating };
    var sql = `INSERT INTO philip.restaurants SET ?`;

    console.log(restaurants);
    mysqlConnection.query(sql, restaurants, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });

});

router.post("/review/:id", (req, res) => {
    const newReview = { idrestaurants: req.params.id, comment: req.body.newComment, rating: req.body.newRating };
    mysqlConnection.query('INSERT INTO philip.reviews SET ?', newReview, (err, rows) => {

        if (err) throw err;
        console.log(newReview);
        res.redirect("/");
    });
});

router.put('/edit/:id', (req, res) => {
    var id = req.params.id;
    //ändra query så man editar i restaurants.reviews
    mysqlConnection.query(`UPDATE philip.restaurants SET name=? ,comment=?, rating=? where idrestaurants= ${id}`,
        [req.body.names ,req.body.comments, req.body.ratings], (err, res) => {
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
        if (error) throw error;
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
