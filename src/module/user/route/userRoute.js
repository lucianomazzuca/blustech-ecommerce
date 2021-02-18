const express = require("express");
const { container } = require("../../../config/di-setup");

const router = express.Router();

// const userController = container.resolve("UserController");

// router.get("/", userController.index.bind(userController));

// console.log(UserController);

module.exports = router;
