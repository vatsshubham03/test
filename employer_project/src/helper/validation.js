const emailRejex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const mobileRejex = /^[0-9]{10}$/;

module.exports = {
  employerSignUp: (req, res, next) => {
    const { name, mobile, email, password } = req.body || {};

    const errors = [];

    if (!name) {
      errors.push("Name is required.");
    }
    if (!(email && emailRejex.test(email))) {
      errors.push("Valid email is required.");
    }
    if (!(mobile && mobileRejex.test(mobile))) {
      errors.push("valid mobile number is required.");
    }
    if (!password) {
      errors.push("Password is required");
    }
    if (errors.length) {
      res.status(400).json({
        message: "invalid data.",
        status: 400,
        error: errors,
      });
    } else {
      next();
    }
  },
  employerLogin: (req, res, next) => {
    const { email, password } = req.body || {};

    let errors = [];

    if (!(email && emailRejex.test(email))) {
      errors.push("Valid email is required.");
    }
    if (!password) {
      errors.push("Password is required");
    }
    if (errors.length) {
      res.status(400).json({
        message: "invalid data",
        status: 400,
        error: errors,
      });
    } else {
      next();
    }
  },
  employeeCreate: (req, res, next) => {
    const { name, email, mobile, age, salary } = req.body;

    const errors = [];

    if (!name) {
      errors.push("Name is required.");
    }
    if (!(email && emailRejex.test(email))) {
      errors.push("Valid email is required.");
    }
    if (!(mobile && mobileRejex.test(mobile))) {
      errors.push("valid mobile number is required.");
    }
    if (!(age && age >= 18)) {
      errors.push("Age is required & should be greater than 18 years.");
    }
    if (!salary) {
      error.push("salary is required.");
    }
    if (errors.length) {
      return res.status(400).json({
        message: "invalid data.",
        status: 400,
        error: errors,
      });
    } else {
      next();
    }

    next();
  },
  email: (req, res, next) => {
    const { email } = req.params;
    let error = "";
    if (!(email && emailRejex.test(email))) {
      error = "Valid email is required.";
    }
    if (error) {
      res.status(400).json({
        message: "Bad Request.",
        status: 400,
        error: errors,
      });
    } else {
      next();
    }
  },
};
