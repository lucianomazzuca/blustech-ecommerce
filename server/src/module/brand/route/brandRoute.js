const express = require("express");
const passport = require("passport");
const validationHandler = require("../../../utils/validationHandler");
const brandValidatorRules = require("../validations/validator");

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
  router.get("/:id", brandController.getById.bind(brandController));
  router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    brandValidatorRules,
    validationHandler,
    brandController.edit.bind(brandController)
  );
  router.delete('/:id', brandController.delete.bind(brandController));

  return router;
}

module.exports = configureRouter;
