import mongoose from "mongoose";

const LeaveRequestSchema = new mongoose.Schema({
  employeeName:{
    type: String,
    required: true
  }, 
  
  department: String,
  type: String,
  from: String,
  to: String,
  reason: String,
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("LeaveRequest", LeaveRequestSchema);
