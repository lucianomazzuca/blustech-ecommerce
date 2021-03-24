const express = require("express");
const passport = require("passport");

const router = express.Router();

function configureRouter({ brandController }) {
  router.get("/", brandController.index.bind(brandController));
  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    brandController.save.bind(brandController)
  );

  return router;
}

module.exports = configureRouter;
