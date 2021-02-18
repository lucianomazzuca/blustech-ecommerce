const express = require("express");
const { container } = require("../../../config/di-setup");

const router = express.Router();

const userController = container.resolve("userController");
router.get("/", userController.index.bind(userController));


module.exports = router;
