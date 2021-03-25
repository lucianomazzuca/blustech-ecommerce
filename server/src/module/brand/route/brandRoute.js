const express = require("express");
const passport = require("passport");
const { brandValidatorRules, validationHandler } = require('../validations/validator');

const router = express.Router();

function configureRouter({ brandController }) {
  router.get("/", brandController.index.bind(brandController));
  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    brandValidatorRules,
    validationHandler,
    brandController.save.bind(brandController)
  );

  return router;
}

module.exports = configureRouter;
