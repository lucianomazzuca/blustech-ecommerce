const express = require("express");
const router = express.Router();
const productValidatorRules = require('../validator/validator');
const validationFileHandler = require("../../../utils/validationFileHandler");

function configureRouter({ productController, uploadMiddleware }) {
  router.get("/", productController.index.bind(productController));
  router.get("/:id", productController.getById.bind(productController));
  router.post(
    "/",
    uploadMiddleware.single("image"),
    productValidatorRules,
    validationFileHandler,
    productController.save.bind(productController)
  );
  router.delete("/:id", productController.delete.bind(productController));

  return router;
}

module.exports = configureRouter;
