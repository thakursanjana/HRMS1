import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaClipboardList,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext"; // ✅ shared context import
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { employees, departments, leaves } = useContext(DashboardContext); // ✅ employee data from EmployeeDashboard
  const navigate = useNavigate();

  const monthlyPay = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);

  return (
    <div className="p-4">
      <h3 className="fw-bold mb-4">Dashboard Overview</h3>

      {/* Top Stats */}
      <div className="row mb-4">
        {/* ✅ Total Employees */}
        <div className="col-md-4 mb-3">
          <div
            className="card shadow-sm p-3 d-flex align-items-center clickable-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admindashboard/employees")}
          >
            <FaUsers size={30} className="text-success mb-2" />
            <h5>Total Employees</h5>
            <span className="fw-bold fs-4">{employees.length}</span>
          </div>
        </div>

        {/* ✅ Total Departments */}
        <div className="col-md-4 mb-3">
          <div
            className="card shadow-sm p-3 d-flex align-items-center clickable-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admindashboard/department")}
          >
            <FaBuilding size={30} className="text-warning mb-2" />
            <h5>Total Departments</h5>
            <span className="fw-bold fs-4">{departments.length}</span>
          </div>
        </div>

        {/* ✅ Monthly Pay */}
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaMoneyBill size={30} className="text-danger mb-2" />
            <h5>Monthly Pay</h5>
            <span className="fw-bold fs-4">₹{monthlyPay}</span>
          </div>
        </div>
      </div>

      {/* ✅ Leave Details */}
      <h4 className="fw-bold mb-3">Leave Details</h4>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div
            className="card shadow-sm p-3 d-flex align-items-center clickable-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admindashboard/leave")}
          >
            <FaClipboardList size={30} className="text-info mb-2" />
            <h6>Leave Applied</h6>
            <span className="fw-bold fs-5">{leaves.length}</span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaCheckCircle size={30} className="text-success mb-2" />
            <h6>Leave Approved</h6>
            <span className="fw-bold fs-5">
              {leaves.filter((l) => l.status === "Accepted").length}
            </span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaHourglassHalf size={30} className="text-warning mb-2" />
            <h6>Leave Pending</h6>
            <span className="fw-bold fs-5">
              {leaves.filter((l) => l.status === "Pending").length}
            </span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaTimesCircle size={30} className="text-danger mb-2" />
            <h6>Leave Rejected</h6>
            <span className="fw-bold fs-5">
              {leaves.filter((l) => l.status === "Rejected").length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
