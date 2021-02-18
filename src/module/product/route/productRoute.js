const express = require('express');
const { container } = require("../../../config/di-setup");

const router = express.Router();

const productController = container.resolve('productController');

router.get('/', productController.index.bind(productController));
router.get('/:id', productController.getOne.bind(productController))

module.exports = router;