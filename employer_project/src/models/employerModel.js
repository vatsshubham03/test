const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EmployerSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: String,
});

module.exports = mongoose.model("Employer", EmployerSchema);
