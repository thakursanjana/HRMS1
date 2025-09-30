import express from "express";
import LeaveRequest from "../models/leaverequest.js";

const router = express.Router();

// User applies for leave
router.post("/", async (req, res) => {
  try {
    const newLeave = new LeaveRequest(req.body);
    const saved = await newLeave.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin updates status
router.put("/:id", async (req, res) => {
  try {
    const updated = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all leave requests
router.get("/", async (req, res) => {
  try {
    const requests = await LeaveRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
