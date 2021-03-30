require('dotenv').config()
const express = require("express");
const session = require('express-session');
const cors = require('cors')
const passport = require('passport');
const configurePassport = require('./config/passport');

const { container } = require('./config/di-setup');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
const {initProductModule} = require('./module/product/module');
const userRouter = require('./module/user/route/userRoute');
const { initBrandModule } = require('./module/brand/module');

// Passport
configurePassport(passport, container.resolve('userRepository'))
app.use(passport.initialize());

initProductModule(app, container)
initBrandModule(app, container);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500);
  res.send(err.message);
  return;
});

module.exports = app;
