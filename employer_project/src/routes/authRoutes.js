var express = require("express");
const validation = require("../helper/validation");
const AuthController = require("../controller/auth");
const AuthRouters = express.Router();

AuthRouters.post("/signup", validation.employerSignUp, AuthController.signup);
AuthRouters.post("/login", validation.employerLogin, AuthController.login);

module.exports = AuthRouters;
