const express = require('express');

const router = express.Router();

function configureRouter({productController}) {
  router.get('/', productController.index.bind(productController));
  router.get('/:id', productController.getOne.bind(productController));
  router.post('/', productController.save.bind(productController));
  
  return router;
}

module.exports = configureRouter;