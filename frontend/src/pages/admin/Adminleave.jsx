import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Aminleave.css";

const AdminLeaveDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const res = await axios.get("http://localhost:3000/api/leaves");
    setLeaveRequests(res.data);
  };

  const onUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/api/leaves/${id}`, { status });
      alert(`Leave ${status} ✅`);
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert("Error updating status ❌");
    }
  };

  return (
    <div className="p-4">
      <h4>Leave Applications</h4>
      <div className="card shadow mt-3">
        <table className="table table-hover text-center align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>S No</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.employeeName}</td>
                  <td>{req.department}</td>
                  <td>{req.type}</td>
                  <td>{req.from}</td>
                  <td>{req.to}</td>
                  <td>{req.reason}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.status === "Pending"
                          ? "bg-warning"
                          : req.status === "Accepted"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "Pending" ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => onUpdateStatus(req._id, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onUpdateStatus(req._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No leave applications</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaveDashboard;
