const express = require("express");

// var multer = require('multer')
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/img/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })

const router = express.Router();

function configureRouter({ productController, uploadMiddleware }) {
  router.get("/", productController.index.bind(productController));
  router.get("/:id", productController.getById.bind(productController));
  router.post(
    "/",
    uploadMiddleware.single("image"),
    productController.save.bind(productController)
  );
  router.delete("/:id", productController.delete.bind(productController));
  // router.post('/', upload.single('image'), productController.save.bind(productController))
  return router;
}

module.exports = configureRouter;
