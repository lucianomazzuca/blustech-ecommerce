const express = require("express");
const passport = require("passport");
const loginValidator = require("../middleware/loginValidator");
const loginValidatorRules = require("../middleware/loginValidator");
const registerValidatorRules = require("../middleware/registerValidator");

const router = express.Router();

function configureRouter({ userController }) {
  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    userController.index.bind(userController)
  );
  router.post(
    "/login",
    loginValidatorRules,
    userController.login.bind(userController)
  );
  router.post(
    "/register",
    registerValidatorRules,
    userController.register.bind(userController)
  );
  router.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    userController.getUser.bind(userController)
  );

  return router;
}

module.exports = configureRouter;
