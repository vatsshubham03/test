var express = require("express");
const validation = require("../helper/validation");
const EmployerController = require("../controller/employer");
const EmployerRoutes = express.Router();

EmployerRoutes.get("/:id", EmployerController.employer);

module.exports = EmployerRoutes;
