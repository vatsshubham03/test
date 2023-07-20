const bcrypt = require("bcrypt");
const saltRounds = 10;

const Employer = require("../models/employerModel");
const JWT = require("../helper/jwt");

module.exports = {
  signup: async (req, res) => {
    try {
      const { name, mobile, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const employer = new Employer({
        name,
        email,
        mobile,
        password: hashedPassword,
      });
      const createdEmployer = await employer.save().catch((error) => {
        res.status(400).json({
          status: 400,
          message: "Error occured while creating employer",
          error: error,
        });
      });
      delete createdEmployer.password;
      res.status(201).json({
        message: "Employer created successfully",
        data: createdEmployer,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again after sometime",
        error: error,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const employer = await Employer.findOne({ email });
      if (!employer) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      const passwordMatch = await bcrypt.compare(password, employer.password);

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
