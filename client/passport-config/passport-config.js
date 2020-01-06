const localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');


function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser = async (username, password, done) => {
        const user = 
            getUserByUsername(username);
          ;
        if (user == null) {
            return done(null, false, {message: 'No user with that username'});
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect'});
            }

        } catch (error) {
            return (error);
        }
    }

    passport.use(new localStrategy({usernameField: 'username', passReqToCallback : true } , authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
       return done(null, getUserById(id));
    });
}

module.exports = initialize;
