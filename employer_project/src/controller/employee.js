const bcrypt = require("bcrypt");
const EmployeeModel = require("../models/employeeModel");
const axios = require("axios");
const constant = require("../constant");
const { response } = require("express");
const saltRounds = 10;

module.exports = {
  create: async (req, res) => {
    try {
      const { name, email, mobile, age, salary, createdBy } = req.body;
      console.log("value", req.body);
      const password = `${name.substr(0, 4)}${`${mobile}`.substr(-4)}`;
      console.log("i am here", `${constant.employee_url}/employee/create`);
      axios
        .post(`${constant.employee_url}/employee/create`, {
          name,
          email,
          mobile,
          age,
          salary,
          createdBy,
          password,
        })
        .then(async (response) => {
          console.log("employee created", response);
          const hashedPassword = await bcrypt
            .hash(password, saltRounds)
            .catch((error) => {
              throw new Error(`Error hashing password: ${error.message}`);
            });
          const employee = new EmployeeModel({
            name,
            email,
            mobile,
            age,
            salary,
            createdBy,
            password: hashedPassword,
          });
          const createdEmployee = await employee.save().catch((error) => {
            throw new Error(`Error saving employee data: ${error.message}`);
          });
          return res.status(201).json({
            message: "employee created successfully",
            staus: 201,
            data: createdEmployee,
          });
        });
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong. Please try again after sometime",
        error: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const { name, email, mobile, age, salary } = req.body;

      const updatedEmployee = await EmployeeModel.updateOne(
        { email },
        { name, mobile, age, salary }
      ).catch((error) => {
        return res.status(400).json({
          status: 400,
          message: "Error occured while creating employee",
          error: error,
        });
      });
      if (!updatedEmployee) {
        return res.status(400).json({
          status: 400,
          message: "Employee not found.",
          error: error,
        });
      }
      return res.status(200).json({
        message: "employee updated successfully",
        staus: 200,
        data: updatedEmployee,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again after sometime",
        error: error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { email } = req.params;
      const deletedEmployee = await EmployeeModel.deleteOne({ email }).catch(
        (error) => {
          return res.status(400).json({
            status: 400,
            message: "Error occured while deleting employee",
            error: error,
          });
        }
      );
      if (!deletedEmployee) {
        return res.status(400).json({
          status: 400,
          message: "Employee not found",
          error: error,
        });
      }
      return res.status(200).json({
        message: "employee deleted successfully",
        staus: 200,
        data: deletedEmployee,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again after sometime",
        error: error,
      });
    }
  },
  user: async (req, res) => {
    try {
      const { email } = req.params;
      const employee = await EmployeeModel.findOne({ email });
      if (!employeeFound) {
        return res.status(400).json({
          status: 400,
          message: "Employee not found",
          error: error,
        });
      }
      return res.status(200).json({
        message: "employee found successfully",
        staus: 200,
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again after sometime",
        error: error,
      });
    }
  },
  users: async (req, res) => {
    try {
      const { createdBy } = req.body;
      const employees = await EmployeeModel.find({ createdBy });
      if (!employees.length) {
        return res.status(400).json({
          status: 400,
          message: "No employee yet registered",
          error: error,
        });
      }
      return res.status(200).json({
        message: "employee found successfully",
        staus: 200,
        data: employees,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again after sometime",
        error: error,
      });
    }
  },
};
