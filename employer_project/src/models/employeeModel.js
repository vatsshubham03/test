const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  salary: { type: Number, required: true },
  createdBy: { type: String, required: true },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
