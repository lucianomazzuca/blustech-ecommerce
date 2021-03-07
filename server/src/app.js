require('dotenv').config()
const express = require("express");
const session = require('express-session');

const { container } = require('./config/di-setup');

// Routes
const {initProductModule} = require('./module/product/module');
const userRouter = require('./module/user/route/userRoute');
const { initBrandModule } = require('./module/brand/module');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24
  }
}))

initProductModule(app, container)
initBrandModule(app, container);
app.use('/users', userRouter);


app.use((err, req, res, next) => {
  res.status(500);
  res.send(err.message);
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
