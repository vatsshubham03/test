var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRouters = require("./src/routes/authRoutes");
const EmployeeRouters = require("./src/routes/employeeRoutes");
const DB_NAME = "employee_db";
const app = express();
const corsOptions = {
  "Access-Control-Allow-Origin": "*",
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/employee", EmployeeRouters);
app.use("/auth", AuthRouters);

mongoose
  .connect(
    `mongodb+srv://vatsshubham037:IwSVQpiOBigzt8v9@cluster0.5eyjtof.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen("8081", () => {
      console.log("server started on 8081");
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
