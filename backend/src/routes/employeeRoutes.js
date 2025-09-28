import express from "express";
import Employee from "../models/employee.js";

const router = express.Router();

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD new employee
router.post("/", async (req, res) => {
  try {
    // Check if employee already exists by employeeId (better than just name)
    const existing = await Employee.findOne({ employeeId: req.body.employeeId });
    if (existing) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Save everything sent from frontend
    const newEmployee = new Employee(req.body);
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (err) {
    console.error("Error saving employee:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
