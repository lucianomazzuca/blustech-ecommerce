const express = require("express");
const router = express.Router();
const productValidatorRules = require("../validator/validator");
const validationFileHandler = require("../../../utils/validationFileHandler");
const passport = require("passport");
const checkAdmin = require("../../../../../client/src/middleware/checkAdmin");

function configureRouter({ productController, uploadMiddleware }) {
  router.get("/", productController.index.bind(productController));
  router.get("/:id", productController.getById.bind(productController));
  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    uploadMiddleware.single("image"),
    productValidatorRules,
    validationFileHandler,
    productController.save.bind(productController)
  );
  router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    uploadMiddleware.single("image"),
    productValidatorRules,
    validationFileHandler,
    productController.edit.bind(productController)
  );
  router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    productController.delete.bind(productController)
  );

  return router;
}

module.exports = configureRouter;
