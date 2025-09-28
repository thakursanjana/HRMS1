import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }, 
  employeeId: { type: String },
  dob: { type: String, required: true },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: { type: String, required: true },
  salary: { type: Number, default: 0 },
  password: { type: String },
  role: { type: String },
});

export default mongoose.model("Employee", employeeSchema);
