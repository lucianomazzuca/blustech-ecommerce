require('dotenv').config()
const express = require("express");
const session = require('express-session');
const cors = require('cors')
const passport = require('passport');

const { container } = require('./config/di-setup');

// Routes
const {initProductModule} = require('./module/product/module');
const userRouter = require('./module/user/route/userRoute');
const { initBrandModule } = require('./module/brand/module');

const app = express();

app.use(express.static('public'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24
  }
}))

// Passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


initProductModule(app, container)
initBrandModule(app, container);
app.use('/users', userRouter);


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports = app;
