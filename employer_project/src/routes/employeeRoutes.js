var express = require("express");
const validation = require("../helper/validation");
const JWT = require("../helper/jwt");
const EmployeeController = require("../controller/employee");
const EmployeeRouters = express.Router();
EmployeeRouters.use(JWT.verifyToken);

EmployeeRouters.post(
  "/create",
  validation.employeeCreate,
  EmployeeController.create
);
EmployeeRouters.put(
  "/update",
  validation.employeeCreate,
  EmployeeController.update
);
EmployeeRouters.delete(
  "/delete/:email",
  validation.email,
  EmployeeController.delete
);
EmployeeRouters.get("/:email", EmployeeController.user);
EmployeeRouters.get("/allEmployee", EmployeeController.users);

module.exports = EmployeeRouters;
