const express = require('express');

const router = express.Router();

const ProductController = require('../controller/product.controller');

router.get('/', ProductController.index);

module.exports = router;