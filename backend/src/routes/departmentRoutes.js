import express from "express";
const router = express.Router();

// Dummy data (ye baad me DB se laa sakte ho)
let departments = [
  { id: 1, name: "HR" },
  { id: 2, name: "IT" },
  { id: 3, name: "Finance" },
  // { id: 4, name: "Operations" },
];

// ✅ Get all departments
router.get("/", (req, res) => {
  res.json(departments);
});

// ✅ Add new department
router.post("/", (req, res) => {
  const newDept = { id: departments.length + 1, name: req.body.name };
  departments.push(newDept);
  res.status(201).json(newDept);
});

// ✅ Delete department
router.delete("/:id", (req, res) => {
  departments = departments.filter((d) => d.id !== parseInt(req.params.id));
  res.json({ message: "Department deleted" });
});

export default router;
