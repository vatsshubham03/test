var express = require("express");
const validation = require("../helper/validation");
const AuthController = require("../controller/auth");
const AuthRouters = express.Router();

AuthRouters.post("/login", validation.employeeLogin, AuthController.login);

module.exports = AuthRouters;
