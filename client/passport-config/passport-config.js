const localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');


function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser = async (username, password, done) => {
        const user = {
            id: '1577974814327',
            username: 'yde',
            password: '$2b$10$RH1ODf2kqjncQNlhgV8H0eerYIY79M7E9/SOVaaGUNgcpvQ0h79HS'
          };
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
       return done(null, {
        id: '1577974814327',
        username: 'yde',
        password: '$2b$10$RH1ODf2kqjncQNlhgV8H0eerYIY79M7E9/SOVaaGUNgcpvQ0h79HS'
      });
    });
}

module.exports = initialize;
