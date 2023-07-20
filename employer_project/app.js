var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const DB_NAME = "employer_db";
const EmployerRoutes = require("./src/routes/employerRoutes");
const AuthRouters = require("./src/routes/authRoutes");
const EmployeeRouters = require("./src/routes/employeeRoutes");
const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/employer", EmployerRoutes);
app.use("/auth", AuthRouters);
app.use("/employer/employee", EmployeeRouters);

mongoose
  .connect(
    `mongodb+srv://vatsshubham037:IwSVQpiOBigzt8v9@cluster0.5eyjtof.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen("8080", () => {
      console.log("server started on 8080");
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
