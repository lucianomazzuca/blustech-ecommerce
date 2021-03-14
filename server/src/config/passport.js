const sequelize = require('./db');
const User = sequelize.models.User;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


function configurePassport(userModel) {

}
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findByPk(payload.sub)
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err));
});

module.exports = (passport) => {
  passport.use(strategy);
}