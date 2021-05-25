require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const configurePassport = require("./config/passport");
const mercadopago = require ('mercadopago');

const { container } = require("./config/di-setup");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const { initProductModule } = require("./module/product/module");
const { initBrandModule } = require("./module/brand/module");
const { initCategoryModule } = require("./module/category/module");
const { initCartModule } = require("./module/cart/module");
const { initUserModule } = require("./module/user/module");
const { initPaymentModule } = require('./module/payment/module');

// Passport
configurePassport(passport, container.resolve("userRepository"));
app.use(passport.initialize());

initProductModule(app, container);
initBrandModule(app, container);
initCategoryModule(app, container);
initCartModule(app, container);
initUserModule(app, container);
initPaymentModule(app, container);

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500);
  res.send(err.message);
  return;
});

module.exports = app;
