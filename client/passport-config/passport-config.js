const localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var mysqlConnection = require('../database/db');

// var name = 'yde';
// const user = mysqlConnection.query(`SELECT * FROM restaurants.users WHERE username = '${name}'`);
// console.log(user)


function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser = async (username, password, done) => {
        let user;
        mysqlConnection.query('SELECT * FROM philip.users WHERE username = ?',[username], (error, rows, fields) => {
            user = rows[0];

            if (user == null) {
                console.log('no user')
                return done(null, false, {message: 'No user with that username'});
            }
    
            try {
                bcrypt.compare(password, user.password, (err, auth) => {
                    if (auth){
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                })

    
            } catch (error) {
                return (error);
            }
        });
        
    }

    passport.use(new localStrategy({usernameField: 'username'} , authenticateUser));
    passport.serializeUser((user, done) => done(null, user.idusers));
    passport.deserializeUser((id, done) => {
        mysqlConnection.query("select * from users where idusers = " + id, (err,rows) => {	
			return done(err, rows[0]);
    });
})
};
module.exports = initialize;
