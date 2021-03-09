const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sequelize = require('./db');
const User = sequelize.models.User;
const { validPassword } = require('../utils/password');

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
}

const verifyCallback = async (username, password, done) => {
  User.findOne({ where: { email: username }})
  .then(user => {
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const valid = validPassword(password, user.password);
    if (!valid) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id, function(err, user) {
    done(err, user);
  });
});


// verifyCallback('admin@gmail.com', '123456')


module.exports = passport;