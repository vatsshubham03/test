let jwt = require("jsonwebtoken");

const JWT_key = "this is test project@2023";
const JWT_options = {
  expiresIn: 24 * 60 * 60,
};

module.exports = {
  generateToken: (payload) => {
    try {
      let token = jwt.sign(payload, JWT_key, JWT_options);
      return token;
    } catch (error) {
      console.log(error, "error");
      return false;
    }
  },
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.token;

      if (!token) {
        return res.status(401).json({
          message: "Unauthorized User.",
          status: 401,
        });
      }
      const decoded = jwt.verify(token, JWT_key);
      req.body.email = decoded.email;
      next();
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized User.",
        status: 401,
      });
    }
  },
};
