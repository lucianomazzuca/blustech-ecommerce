require('dotenv').config()
const express = require("express");
const session = require('express-session');
const cors = require('cors')
const passport = require('passport');

const { container } = require('./config/di-setup');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { 
//     maxAge: 1000 * 60 * 60 * 24
//   }
// }))

// Routes
const {initProductModule} = require('./module/product/module');
const userRouter = require('./module/user/route/userRoute');
const { initBrandModule } = require('./module/brand/module');

// Passport
// require('./config/passportSession');
// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// })


initProductModule(app, container)
initBrandModule(app, container);
app.use('/users', userRouter);


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports = app;
