const bcrypt = require("bcrypt");
const saltRounds = 10;

const Employee = require("../models/employeeModel");
const JWT = require("../helper/jwt");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      const passwordMatch = await bcrypt.compare(password, employee.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      delete employer.password;
      let payload = {
        email: employer.email,
        name: employer.name,
      };
      const token = await JWT.generateToken(payload);
      if (!token) {
        return res.status(400).json({
          status: 400,
          message: "Error occured while logging In.",
        });
      }
      payload.token = token;

      res.status(200).json({
        status: 200,
        message: "logged in succesfully.",
        data: payload,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again after sometime",
        error: error,
      });
    }
  },
};
