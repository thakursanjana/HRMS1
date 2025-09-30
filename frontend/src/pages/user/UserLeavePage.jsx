import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserLeavePage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: "",
    department: "",
    type: "",
    from: "",
    to: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/leaves");
      setLeaveRequests(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/leaves", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Leave Applied ✅");
      fetchLeaves();
      setFormData({
        employeeName: "",
        department: "",
        type: "",
        from: "",
        to: "",
        reason: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error applying for leave ❌");
    }
  };

  return (
    <div className="p-4">
      {/* ------------ Leave Application Form ------------ */}
      <h3 className="mb-4 fw-bold text-primary">Apply for Leave</h3>
      <div className="card shadow-lg border-0 rounded-3 p-4 mb-5">
        <form onSubmit={handleApply} className="row g-4">
          {/* Employee Name */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Department */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="HR, IT, Finance"
              required
            />
          </div>

          {/* Leave Type */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Leave Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-select form-select-lg"
              required
            >
              <option value="">-- Select Leave Type --</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* From Date */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">From</label>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>

          {/* To Date */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">To</label>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>

          {/* Reason */}
          <div className="col-12">
            <label className="form-label fw-semibold">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Write a brief reason for your leave..."
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary btn-lg px-5">
              Submit Leave Application
            </button>
          </div>
        </form>
      </div>

      {/* ------------ Leave Request History ------------ */}
      <h4 className="fw-bold mb-3 text-secondary">My Leave Requests</h4>
      <div className="card shadow-sm border-0">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.type}</td>
                  <td>{req.from}</td>
                  <td>{req.to}</td>
                  <td>{req.reason}</td>
                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        req.status === "Pending"
                          ? "bg-warning text-dark"
                          : req.status === "Accepted"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No leave requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLeavePage;
